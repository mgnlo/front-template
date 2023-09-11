import { DashBoardInfo } from "@api/models/dashboard.model";

export const DashboardInfoMock: DashBoardInfo = {
    // 構面數據與標籤組成資料表
    categorys: [{
        nodeName: "線上購物",
        subNodes: [{
            subNodeName: "子構面1",
            value: 132
        }, {
            subNodeName: "子構面2",
            value: 143
        }, {
            subNodeName: "子構面3",
            value: 150
        }]
    }, {
        nodeName: "刷卡消費",
        subNodes: [{
            subNodeName: "子構面1",
            value: 137
        }, {
            subNodeName: "子構面2",
            value: 143
        }]
    }, {
        nodeName: "投資",
        subNodes: [{
            subNodeName: "子構面1",
            value: 132
        }, {
            subNodeName: "子構面2",
            value: 142
        }, {
            subNodeName: "子構面3",
            value: 90
        }]
    }, {
        nodeName: "金融儲蓄",
        subNodes: [{
            subNodeName: "子構面1",
            value: 44
        }, {
            subNodeName: "子構面2",
            value: 47
        }]
    }, {
        nodeName: "構面五",
        subNodes: [{
            subNodeName: "子構面1",
            value: 90
        }, {
            subNodeName: "子構面2",
            value: 55
        }, {
            subNodeName: "子構面3",
            value: 120
        }]
    }, {
        nodeName: "交易程度",
        subNodes: [{
            subNodeName: "子構面1",
            value: 56
        }, {
            subNodeName: "子構面2",
            value: 77
        }, {
            subNodeName: "子構面3",
            value: 50
        }]
    }],
    // 客群名單數量
    customers: 21, //份數
    // 今日統計已貼標籤數
    tagRecord: null,
    // 熱門
    hotTags: {
        title: "熱門名單採用標籤",
        items: [
            { name: '近一個月_基金_申購金額_高', value: 494 },
            { name: '近三個月_基金_申購金額_高', value: 394 },
            { name: '近六個月_基金_申購金額_高', value: 274 },
            { name: '近一個月_信用卡_消費金額_高', value: 144 },
            { name: '近一個月_信用卡_消費金額_中', value: 134 },
            { name: '近三個月_信用卡_消費金額_低', value: 94 },
            { name: '近一個月_基金_申購金額_低', value: 74 },
            { name: '信用卡戶', value: 44 },
            { name: '居住地_高雄市', value: 34 },
            { name: '居住地_新北市', value: 24 },
        ]
    },
    // 冷門
    coldTags: {
        title: "冷門名單採用標籤",
        items: [
            { name: '近一個月_基金_申購金額_高', value: 494 },
            { name: '近三個月_基金_申購金額_高', value: 394 },
            { name: '近六個月_基金_申購金額_高', value: 274 },
            { name: '近一個月_信用卡_消費金額_高', value: 144 },
            { name: '近一個月_信用卡_消費金額_中', value: 134 },
            { name: '近三個月_信用卡_消費金額_低', value: 94 },
            { name: '近一個月_基金_申購金額_低', value: 74 },
            { name: '信用卡戶', value: 44 },
            { name: '居住地_高雄市', value: 34 },
            { name: '居住地_新北市', value: 24 },
        ]
    },
    // 審核案件資訊表，近 30 天資訊(max)
    reviewCaseInfos: [
        {
            date: '2023-07-23',
            items: [
                {name: '排程', value: 32},
                {name: '標籤', value: 41},
                {name: '名單', value: 132}
            ]
        }, {
            date: '2023-07-24',
            items: [
                {name: '排程', value: 67},
                {name: '標籤', value: 55},
                {name: '名單', value: 167}
            ]
        }, {
            date: '2023-07-25',
            items: [
                {name: '排程', value: 99},
                {name: '標籤', value: 79},
                {name: '名單', value: 199}
            ]
        }, {
            date: '2023-07-26',
            items: [
                {name: '排程', value: 164},
                {name: '標籤', value: 532},
                {name: '名單', value: 1143},
            ]
        }, {
            date: '2023-07-27',
            items: [
                {name: '排程', value: 1243},
                {name: '標籤', value: 325},
                {name: '名單', value: 132},
            ]
        }, {
            date: '2023-07-28',
            items: [
                {name: '排程', value: 234},
                {name: '標籤', value: 6434},
                {name: '名單', value: 1234},
            ]
        }, {
            date: '2023-07-29',
            items: [
                {name: '排程', value: 23},
                {name: '標籤', value: 235},
                {name: '名單', value: 123},
            ]
        }, {
            date: '2023-07-30',
            items: [
                {name: '排程', value: 564},
                {name: '標籤', value: 789},
                {name: '名單', value: 132},
            ]
        }, {
            date: '2023-07-31',
            items: [
                {name: '排程', value: 1564},
                {name: '標籤', value: 123},
                {name: '名單', value: 45},
            ]
        }, {
            date: '2023-08-01',
            items: [
                {name: '排程', value: 76},
                {name: '標籤', value: 23},
                {name: '名單', value: 176},
            ]
        }, {
            date: '2023-08-01',
            items: [
                {name: '排程', value: 76},
                {name: '標籤', value: 23},
                {name: '名單', value: 176},
            ]
        }, {
            date: '2023-08-01',
            items: [
                {name: '排程', value: 76},
                {name: '標籤', value: 23},
                {name: '名單', value: 176},
            ]
        }, {
            date: '2023-08-01',
            items: [
                {name: '排程', value: 76},
                {name: '標籤', value: 23},
                {name: '名單', value: 176},
            ]
        }, {
            date: '2023-08-02',
            items: [
                {name: '排程', value: 11176},
                {name: '標籤', value: 12323},
                {name: '名單', value: 3176},
            ]
        }, {
            date: '2023-08-03',
            items: [
                {name: '排程', value: 2376},
                {name: '標籤', value: 2323},
                {name: '名單', value: 11176},
            ]
        }, {
            date: '2023-08-04',
            items: [
                {name: '排程', value: 5676},
                {name: '標籤', value: 2323},
                {name: '名單', value: 8176},
            ]
        }, {
            date: '2023-08-05',
            items: [
                {name: '排程', value: 276},
                {name: '標籤', value: 323},
                {name: '名單', value: 4176},
            ]
        }, {
            date: '2023-08-06',
            items: [
                {name: '排程', value: 576},
                {name: '標籤', value: 253},
                {name: '名單', value: 1276},
            ]
        }, {
            date: '2023-08-07',
            items: [
                {name: '排程', value: 726},
                {name: '標籤', value: 223},
                {name: '名單', value: 1176},
            ]
        }, {
            date: '2023-08-08',
            items: [
                {name: '排程', value: 426},
                {name: '標籤', value: 323},
                {name: '名單', value: 476},
            ]
        }, {
            date: '2023-08-09',
            items: [
                {name: '排程', value: 526},
                {name: '標籤', value: 223},
                {name: '名單', value: 7176},
            ]
        }, {
            date: '2023-08-10',
            items: [
                {name: '排程', value: 1726},
                {name: '標籤', value: 1223},
                {name: '名單', value: 12176},
            ]
        }, {
            date: '2023-08-11',
            items: [
                {name: '排程', value: 226},
                {name: '標籤', value: 2223},
                {name: '名單', value: 11176},
            ]
        }, {
            date: '2023-08-12',
            items: [
                {name: '排程', value: 6726},
                {name: '標籤', value: 2623},
                {name: '名單', value: 12176},
            ]
        }, {
            date: '2023-08-13',
            items: [
                {name: '排程', value: 1726},
                {name: '標籤', value: 2223},
                {name: '名單', value: 14176},
            ]
        }, {
            date: '2023-08-14',
            items: [
                {name: '排程', value: 727},
                {name: '標籤', value: 2543},
                {name: '名單', value: 2276},
            ]
        }, {
            date: '2023-08-15',
            items: [
                {name: '排程', value: 626},
                {name: '標籤', value: 123},
                {name: '名單', value: 2176},
            ]
        }, {
            date: '2023-08-16',
            items: [
                {name: '排程', value: 526},
                {name: '標籤', value: 223},
                {name: '名單', value: 1176},
            ]
        }, {
            date: '2023-08-17',
            items: [
                {name: '排程', value: 526},
                {name: '標籤', value: 523},
                {name: '名單', value: 5176},
            ]
        }, {
            date: '2023-08-18',
            items: [
                {name: '排程', value: 4726},
                {name: '標籤', value: 4223},
                {name: '名單', value: 4176},
            ]
        }, {
            date: '2023-08-19',
            items: [
                {name: '排程', value: 3726},
                {name: '標籤', value: 2223},
                {name: '名單', value: 16176},
            ]
        }, {
            date: '2023-08-20',
            items: [
                {name: '排程', value: 7126},
                {name: '標籤', value: 2323},
                {name: '名單', value: 15176},
            ]
        }, {
            date: '2023-08-21',
            items: [
                {name: '排程', value: 7726},
                {name: '標籤', value: 2423},
                {name: '名單', value: 12176},
            ]
        }, {
            date: '2023-08-22',
            items: [
                {name: '排程', value: 7226},
                {name: '標籤', value: 2123},
                {name: '名單', value: 9176},
            ]
        }
    ]
};
