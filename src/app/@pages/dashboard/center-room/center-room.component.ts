import { Component } from '@angular/core';
import { Category, TreeMapSeriesData, LineSeriesData, PieSeriesData, TreeSeriesData } from '@api/models/dashboard.model';
import { SeriesService } from '@api/services/series.service';
import { DashboardInfoMock } from '@common/mock-data/dasthboard.mock';

@Component({
  selector: 'center-room',
  styleUrls: ['./center-room.component.scss'],
  templateUrl: './center-room.component.html',
})
export class CenterRoomComponent {
  mockData = DashboardInfoMock

  //構面數據佔比資料表
  categories: Array<Category> = [];

  // 所有總和標籤數
  totalTags: number = 0;
  
  // 審核案件比例
  pieSeriesData: Array<PieSeriesData> = [];
  pieSeriesDataDate: string;
  
  constructor(public seriesService: SeriesService) {

    // 加工處理 構面數據佔比與名單數據
    this.mockData.categorys.filter((item) => {
      let category: Category = {
        name: item.nodeName,
        tags: 0
      };

      item.subNodes.filter(sub => {
        // 構面數據佔比資料
        this.totalTags += sub.value;
        // 所有總和標籤數
        category.tags += sub.value
      });      
      this.categories.push(category);
    });


    // 審核案件比例，預設取最後一天
    let lastPieSeries = this.mockData.reviewCaseInfos[this.mockData.reviewCaseInfos.length - 1];

    this.pieSeriesDataDate = lastPieSeries.date;
    this.pieSeriesData = lastPieSeries.items;    
  }

  lineSeriesClick(date: string){
    this.mockData.reviewCaseInfos.filter(reviewCaseInfo => {
      if(reviewCaseInfo.date == date){
        this.pieSeriesDataDate = reviewCaseInfo.date;
        this.pieSeriesData = reviewCaseInfo.items;
      }
    });
  }
}
