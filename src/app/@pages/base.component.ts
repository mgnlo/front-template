import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { StorageService } from '@api/services/storage.service';
import { Paginator } from '@component/table/paginator/paginator.component';
import { LocalDataSource } from 'ng2-smart-table';
// import { OAuth2BaseComponent, OAuth2Service } from '@module/oauth2';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable()
export class BaseComponent implements OnDestroy {

  unsubscribe$ = new Subject();
  readonly dateFormat = 'yyyy-MM-dd';
  dataSource: LocalDataSource; //table
  paginator: Paginator = { totalCount: 0, nowPage: 1, perPage: 10, totalPage: 1, rowStart: 0, rowEnd: 0 };  //table筆數顯示
  validateForm: FormGroup;     // 共用表單名稱
  isSubmit: boolean = false;   // 確認是否送出表單 -> 初始化時須設定為false
  validationMessages: any;     // 欄位檢核提示訊息 -> 初始化時須各別設定
  tmpCtrl: AbstractControl;    // 多層次使用
  sessionKey: string;

  constructor(protected storageService: StorageService) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  ngDoCheck() {
    this.updatePageInfo();
  }

  getInvalidControls() {
    Object.keys(this.validateForm.controls).filter(ctl => this.validateForm.get(ctl).invalid).forEach(ctl => {
      console.info(ctl + ' is invalid, value:', this.validateForm.get(ctl).errors);
    })
  }

  updatePageInfo() {
    if (!!this.dataSource) {
      this.dataSource.onChanged().pipe(takeUntil(this.unsubscribe$), filter((val, i) => i === 0)).subscribe((event) => {
        //get session page
        if(event.action === 'refresh'){
          let storage = this.storageService.getSessionVal(this.sessionKey);
          if (!!storage?.page) {
            this.dataSource.setPage(storage.page, true);
          }
        }
        this.paginator.totalCount = this.dataSource.count();
        let page = this.dataSource.getPaging().page;
        let perPage = this.dataSource.getPaging().perPage;
        this.paginator.nowPage = page;
        this.paginator.totalPage = Math.ceil(this.paginator.totalCount / perPage);
        this.paginator.rowStart = (page - 1) * perPage + 1;
        this.paginator.rowEnd = this.paginator.rowStart + (perPage - 1);
      });
    }
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
