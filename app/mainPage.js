var myChart = echarts.init(document.getElementById('chartDiv'));
// 窗口大小变化时重置绘图大小
window.onresize = myChart.resize;

// 绘图设置
var option = {
    // 添加2个直角坐标系绘图区，第二个用作蒙皮
    grid: [
        {
            right: 25,
            width: 200,
            top: '10%',
            height: '80%'
        },
        {
            show: true,
            right: 0,
            width: 300,
            top: '0%',
            height: '100%',
            backgroundColor: 'rgba(18, 89, 147, 0.8)'
        }
    ],
    // 添加2个标题：1.地图标题；2.桥梁结构状态在线评估（gridIndex：0）
    title: [
        {
            text: '上海大叶公路交通安全可视化',
            textStyle: {
                color: 'rgba(18, 89, 147, 1)',
                fontSize: 30
            },
            subtext: '点击右侧柱状图可对应到桥梁',
            left: 0,
            top: 0,
            padding: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        },
        {
            text: '桥梁结构状态在线评估',
            textStyle: {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold'
            },
            right: 50,
            top: '5%'
        }
    ],
    tooltip: {show: false},
    // 地图设置
    bmap: {
        center: [121.503949, 30.982894],
        zoom: 13,
        roam: true,
        // 地图元素样式设置，本应用中主要是隐藏与主题不相关的地图元素（如绿地、地名等等）
        mapStyle: {
            styleJson: [
                {
                    featureType: 'all',
                    elementType: 'all',
                    stylers: {
                        lightness: 20,
                        saturation: -80
                    }
                },
                {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: {visibility: 'off'}
                },
                {
                    featureType: 'building',
                    elementType: 'all',
                    stylers: {visibility: 'off'}
                },
                {
                    featureType: 'green',
                    elementType: 'all',
                    stylers: {visibility: 'off'}
                },
                {
                    featureType: 'boundary',
                    elementType: 'all',
                    stylers: {visibility: 'off'}
                },
                {
                    featureType: 'local',
                    elementType: 'all',
                    stylers: {visibility: 'off'}
                },
                {
                    featureType: 'manmade',
                    elementType: 'all',
                    stylers: {visibility: 'off'}
                },
                {
                    featureType: 'label',
                    elementType: 'all',
                    stylers: {visibility: 'off'}
                }
            ]
        }
    },
    // 给柱状图类目轴（Y轴）添加缩放组件，dataZoom组件通过yAxisIndex关联指定坐标轴
    dataZoom: [
        {
            type: 'inside',
            yAxisIndex: 0,
            start: 0,
            end: 100,
            filterMode: 'empty'
        }
    ],
    // 添加视觉映射组件，visualMap组件通过seriesIndex关联指定的绘图系列
    visualMap: [
        {
            seriesIndex: 1,
            type: 'piecewise',
            // 三级预警：按严重性分别为：1橙色；2红色（注意categores与color的对应顺序）
            categories: [2, 1],
            color: ['orange', 'red'],
            show: false
        },
        {
            seriesIndex: [2, 3],
            type: 'piecewise',
            min: 60,
            max: 100,
            // 依安全指标划分为优、良、中、差四个等级
            splitNumber: 4,
            top: '70%',
            // 优：绿色；良：浅绿；中：橙色；差：红色
            color: ['green', 'yellow', 'red'],
            textStyle: {fontWeight: 'bold'}
        }
    ],
    // 设置直角坐标系绘图区X轴的样式，样式设置通过gridIndex关联指定绘图区
    xAxis: [
        {
            gridIndex: 0,
            position: 'bottom',
            type: 'value',
            min: 60,
            max: 100,
            interval: 10,
            axisLine: {
                show: true,
                lineStyle: {color: '#fff', width: 1}
            },
            axisTick: {
                show: true,
                lineStyle: {color: '#fff', width: 1}
            },
            axisLabel: {
                margin: 8,
                textStyle: {color: '#fff', fontWeight: 'bold'}
            },
            splitLine: {show: false}
        }
    ],
    // 设置直角坐标系绘图区Y轴的样式，样式设置通过gridIndex关联指定绘图区
    yAxis: [
        {
            gridIndex: 0,
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {color: '#fff', width: 1}
            },
            axisTick: {show: false},
            axisLabel: {color: '#fff', fontWeight: 'bold'},
            data: []
        }
    ],
    // 系列列表，每个系列通过 type 决定自己的图表类型
    series: [
        {
            id: 'road',
            type: 'lines',
            coordinateSystem: 'bmap',
            lineStyle: {
                normal: {
                    color: 'rgba(18,89,147, 1)',
                    opacity: 0.8,
                    width: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.9)',
                    shadowBlur: 10
                }
            },
            zlevel: -2,
            data: []
        },
        {
            id: 'realtimeWarning',
            type: 'effectScatter',
            effectType: 'ripple',
            rippleEffect: {
                scale: 3,
                brushType: 'fill'
            },
            coordinateSystem: 'bmap',
            symbolSize: 15,
            label: {
                normal: {
                    show: true,
                    position: 'bottom',
                    rotate: 45,
                    align: 'right',
                    formatter: function (params) {
                        var warningClass = ['', '橙色', '红色'];
                        return '{name|' + params.data.name + '\n}' +
                            '{normal|未处理预警' + params.data.label + '个\n}' +
                            '{result|最高级别:' + warningClass[params.data.value[2]] + '}'
                    },
                    rich: {
                        name: {
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'rgba(18,89,127, 1)',
                            textBorderWidth: 0,
                            textBorderColor: 'transparent',
                            lineHeight: 20
                        },
                        normal: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'rgba(18,89,127, 1)',
                            textBorderColor: 'transparent',
                            lineHeight: 15
                        },
                        result: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'auto',
                            textBorderColor: 'transparent'
                        }
                    }
                }
            },
            zlevel: -2,
            data: []
        },
        {
            id: 'onlineAssessment',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbol: 'circle',
            symbolSize: 15,
            label: {
                normal: {show: false},
                emphasis: {
                    show: true,
                    position: 'top',
                    rotate: 45,
                    align: 'left',
                    formatter: function (params) {
                        return '{name|' + params.data.name + '\n}' +
                                '{normal|安全指标：}{result|' + params.data.value[2] + '}'
                    },
                    rich: {
                        name: {
                            fontSize: 15,
                            fontWeight: 'bold',
                            lineHeight: 20,
                            color: 'rgba(18,89,127, 1)',
                            textBorderWidth: 0,
                            textBorderColor: 'transparent'
                        },
                        normal: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'rgba(18,89,127, 1)',
                            textBorderColor: 'transparent'
                        },
                        result: {
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'auto',
                            textBorderColor: 'transparent'
                        }
                    }
                }
            },
            zlevel: -2,
            data: []
        },
        {
            id: 'assessmentOverview',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            animationEasing: 'elasticOut',
            animationDelay: function (idx) { return idx * 100; },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: function (params) {
                        return params.data[1];
                    }
                }
            },
            encode: {x: 1, y: 0},
            zlevel: 2,
            data: []
        }
    ]
};
myChart.setOption(option);
//-----------------------------------------------------------------------------------------------
// 绘图数据：道路
var roadData = [];
// 绘图数据：桥梁实时预警
var warningData = [];
// 绘图数据：桥梁在线评估
var assessmentData = [];
// 绘图数据：类目
var categoryData = [];
// 绘图数据：在线评估汇总
var barData = [];
// 加载绘图数据
$.get('data/bridge.json', function (bridgeData) {
    // 显示"正在加载"动画效果
    myChart.showLoading('default', {text: '正在加载'});
    // 组织绘图数据：道路
    for (var i = 0; i < bridgeData.length - 1; i += 1) {
        roadData.push({
            // 以桥梁为节点将道路划分为若干路段，因而路段的起始点即为两侧的桥梁
            coords: [
                bridgeData[i].location,
                bridgeData[i + 1].location
            ],
            // 路段的安全指标取两侧桥梁安全指标的较小值
            value: Math.min(bridgeData[i].conditionAssessment, bridgeData[i + 1].conditionAssessment)
        });
    }
    // 组织绘图数据：桥梁实时预警、桥梁在线评估、类目、在线评估汇总
    for (var i = 0; i < bridgeData.length; i += 1) {
        if (bridgeData[i].realtimeWarning.length != 0) {
            warningData.push({
                name: bridgeData[i].name,
                value: bridgeData[i].location.concat(Math.max.apply(null, bridgeData[i].realtimeWarning)),
                label: bridgeData[i].realtimeWarning.length
            });
        }
        assessmentData.push({
            name: bridgeData[i].name,
            value: bridgeData[i].location.concat(bridgeData[i].conditionAssessment),
            url: bridgeData[i].url
        });
        categoryData.push(bridgeData[i].name);
        barData.push([
            bridgeData[i].name,
            bridgeData[i].conditionAssessment
        ]);
    }
    // 更新数据
    myChart.setOption(option = {
        yAxis: [
            {data: categoryData}
        ],
        series: [
            {data: roadData},
            {data: warningData},
            {data: assessmentData},
            {data: barData}
        ]
    });
    // 隐藏“数据加载”动画效果
    myChart.hideLoading();
});
//-----------------------------------------------------------------------------------------------
// 设置鼠标单击时的动态效果
myChart.on('click', function (params) {
    // 单击柱状图上的项目时，放大并居中显示对应桥梁
    if (params.seriesId == 'assessmentOverview') {
        myChart.setOption({
            visualMap: [{}, {seriesIndex: [2, 3, 4]}],
            bmap: {
                center: assessmentData[params.dataIndex].value,
                zoom: 14
            },
            series: [{}, {}, {}, {},
                {
                    type: 'scatter',
                    symbolSize: 15,
                    coordinateSystem: 'bmap',
                    data: [assessmentData[params.dataIndex]],
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            rotate: 45,
                            align: 'left',
                            formatter: function (params) {
                                return '{name|' + params.data.name + '\n}' +
                                    '{normal|安全指标：}{result|' + params.data.value[2] + '}'
                            },
                            rich: {
                                name: {
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    lineHeight: 20,
                                    color: 'rgba(18,89,127, 1)',
                                    textBorderWidth: 0,
                                    textBorderColor: 'transparent'
                                },
                                normal: {
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: 'rgba(18,89,127, 1)',
                                    textBorderColor: 'transparent'
                                },
                                result: {
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: 'auto',
                                    textBorderColor: 'transparent'
                                }
                            }
                        }
                    },
                    zlevel: -2
                }
            ]
        });
    }
    // 鼠标单击地图上桥梁节点时实现页面跳转
    if (params.seriesId == 'onlineAssessment') {
        // 跳转到新页面'_blank'；当前页跳转'_self'；
        window.open(assessmentData[params.dataIndex].url, '_blank');
    }
});
