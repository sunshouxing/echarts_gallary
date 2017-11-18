var myChart = echarts.init(document.getElementById('chartDiv'));
window.onresize = myChart.resize;

windDirection = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
windSpeedRange = ['风速：0-10m/s', '风速：10-20m/s', '风速：20-30m/s', '风速：30-40m/s'];
data = [
    [10, 15, 20, 25, 30, 35, 40, 37, 35, 43, 50, 30, 10, 20, 30, 20],
    [25, 33, 40, 50, 60, 37, 15, 23, 30, 28, 25, 19, 10, 15, 20, 23],
    [10, 11, 12, 12, 13, 14, 14, 12, 9, 8, 7, 6, 5, 8],
    [0, 1, 2, 2, 3, 2, 1, 4, 7, 4, 0, 3, 5, 2, 0, 0]
];

option = {
    polar: {},
    angleAxis: {
        type: 'category',
        boundaryGap: false,
        data: windDirection,
        splitLine: {show: true},
        axisLabel: {fontWeight: 'bold'}
    },
    radiusAxis: {
        type: 'value',
        axisLine: {show: false},
        axisTick: {show: false},
        axisLabel: {fontWeight: 'bold'},
        splitLine: {show: true}
    },
    series: [
        {
            name: windSpeedRange[0],
            type: 'bar',
            data: data[0],
            coordinateSystem: 'polar',
            itemStyle: {
                normal: {
                    color: 'rgb(230, 185, 184)',
                    borderColor: 'gray',
                    opacity: 0.9
                },
                emphasis: {
                    borderWidth: 1.5,
                    opacity: 1.0
                }
            },
            barCategoryGap: '0%',
            stack: 'a'
        },
        {
            name: windSpeedRange[1],
            type: 'bar',
            data: data[1],
            coordinateSystem: 'polar',
            itemStyle: {
                normal: {
                    color: 'rgb(217, 150, 148)',
                    borderColor: 'gray',
                    opacity: 0.9
                },
                emphasis: {
                    borderWidth: 1.5,
                    opacity: 1.0
                }
            },
            barCategoryGap: '0%',
            stack: 'a'
        },
        {
            name: windSpeedRange[2],
            type: 'bar',
            data: data[2],
            coordinateSystem: 'polar',
            itemStyle: {
                normal: {
                    color: 'rgb(149, 55, 53)',
                    borderColor: 'gray',
                    opacity: 0.9
                },
                emphasis: {
                    borderWidth: 1.5,
                    opacity: 1.0
                }
            },
            barCategoryGap: '0%',
            stack: 'a'
        },
        {
            name: windSpeedRange[3],
            type: 'bar',
            data: data[3],
            coordinateSystem: 'polar',
            itemStyle: {
                normal: {
                    color: 'rgb(99, 37, 35)',
                    borderColor: 'gray',
                    opacity: 0.9
                },
                emphasis: {
                    borderWidth: 1.5,
                    opacity: 1.0
                }
            },
            barCategoryGap: '0%',
            stack: 'a'
        }
    ],
    legend: {
        show: true,
        left: '70%',
        top: '10%',
        orient: 'vertical',
        textStyle: {fontWeight: 'bold'},
        data: ['风速：0-10m/s', '风速：10-20m/s', '风速：20-30m/s', '风速：30-40m/s']
    },
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: function (params) {
            return '风向：' + params.dataIndex/16*360 + '°±11.25°' + '<br\>' +
                params.seriesName + '<br\>' +
                '频次：' + params.data;
        }
    }
};

myChart.setOption(option);