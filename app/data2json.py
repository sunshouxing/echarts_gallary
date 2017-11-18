# -*- coding: utf-8 -*-
__author__ = 'SUNShouwang'

import json

bridge = [
    {
        'name'               : '叶榭大桥',
        'location'           : [121.334907, 30.957056],
        'conditionAssessment': 89,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '先锋港桥',
        'location'           : [121.351810, 30.958117],
        'conditionAssessment': 65,
        'realtimeWarning'    : [1, 2],
        'url'                : 'http://www.163.com/'
    },
    {
        'name'               : '千步泾桥',
        'location'           : [121.369238, 30.958488],
        'conditionAssessment': 92,
        'realtimeWarning'    : [],
        'url'                : 'http://www.qq.com/'
    },
    {
        'name'               : '大寨河桥',
        'location'           : [121.379848, 30.957660],
        'conditionAssessment': 96,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '巨潮港桥',
        'location'           : [121.389036, 30.958976],
        'conditionAssessment': 81,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '红旗港桥',
        'location'           : [121.401515, 30.961608],
        'conditionAssessment': 88,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '沙港桥',
        'location'           : [121.412284, 30.963776],
        'conditionAssessment': 82,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '光辉河桥',
        'location'           : [121.419571, 30.965533],
        'conditionAssessment': 84,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '竹港桥',
        'location'           : [121.427382, 30.967829],
        'conditionAssessment': 87,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '横泾桥',
        'location'           : [121.449525, 30.973897],
        'conditionAssessment': 83,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '白庙港桥',
        'location'           : [121.474699, 30.980028],
        'conditionAssessment': 69,
        'realtimeWarning'    : [1, 2],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '金汇港桥',
        'location'           : [121.503949, 30.982894],
        'conditionAssessment': 86,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '新强港桥',
        'location'           : [121.532579, 30.981778],
        'conditionAssessment': 79,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '西新港桥',
        'location'           : [121.554062, 30.983930],
        'conditionAssessment': 75,
        'realtimeWarning'    : [2],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '泰青港桥',
        'location'           : [121.565489, 30.984981],
        'conditionAssessment': 77,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '泰东港桥',
        'location'           : [121.574593, 30.985683],
        'conditionAssessment': 79,
        'realtimeWarning'    : [],
        'url'                : 'https://www.baidu.com/'
    },
    {
        'name'               : '一号港桥',
        'location'           : [121.584775, 30.986654],
        'conditionAssessment': 83,
        'realtimeWarning'    : [1, 1],
        'url'                : 'https://www.baidu.com/'
    }
]

assessment = {
    'name'    : '综合性能',
    'weight'  : 1.0,
    'children': [
        {
            'name'    : '结构安全性',
            'weight'  : 0.5,
            'children': [
                {
                    'name'    : '主梁结构',
                    'weight'  : 0.4,
                    'children': [
                        {
                            'name'  : '跨中截面挠度',
                            'weight': 0.2,
                            'value' : 91
                        },
                        {
                            'name'  : '主梁线形',
                            'weight': 0.3,
                            'value' : 82
                        },
                        {
                            'name'  : '塔梁相交截面轴力',
                            'weight': 0.2,
                            'value' : 90
                        },
                        {
                            'name'  : '跨中截面中性轴高度',
                            'weight': 0.3,
                            'value' : 88
                        }
                    ]
                },
                {
                    'name'    : '主塔结构',
                    'weight'  : 0.3,
                    'children': [
                        {
                            'name'  : '塔顶位移',
                            'weight': 0.3,
                            'value' : 85
                        },
                        {
                            'name'  : '塔根弯矩',
                            'weight': 0.7,
                            'value' : 82
                        }
                    ]
                },
                {
                    'name'    : '斜拉索',
                    'weight'  : 0.3,
                    'children': [
                        {
                            'name'  : '背索索力',
                            'weight': 0.3,
                            'value' : 85
                        },
                        {
                            'name'  : '索力分布',
                            'weight': 0.7,
                            'value' : 84
                        },
                    ]
                }
            ]
        },
        {
            'name'    : '结构耐久性',
            'weight'  : 0.25,
            'children': [
                {
                    'name'    : '钢结构',
                    'weight'  : 0.45,
                    'children': [
                        {
                            'name'  : '钢材锈蚀',
                            'weight': 1.0,
                            'value' : 85
                        }
                    ]
                },
                {
                    'name'    : '混凝土结构',
                    'weight'  : 0.55,
                    'children': [
                        {
                            'name'  : '混凝土碳化深度',
                            'weight': 0.4,
                            'value' : 85
                        },
                        {
                            'name'  : '混凝土保护层厚度',
                            'weight': 0.6,
                            'value' : 72
                        },
                    ]
                }
            ]
        },
        {
            'name'    : '结构使用性',
            'weight'  : 0.25,
            'children': [
                {
                    'name'  : '路面粗糙度',
                    'weight': 0.4,
                    'value' : 92
                },
                {
                    'name'  : '伸缩缝跳车',
                    'weight': 0.6,
                    'value' : 78
                }
            ]
        }
    ]
}

with open(r'assessment.json', 'w') as json_output_file:
    json.dump(assessment, json_output_file)
