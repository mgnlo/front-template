
export class OriginTreeSeriesData {
    // 第二層節點名稱(構面名稱)
    nodeName: string;
    // 第三層節點清單(子構面清單)
    subNodes: Array<{
        // 第三層節點名稱(子構面名稱)
        subNodeName: string,
        // 數量(標籤數)
        value: number
    }>
}

export class OriginTreeMapSeriesData {
    // title 命名
    title: string;
    // 標籤成分資訊
    items: Array<{
        name: string;
        value: number;
    }>
}

export class OriginLineSeriesData {
    date: string;
    items: Array<{
        name: string;
        value: number;
    }>
}

// 主機回覆 Dashboard 資料結構
export class DashBoardInfo {
    // 構面數據與標籤組成資料表
    categorys: Array<OriginTreeSeriesData>;
    // 客群名單數量
    customers: number;
    // 今日統計已貼標籤數
    tagRecord: {
        tagged: number;
        fail: number;
    };
    // 熱門
    hotTags: OriginTreeMapSeriesData;
    // 冷門
    coldTags: OriginTreeMapSeriesData;
    // 審核案件資訊表
    reviewCaseInfos: Array<OriginLineSeriesData>;
}


// --------------------------------
// 構面數據佔比
export class Category {
    name: string;
    tags: number;
}

// 標籤組成統計 - 圖表用
export class TreeSeriesData {
    name: string;
    children?: Array<TreeSeriesData>
}

// 熱門、冷門名單採用標籤 - 圖表用
export class TreeMapSeriesData {
    name: string;
    children: Array<{
        name: string;
        value: number;
    }>;
}

// 審核案件比例 - 圖表用
export class PieSeriesData {
    name: string;
    value: number;
}

//案件審核數量 - 圖表用
export class LineSeriesData {
    legends: Array<string>;
    dates: Array<string>;
    seriesData: Array<{
        name: string;
        type: string,
        smooth: boolean,
        data: Array<number>
    }>;
}