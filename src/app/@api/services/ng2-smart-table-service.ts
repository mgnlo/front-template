import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonConf, CommonServerDataSource, ServerSourceInitConfig } from '@common/ng2-smart-table/common-server-data-source';
import { CommonUtil } from '@common/utils/common-util';
import { DialogService } from './dialog.service';
import { LoadingService } from './loading.service';

export interface SearchInfo {
  apiUrl: string
  nowPage: number
  errMsg?: string | '查無資料'
  filters?: { [key: string]: any }[]
  sorts?: { field: string, direction: 'asc' | 'desc', compare?: Function }[]
}

@Injectable({
  providedIn: 'root',
})
export class Ng2SmartTableService {

  constructor(
    public http: HttpClient,
    public loadingService: LoadingService,
    public dialogService: DialogService,
  ) { }

  /**
   * use this to get data with page and filter
  */
  searchData(searchInfo: SearchInfo): CommonServerDataSource {

    let conf = new CommonConf({ endPoint: searchInfo.apiUrl });
    let initConf = new ServerSourceInitConfig();

    if (!!searchInfo.nowPage) {
      initConf.page = searchInfo.nowPage;
    }

    if (!!searchInfo?.filters) {
      initConf.filters = CommonUtil.getSearchFilters(searchInfo.filters);
    }

    if (!!searchInfo?.sorts) {
      initConf.sorts = searchInfo.sorts;
    }

    let restDataSource = new CommonServerDataSource(this.http, conf, initConf);

    restDataSource.apiStatus().subscribe(status => {
      switch (status) {
        case 'error':
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, searchInfo.errMsg);
          break;
        case 'finish':
          this.loadingService.close();
          break;
        default:
          this.loadingService.open();
          break;
      }
    });

    return restDataSource;
  }
}
