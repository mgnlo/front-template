import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  filterDataList: Array<{ key: string; val: string }> = [];

  constructor(private ref: NbDialogRef<PreviewDialogComponent>) {
    super();
    this.validateForm = new FormGroup({
      activityName: new FormControl(null, this.existsInActivityList),
    });
  }

  //輸入查詢
  onActivityChange(event: any) {
    const inputData = event.target.value;
    this.filterDataList = this.activityFilter(inputData);
  }

  //下拉選擇
  onActivitySelectChange(event: any) {
    this.filterDataList = this.activityFilter(event);
  }

  //塞選邏輯
  activityFilter(value: string): Array<{ key: string; val: string }> {
    const filterValue = value.toLowerCase();
    if (CommonUtil.isBlank(filterValue)) return this.dataList;
    return this.dataList.filter((f) => {
      return f.val?.toLowerCase()?.includes(filterValue);
    })
  }

  // 檢查條件區是否存在清單中
  existsInActivityList = (ctl: FormControl): { [key: string]: any } | null => {
    if ((ctl.dirty || ctl.touched || ctl.valueChanges) && this.dataList) {
      const filterValue = ctl.value?.toLowerCase();
      if (!CommonUtil.isBlank(filterValue) && this.dataList.filter(item => item.val?.toLowerCase() === filterValue).length === 0) {
        return { 'activityErrMsg': '不存在活動清單中' }; // 驗證失敗
      }
    }

    if ((ctl.dirty || ctl.touched) && CommonUtil.isBlank(ctl.value)) {
      return { 'activityErrMsg': '不可為空' }; // 驗證失敗
    }

    return null; // 驗證成功
  };


  ngOnInit() {
    if (this.dataList) {
      this.filterDataList = this.dataList;
    }
  }

  close() {
    this.ref.close();
  }

  submit() {
    const selectedValue = this.validateForm.get('activityName').value; // 取得選擇的 [value]
    const selectedId = this.filterDataList.find((item) => item.val === selectedValue)?.key; // 根據 [value] 取得對應的 [id]
    const selectedData = { key: selectedId, val: selectedValue };

    this.ref.close(selectedData)
  }
}
