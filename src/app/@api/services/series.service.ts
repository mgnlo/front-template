import { Injectable } from '@angular/core';
import { OriginTreeSeriesData, Category, TreeSeriesData, TreeMapSeriesData, OriginTreeMapSeriesData, OriginLineSeriesData, LineSeriesData } from '@api/models/dashboard.model';

@Injectable({
    providedIn: 'root'
})
export class SeriesService {
    
    public converTreeSeriesData(originDatas: Array<OriginTreeSeriesData>): TreeSeriesData {
        let treeSeriesData: TreeSeriesData = {
            name: '標籤',
            children: []
        };

        originDatas.filter((originData) => {
            let firstNode: TreeSeriesData = {
                name: originData.nodeName,
                children: []
            }

            treeSeriesData.children.push(firstNode);
            originData.subNodes.filter(sub => {
                // 標籤組成統計資料
                firstNode.children.push({
                    name: `${sub.subNodeName} 標籤共 ${sub.value} 組`
                });
            });
        });

        return treeSeriesData;
    }

    public convertTreeMapSeriesData(originData: OriginTreeMapSeriesData): Array<TreeMapSeriesData>{
        let treeMapSeriesData: Array<TreeMapSeriesData> = [];

        treeMapSeriesData.push({
            name: originData.title,
            children: originData.items
        });

        return treeMapSeriesData;
    }

    public convertLineSeriesData(originDatas: Array<OriginLineSeriesData>): LineSeriesData{
        let lineSeriesData: LineSeriesData = {
            legends: [],
            dates: [],
            seriesData: []
          }

        originDatas.filter(originData => {
            originData.items.filter(item => {
              let index = lineSeriesData.legends.findIndex(legend => legend == item.name);
      
              if(index >= 0) {
                lineSeriesData.seriesData.filter(series => {
                  if(series.name == item.name){
                    series.data.push(item.value);
                  }
                });
              } else {      
                lineSeriesData.legends.push(item.name);
                lineSeriesData.seriesData.push({
                  name: item.name,
                  type: 'line',
                  smooth: true,
                  data: [item.value]
                });
              }
            });
      
            lineSeriesData.dates.push(originData.date);
          }); 

        return lineSeriesData;
    }
}
