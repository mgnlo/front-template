import { Component, OnInit } from '@angular/core';
import {
  Category, DashBoardInfo, LineSeriesData, OriginLineSeriesData,
  OriginTreeMapSeriesData, OriginTreeSeriesData, PieSeriesData,
  TreeMapSeriesData, TreeSeriesData
} from '@api/models/dashboard.model';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { BaseComponent } from '@pages/base.component';
import { DashboardService } from '../dashboard.service';
import { DialogService } from '@api/services/dialog.service';
import { RestStatus } from '@common/enums/rest-enum';
import { catchError, filter, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '@api/services/loading.service';
import { DashboardInfoMock } from '@common/mock-data/dasthboard.mock';

@Component({
  selector: 'dashboard-room',
  styleUrls: ['./dashboard-room.component.scss'],
  templateUrl: './dashboard-room.component.html',
})
export class DashboardRoomComponent extends BaseComponent implements OnInit {
  dashboardData: DashBoardInfo = new DashBoardInfo();

  mockData = DashboardInfoMock;

  //構面數據佔比資料表
  categories: Array<Category> = [];

  // 所有總和標籤數
  totalTags: number = 0;

  //標籤組成統計
  categorysData: TreeSeriesData;

  //熱門
  hotTagsData: TreeMapSeriesData[];

  //冷門
  coldTagsData: TreeMapSeriesData[];

  //每日案件審核數量
  reviewCaseInfosData: LineSeriesData;

  // 審核案件比例
  pieSeriesData: Array<PieSeriesData> = [];
  pieSeriesDataDate: string;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private dashboardService: DashboardService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) {
    super(storageService, configService, loginService)

    let lastPieSeries: OriginLineSeriesData = new OriginLineSeriesData();

    if (this.isMock) {
      this.dashboardData = this.mockData;
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
      lastPieSeries = this.dashboardData.reviewCaseInfos[this.dashboardData.reviewCaseInfos.length - 1];
      this.pieSeriesDataDate = lastPieSeries.date;
      this.pieSeriesData = lastPieSeries.items;
      this.hotTagsData = this.convertTreeMapSeriesData(this.dashboardData?.hotTags);
      this.coldTagsData = this.convertTreeMapSeriesData(this.dashboardData?.coldTags);
      this.reviewCaseInfosData = this.convertLineSeriesData(this.dashboardData?.reviewCaseInfos);
      this.categorysData = this.converTreeSeriesData(this.dashboardData?.categorys);
      return;
    }

    this.loadingService.open();
    this.dashboardService.getDashboard().pipe(
      catchError((err) => {
        this.dialogService.alertAndBackToList(false, `查詢儀錶板失敗 ${err}`);
        throw new Error(err.message);
      }),
      filter((res) => res.code === RestStatus.SUCCESS),
      tap(res => {
        // console.info(res);
        this.dashboardData = JSON.parse(JSON.stringify(res.result)) as DashBoardInfo

        if (!this.dashboardData) {
          this.dialogService.alertAndBackToList(false, `查詢儀錶板失敗`);
          return;
        }

        // 加工處理 構面數據佔比與名單數據
        this.dashboardData.categorys?.filter((item) => {
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
        lastPieSeries = this.dashboardData.reviewCaseInfos[this.dashboardData.reviewCaseInfos.length - 1];
        this.pieSeriesDataDate = lastPieSeries.date;
        this.pieSeriesData = lastPieSeries.items;
        this.hotTagsData = this.convertTreeMapSeriesData(this.dashboardData?.hotTags);
        this.coldTagsData = this.convertTreeMapSeriesData(this.dashboardData?.coldTags);
        this.reviewCaseInfosData = this.convertLineSeriesData(this.dashboardData?.reviewCaseInfos);
        this.categorysData = this.converTreeSeriesData(this.dashboardData?.categorys);

        this.dialogService.alertAndBackToList(true, `查詢儀錶板成功`);
      }),
      finalize(() => this.loadingService.close())
    ).subscribe()
  }

  ngOnInit(): void {
    document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  lineSeriesClick(date: string) {
    this.dashboardData.reviewCaseInfos.filter(reviewCaseInfo => {
      if (reviewCaseInfo.date == date) {
        this.pieSeriesDataDate = reviewCaseInfo.date;
        this.pieSeriesData = reviewCaseInfo.items;
      }
    });
  }

  converTreeSeriesData(originDatas: Array<OriginTreeSeriesData>): TreeSeriesData {
    let treeSeriesData: TreeSeriesData = {
      name: '標籤',
      children: []
    };

    originDatas?.filter((originData) => {
      let firstNode: TreeSeriesData = {
        name: originData.nodeName,
        children: []
      }

      treeSeriesData.children.push(firstNode);
      originData.subNodes?.filter(sub => {
        // 標籤組成統計資料
        firstNode.children.push({
          name: `${sub.subNodeName} 標籤共 ${sub.value} 組`
        });
      });
    });

    return treeSeriesData;
  }

  convertTreeMapSeriesData(originData: OriginTreeMapSeriesData): Array<TreeMapSeriesData> {
    let treeMapSeriesData: Array<TreeMapSeriesData> = [];

    treeMapSeriesData.push({
      name: originData?.title,
      children: originData?.items
    });

    return treeMapSeriesData;
  }

  convertLineSeriesData(originDatas: Array<OriginLineSeriesData>): LineSeriesData {
    let lineSeriesData: LineSeriesData = {
      legends: [],
      dates: [],
      seriesData: []
    }

    originDatas?.filter(originData => {
      originData.items?.filter(item => {
        let index = lineSeriesData.legends.findIndex(legend => legend == item.name);

        if (index >= 0) {
          lineSeriesData.seriesData?.filter(series => {
            if (series.name == item.name) {
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
