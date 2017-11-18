var myChart = echarts.init(document.getElementById('chartDiv'));
myChart.setOption(Option = {
    title: {
        text: 'Ctrl+单击新建观测点\n\n' +
        '单击选择观测点\n\n' +
        '拖拽移动观测点\n\n' +
        '方向键或Ctrl+方向键移动已选择观测点',
        textStyle: {
            color: 'rgba(18, 89, 147, 0.8)',
            fontSize: 12,
            fontWeight: 'bold'
        }
    }
});
window.onresize = myChart.resize;

var existingPoints = [
    {
        id: 'point1510887233678',
        position: [327, 209]
    }
];
var selectedPoint = {};
var prevSelectedPoint = {};

var pointSetting = {
    type: 'circle',
    shape: {
        r: 10
    },
    draggable: true
};
var selectedPointStyle = {
    style: {
        fill: 'rgba(57, 172, 270, 0.8)'
    }
};
var unselectedPointStyle = {
    style: {
        fill: 'rgba(18, 89, 147, 0.8)'
    }
};

function setPoint(point, status) {
    var pointStyle = {};
    if (status == 'selected') {
        pointStyle = selectedPointStyle;
    }
    else {
        pointStyle = unselectedPointStyle;
    }
    myChart.setOption(option = {
        graphic: {
            elements: [
                $.extend({}, point, pointSetting, pointStyle)
            ]
        }
    })
}

if (existingPoints.length !== 0) {
    existingPoints.forEach(function (point) {
        setPoint(point, 'unselected');
    })
}

var zr = myChart.getZr();
zr.on('click', function (params) {
    if (params.event.ctrlKey) {

        var position = [params.offsetX, params.offsetY];
        var id = 'point' + Date.now().toString();

        prevSelectedPoint = selectedPoint;
        selectedPoint = {id: id, position: position};
        setPoint(selectedPoint, 'selected');

        if (!$.isEmptyObject(prevSelectedPoint)) {
            setPoint(prevSelectedPoint, 'unselected');
        }
    }
    else if (params.target !== undefined) {

        id = params.target.__ecGraphicId;
        position = params.target.position;

        prevSelectedPoint = selectedPoint;
        selectedPoint = {id: id, position: position};

        if (!$.isEmptyObject(prevSelectedPoint)) {
            setPoint(prevSelectedPoint, 'unselected');
        }

        if (selectedPoint.id == prevSelectedPoint.id) {
            selectedPoint = {};
        }
        else {
            setPoint(selectedPoint, 'selected');
        }
    }
    console.log(selectedPoint);
});

document.onkeydown = function (event) {
    if (!$.isEmptyObject(selectedPoint)) {
        var step = event.ctrlKey? 1:10;
        switch (event.keyCode) {
            case 38:
                event.preventDefault();
                selectedPoint.position[1] -= step;
                break;
            case 40:
                event.preventDefault();
                selectedPoint.position[1] += step;
                break;
            case 37:
                event.preventDefault();
                selectedPoint.position[0] -= step;
                break;
            case 39:
                event.preventDefault();
                selectedPoint.position[0] += step;
                break;
            default:
                return;
        }
        setPoint(selectedPoint, 'selected');
        console.log(selectedPoint);
    }
};