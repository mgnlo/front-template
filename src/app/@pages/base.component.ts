import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Paginator } from '@component/table/paginator/paginator.component';
// import { OAuth2BaseComponent, OAuth2Service } from '@module/oauth2';
import { Subject } from 'rxjs';

@Injectable()
export class BaseComponent implements OnDestroy {

  unsubscribe$ = new Subject();

  // constructor(oauth2Service: OAuth2Service) {
  //   super(oauth2Service);
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  paginator: Paginator = {totalCount: 1, nowPage: 1, perPage:10, totalPage: 1};  //table筆數顯示
  validateForm: FormGroup;     // 共用表單名稱
  isSubmit: boolean = false;   // 確認是否送出表單 -> 初始化時須設定為false
  validationMessages: any;     // 欄位檢核提示訊息 -> 初始化時須各別設定
  tmpCtrl: AbstractControl;    // 多層次使用
  // eg. 'stageAudits.0.roleId'
  getErrorMessage(field: string): string {

    if (!this.isSubmit || this.validateForm == null || field == null || this.validationMessages == null) {
        return undefined;
    }

    this.tmpCtrl = this.validateForm;
    const fields = field.split('.');

    fields.forEach(f => {
        this.tmpCtrl = this.tmpCtrl.get(f);
    });

    if (this.tmpCtrl.invalid) {
        return this.validationMessages[fields[0]][Object.keys(this.tmpCtrl.errors)[0]];
    } else {
        return undefined;
    }
  }
  
  groupBy<T>(datas: T[], key: string) {
    return datas.reduce(function(group, data) {
      (group[data[key]] = group[data[key]] || []).push(data);
      return group;
    }, {});
  }
}
