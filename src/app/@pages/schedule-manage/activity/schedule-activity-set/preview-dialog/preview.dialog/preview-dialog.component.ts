import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from '@api/services/config.service';
import { StorageService } from '@api/services/storage.service';
import { CommonUtil } from '@common/utils/common-util';
import { NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss']
})
export class PreviewDialogComponent extends BaseComponent implements OnInit {

  @Input() title: string;
  @Input() dataList: Array<{ key: string; val: string }>;

  selectedActivityId: string = '';
  selectedActivityValue: string = '';

  filterDataList: Array<{ key: string; val: string }> = [];

  constructor(
    private ref: NbDialogRef<PreviewDialogComponent>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    storageService: StorageService, configService: ConfigService,
  ) {
    super(storageService, configService);
    this.validateForm = new FormGroup({
      activityName: new FormControl(null, this.existsInActivityList),
    });
  }

  onBlurActivityInput(): void {
    if (this.validateForm.get('activityName')?.hasError('activityErrMsg')) return

    if (CommonUtil.isBlank(this.selectedActivityId)) {
      this.validateForm.get('activityName')?.setErrors({ 'activityErrMsg': '請點選一筆' });
      return
    }

    this.validateForm.get('activityName')?.setErrors(null);
  }

  //輸入查詢
  onActivityChange(event: any) {
    this.selectedActivityId = '';
    this.filterDataList = this.activityFilter(event.target.value);

    if (this.validateForm.get('activityName')?.hasError('activityErrMsg')) return

    if (CommonUtil.isBlank(this.selectedActivityId)) {
      this.validateForm.get('activityName')?.setErrors({ 'activityErrMsg': '請點選一筆' });
    }
  }

  //下拉選擇
  onActivitySelectChange(event: any) {
    if (CommonUtil.isBlank(event.key) || CommonUtil.isBlank(event.val)) {
      return null;
    }
    this.selectedActivityId = event.key;
    this.selectedActivityValue = event.val;
    // console.log('selectedActivityId :', this.selectedActivityId);
    // console.log('selectedActivityValue :', this.selectedActivityValue);

    //this.filterDataList = this.activityFilter(this.selectedActivityValue);
    this.validateForm.get('activityName').setValue(this.selectedActivityValue);
  }

  //篩選邏輯
  activityFilter(value: string): Array<{ key: string; val: string }> {
    const filterValue = value?.toLowerCase();
    if (CommonUtil.isBlank(filterValue)) return this.dataList;
    return this.dataList.filter((f) => {
      return f.val?.toLowerCase()?.includes(filterValue);
    })
  }

  // 檢查條件區是否存在清單中
  existsInActivityList = (ctl: FormControl): { [key: string]: any } | null => {
    let filterValue = '';
    if (ctl?.value instanceof Object && 'key' in ctl?.value && 'val' in ctl?.value) {
      filterValue = ctl?.value?.val?.toLowerCase()
    } else {
      filterValue = ctl?.value?.toLowerCase()
    }

    if ((ctl.dirty || ctl.touched || ctl.valueChanges) && this.dataList) {
      // console.info('this.dataList', this.dataList)
      // console.info('filterValue', filterValue)
      if (!CommonUtil.isBlank(filterValue) && this.dataList.filter(item => item?.val?.toLowerCase() === filterValue).length === 0) {
        return { 'activityErrMsg': '不存在活動清單中' }; // 驗證失敗
      }
    }

    if ((ctl.dirty || ctl.touched) && CommonUtil.isBlank(filterValue)) {
      return { 'activityErrMsg': '不可為空' }; // 驗證失敗
    }

    return null; // 驗證成功
  };


  ngOnInit() {
    // console.info('this.dataList', this.dataList)
    if (this.dataList) {
      this.filterDataList = this.dataList;
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  close() {
    this.ref.close();
  }

  submit() {
    const selectedData = { key: this.selectedActivityId, val: this.selectedActivityValue };
    // console.info('selectedData', selectedData)
    this.ref.close(selectedData)
  }
}
