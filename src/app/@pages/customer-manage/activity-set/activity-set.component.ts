import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityListCondition, ActivitySettingEditReq } from '@api/models/activity-list.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { Filter, Schedule } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { catchError, filter, tap } from 'rxjs/operators';
import { CustomerManageService } from '../customer-manage.service';
import { PreviewDialogComponent } from './preview-dialog/preview.dialog.component';

@Component({
  selector: 'activity-set',
  templateUrl: './activity-set.component.html',
  styleUrls: ['./activity-set.component.scss'],
})
export class ActivitySetComponent extends BaseComponent implements OnInit {

  filterList: Array<{ key: string; val: string }> = Object.entries(Filter).map(([k, v]) => ({ key: k, val: v }));
  scheduleList: Array<{ key: string; val: string }> = Object.entries(Schedule).map(([k, v]) => ({ key: k, val: v }));
  activityId: string;

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private customerManageService: CustomerManageService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,) {
    super(storageService);

    this.validateForm = new FormGroup({
      activityName: new FormControl(null, Validators.required),
      status: new FormControl('disabled', Validators.required),
      listLimit: new FormControl(null, ValidatorsUtil.number),
      filterOptions: new FormControl(false),
      startDate: new FormControl(new Date(), ValidatorsUtil.dateFmt),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), ValidatorsUtil.dateFmt),
      scheduleSettings: new FormControl(null, Validators.required),
      activityDescription: new FormControl(null),
      activityListCondition: new FormArray([
        new FormGroup({
          1: new FormControl(null, Validators.required)
        })
      ], Validators.required),
    }, [ValidatorsUtil.dateRange]);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  or(action: 'add' | 'remove', key: number) {
    if (action === 'add') {
      let ctlName = !!key ? key++ : 1;
      this.conditions.push(new FormGroup({
        [ctlName]: new FormControl(null, Validators.required)
      }));
    } else {
      this.conditions.removeAt(key)
    }
    // console.info('or', this.conditions.getRawValue())
  }

  and(i: number, action: 'add' | 'remove', key: number) {
    let fg = this.conditions.at(i) as FormGroup;
    if (action === 'add') {
      fg.setControl(`${key + 1}`, new FormControl(null, Validators.required));
    } else {
      fg.removeControl(`${key}`);
    }
    console.info('and', this.conditions.getRawValue())
  }

  get conditions(): FormArray {
    return this.validateForm.get('activityListCondition') as FormArray
  }

  err: boolean = false;
  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.params?.activityId;
    if (!!this.activityId) {
      this.loadingService.open();
      this.customerManageService.getActivitySettingRow(this.activityId).pipe(
        catchError(err => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '查無該筆資料，將為您導回客群名單', ['pages', 'customer-manage', 'activity-list']);
          throw new Error(err.message);
        }),
        filter(res => res.code === RestStatus.SUCCESS),
        tap((res) => {
          Object.keys(res.result).forEach(key => {
            if (!!this.validateForm.controls[key]) {
              switch (key) {
                case 'startDate':
                case 'endDate':
                  this.validateForm.controls[key].setValue(new Date(res.result[key]))
                  break;
                case 'filterOptions':
                  this.validateForm.controls[key].setValue(res.result[key] === 'true' ? true : false)
                  break;
                case 'activityListCondition':
                  let groupData = CommonUtil.groupBy(res.result[key], 'tagGroup');
                  if (Object.keys(groupData).length > 0) {
                    this.conditions.removeAt(0);
                  }
                  Object.keys(groupData).forEach(key => {
                    let fg = new FormGroup({});
                    let condition = groupData[key] as Array<ActivityListCondition>;
                    condition.forEach(con => {
                      fg.setControl(con.tagKey.replace('tag-', ''), new FormControl(con.tagName, Validators.required));
                    });
                    this.conditions.push(fg);
                  })
                  break;
                default:
                  this.validateForm.controls[key].setValue(res.result[key]);
                  break;
              }
            }
          });
          this.loadingService.close();
        })
      ).subscribe(res => {
        // console.info(this.validateForm.get('activityListCondition').value)
      });
    }
  }

  cancel() {
    this.router.navigate(['pages', 'customer-manage', 'activity-list']);
  }

  preview() {
    this.dialogService.open(PreviewDialogComponent, {
      dataList: this.validateForm.getRawValue()
    });
  }

  submit() {
    let valid = this.validateForm.valid;
    let reqData: ActivitySettingEditReq = this.getRequestData();
    if (valid && !this.activityId) {
      this.loadingService.open();
      this.customerManageService.createActivitySetting(reqData).pipe(
        catchError((err) => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '新增失敗', ['pages', 'customer-manage', 'activity-list']);
          throw new Error(err.message);
        }),
        tap(res => {
          console.info(res)
          this.loadingService.close();
        })).subscribe(res => {
          if (res.code === RestStatus.SUCCESS) {
            this.dialogService.alertAndBackToList(true, '新增成功', ['pages', 'customer-manage', 'activity-list'])
          }
        });
    } else if (valid && this.activityId) {
      this.loadingService.open();
      this.customerManageService.updateActivitySetting(this.activityId, reqData).pipe(
        catchError((err) => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '編輯失敗', ['pages', 'customer-manage', 'activity-list']);
          throw new Error(err.message);
        }),
        tap(res => {
          console.info(res)
          this.loadingService.close();
        })).subscribe(res => {
          if (res.code === RestStatus.SUCCESS) {
            this.dialogService.alertAndBackToList(true, '編輯成功', ['pages', 'customer-manage', 'activity-list'])
          }
        });
    }
  }

  getRequestData(): ActivitySettingEditReq {
    let reqData: ActivitySettingEditReq = this.validateForm.getRawValue();
    reqData.startDate = moment(reqData.startDate).format('YYYY-MM-DD');
    reqData.endDate = moment(reqData.endDate).format('YYYY-MM-DD');
    let conditionId: number = 0;
    let flatConditions: { conditionId: string, tagGroup: number, tagKey: string, tagName: string }[] = [];
    this.validateForm.getRawValue().activityListCondition.forEach((condition, i) => {
      Object.keys(condition).forEach((key) => {
        conditionId++;
        flatConditions.push({ conditionId: `${conditionId}`, tagGroup: i + 1, tagKey: `tag-${key}`, tagName: condition[key] });
      })
    });
    reqData.activityListCondition = flatConditions;
    return reqData;
  }

}
