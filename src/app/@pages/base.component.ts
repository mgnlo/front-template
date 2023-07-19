import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Paginator } from '@component/table/paginator/paginator.component';
import { LocalDataSource } from 'ng2-smart-table';
// import { OAuth2BaseComponent, OAuth2Service } from '@module/oauth2';
import { Subject } from 'rxjs';

@Injectable()
export class BaseComponent implements OnDestroy {

  unsubscribe$ = new Subject();
  readonly dateFormat = 'yyyy-MM-dd';

  // constructor(oauth2Service: OAuth2Service) {
  //   super(oauth2Service);
  // }

  dataSource: LocalDataSource; //table
  paginator: Paginator = { totalCount: 0, nowPage: 1, perPage: 10, totalPage: 1, rowStart: 0, rowEnd: 0 };  //table筆數顯示
  validateForm: FormGroup;     // 共用表單名稱
  isSubmit: boolean = false;   // 確認是否送出表單 -> 初始化時須設定為false
  validationMessages: any;     // 欄位檢核提示訊息 -> 初始化時須各別設定
  tmpCtrl: AbstractControl;    // 多層次使用

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  ngDoCheck() {
    this.updatePageInfo();
  }

  updatePageInfo() {
    if (!!this.dataSource) {
      this.dataSource.onChanged().subscribe(() => {
        this.paginator.totalCount = this.dataSource.count();
        let page = this.dataSource.getPaging().page;
        let perPage = this.dataSource.getPaging().perPage;
        this.paginator.nowPage = page;
        this.paginator.totalPage = Math.ceil(this.paginator.totalCount / perPage);
        this.paginator.rowStart = (page - 1) * perPage + 1;
        this.paginator.rowEnd = this.paginator.totalPage !== page ? page * perPage : (page - 1) * perPage + this.paginator.totalCount % perPage;
      });
    }
  }

  getErrorMsg(field: string): string {

    if (!this.isSubmit || this.validateForm == null || field == null || this.validationMessages == null) {
      return undefined;
    }

    const ctlErrors: ValidationErrors = this.validateForm.get(field).errors;
    if (ctlErrors != null) {
      Object.keys(ctlErrors).forEach(keyError => {
        console.info(keyError);
        return keyError;
      });
    }
    return undefined;
  }

  getActionName(changeRouteName: string): string {
    switch (changeRouteName) {
      case 'edit':
        return '編輯';
      case 'copy':
        return '複製';
      default:
        return '新增';
    }
  }
}
