import { Component, OnInit } from '@angular/core';
import { Category, PieSeriesData } from '@api/models/dashboard.model';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { SeriesService } from '@api/services/series.service';
import { StorageService } from '@api/services/storage.service';
import { DashboardInfoMock } from '@common/mock-data/dasthboard.mock';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'dashboard-room',
  styleUrls: ['./dashboard-room.component.scss'],
  templateUrl: './dashboard-room.component.html',
})
export class DashboardRoomComponent extends BaseComponent implements OnInit {
  mockData = DashboardInfoMock

  //構面數據佔比資料表
  categories: Array<Category> = [];

  // 所有總和標籤數
  totalTags: number = 0;
  
  // 審核案件比例
  pieSeriesData: Array<PieSeriesData> = [];
  pieSeriesDataDate: string;
  
  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    public seriesService: SeriesService
  ) {
    super(storageService, configService, loginService)

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
  ngOnInit(): void {
    document.querySelector("nb-layout-column").scrollTo(0, 0);
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
