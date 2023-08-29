import { Component, Input, OnInit } from '@angular/core';
import { Customer, Tag } from '@api/models/customer-list.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { RestStatus } from '@common/enums/rest-enum';
import { CommonUtil } from '@common/utils/common-util';
import { NbDialogRef } from '@nebular/theme';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { catchError, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.dialog.component.html',
})
export class DetailDialogComponent implements OnInit {

  @Input() customerId: string;

  departmentTag: {[x: number]: Tag[]};
  departments: Array<string> = [];
  datas: Customer;
  selectedDepartment: string;

  constructor(
    protected ref: NbDialogRef<DetailDialogComponent>,
    private customerManageService: CustomerManageService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.customerManageService.getCustomerRow(this.customerId).pipe(
      catchError(err => {
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回用戶列表', ['pages', 'customer-manage', 'customer-list']);
        this.loadingService.close();
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.datas = res.result;
        this.departmentTag = CommonUtil.groupBy(res.result.tagSetting, 'department', false);
        this.departments = Object.keys(this.departmentTag);
        this.selectedDepartment = this.departments[0];
        this.loadingService.close();
      })
    ).subscribe();
  }

  close() {
    this.ref.close();
  }
}
