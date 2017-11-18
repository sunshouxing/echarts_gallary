var uploadedDataURL = 'data/assessment.json';
var myChart = echarts.init(document.getElementById('chartDiv'));
window.onresize = myChart.resize;

function getValue(data) {
    if (data.children) {
        data.value = 0;
        for (var i = 0; i < data.children.length; i++) {
            data.value += data.children[i].weight * getValue(data.children[i]);
        }
    }
    return data.value;
}

function convertData(sourceData, targetData, weight) {
    var node = {
        name: sourceData.name,
        value: sourceData.value
    };
    targetData.nodes.push(node);
    var globleWeight = weight * sourceData.weight;
    if (sourceData.children) {
        for (var i = 0; i < sourceData.children.length; i++) {
            var link = {
                target: sourceData.children[i].name,
                source: sourceData.name,
                weight: sourceData.children[i].weight,
                value: sourceData.children[i].weight * globleWeight
            };
            targetData.links.push(link);
            convertData(sourceData.children[i], targetData, globleWeight);
        }
    }
}

var targetData = {nodes: [], links: []};
myChart.showLoading();
$.getJSON(uploadedDataURL, function (sourceData) {
    getValue(sourceData);
    convertData(sourceData, targetData, 1.0);
    myChart.setOption(option = {
        title: {
            text: '闵浦二桥结构性能在线评估',
            left: 'center'
        },
        visualMap:{
            type: 'piecewise',
            pieces: [
                {gt: 60, lte: 70}, // 差
                {gt: 70, lte: 80}, // 中
                {gt: 80, lte: 90}, // 良
                {gt: 90, lte: 100} // 优
            ],
            // 优：绿色；良：浅绿；中：橙色；差：红色
            color: ['green', 'yellow', 'red'],
            show: false
        },
        tooltip: {
            textStyle: {fontSize: 12},
            formatter: function (params) {
                if (params.dataType == 'node') {
                    return params.marker + params.data.name + '：' + params.data.value.toFixed(2);
                }
                if (params.dataType == 'edge') {
                    return params.data.source + ' <-- ' + params.data.target + '<br\>' +
                            '权重：' + params.data.weight.toFixed(2);
                }
            }
        },
        series: [{
            type: 'sankey',
            nodes: targetData.nodes,
            links: targetData.links,
            nodeWidth: 30,
            nodeGap: 10,
            layoutIterations: 2048,
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#aaa'
                }
            },
            lineStyle: {
                normal: {
                    color: 'target',
                    curveness: 0.3
                }
            }
        }]
    });
});
myChart.hideLoading();