import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { StorageService } from '@api/services/storage.service';
import { CommonServerDataSource } from '@common/ng2-smart-table/common-server-data-source';
import { Paginator } from '@component/table/paginator/paginator.component';
import { LocalDataSource } from 'ng2-smart-table';
// import { OAuth2BaseComponent, OAuth2Service } from '@module/oauth2';
import { Subject } from 'rxjs';

@Injectable()
export class BaseComponent implements OnDestroy {

  unsubscribe$ = new Subject();
  readonly dateFormat = 'yyyy-MM-dd';
  dataSource: LocalDataSource; //table
  restDataSource: CommonServerDataSource; //rest API table
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

  }

  ngAfterViewInit() {

  }

  getInvalidControls() {
    Object.keys(this.validateForm.controls).filter(ctl => this.validateForm.get(ctl).invalid).forEach(ctl => {
      console.info(ctl + ' is invalid, value:', this.validateForm.get(ctl).errors);
    })
  }

  //檢查檢核
  findInvalidControls() {
    const invalid = [];
    const controls = this.validateForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
