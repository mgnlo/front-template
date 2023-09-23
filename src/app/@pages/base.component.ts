import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { CommonServerDataSource } from '@common/ng2-smart-table/common-server-data-source';
import { Paginator } from '@component/table/paginator/paginator.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ScopeList } from './pages.component';

@Injectable()
export class BaseComponent {

  readonly dateFormat = 'yyyy-MM-dd';
  dataSource: LocalDataSource; //table
  restDataSource: CommonServerDataSource; //rest API table
  paginator: Paginator = { totalCount: 0, nowPage: 1, perPage: 10, totalPage: 1, rowStart: 0, rowEnd: 0 };  //table筆數顯示
  validateForm: FormGroup; // 共用表單名稱
  sessionKey: string;
  isMock: boolean = false;
  isCrud: { [action: string]: boolean } = {}; //頁面的CRUD權限

  constructor(protected storageService: StorageService, protected configService: ConfigService, protected loginService: LoginService) {
    this.isMock = configService.getConfig().IS_MOCK;
    if (this.isMock) { this.dataSource = new LocalDataSource(); }
    ScopeList[loginService.schemaName].crud.forEach(actionType => {
      this.isCrud[actionType] = loginService.checkUserScope(loginService.schemaName, actionType);
    })
    console.log('schemaName:', loginService.schemaName, 'isCrud:', this.isCrud)
  }

  /** (開發用) 檢查validateForm裡invalid的欄位 */
  getInvalidControls() {
    Object.keys(this.validateForm.controls).filter(ctl => this.validateForm.get(ctl).invalid).forEach(ctl => {
      console.info(ctl + ' is invalid, value:', this.validateForm.get(ctl).errors);
    })
  }

  /** 設定暫存資料
   *  @param sessionData 存入Json資料
  */
  setSessionVal(sessionData: {}) {
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  /** 取得暫存並設定頁面 */
  getSessionSetPage() {
    let storage = this.storageService.getSessionVal(this.sessionKey);
    if (!!storage?.page) {
      this.dataSource?.setPage(storage.page, true);
      this.restDataSource?.setPage(storage.page, true);
    }
  }

}
