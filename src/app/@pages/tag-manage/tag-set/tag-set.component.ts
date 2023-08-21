import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { TagConditionChartLine, TagConditionSetting, TagDetailView, TagSetting, TagSettingEditReq } from '@api/models/tag-manage.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { MathSymbol, Status } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { TagDimension, TagJoinValue, TagSetCondition, TagSubDimension, TagType } from '@common/enums/tag-enum';
import { CommonUtil } from '@common/utils/common-util';
import { RegExpUtil } from '@common/utils/reg-exp-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import * as moment from 'moment';
import { catchError, filter, tap } from 'rxjs/operators';
import { TagManageService } from '../tag-manage.service';
import { TagConditionDialogComponent } from './condition-dialog/condition-dialog.component';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { TagConditionChartLineMock } from '@common/mock-data/tag-condition-chart-line-mock';

@Component({
  selector: 'tag-set',
  templateUrl: './tag-set.component.html',
  styleUrls: ['./tag-set.component.scss']
})
export class TagAddComponent extends BaseComponent implements OnInit {

  //取得新增條件區塊
  get conditions(): FormArray {
    return this.validateForm.get('tagConditionSetting') as FormArray
  }

  detail: TagDetailView;
  params: any = [];//路由參數
  tagId: string;

  changeRouteName: string;
  actionName: string;// 新增/編輯/複製

  maxSizeInMB: number = 5;//檔案大小
  filePlaceholderName: string = '請上傳檔案';
  fileName: string;
  fileData: string;
  uploadType: string;
  //#region 檔案白名單
  passFileArrayStr: string = '.csv,,,,'
  passFileArray: Array<string> = ['csv']
  //#endregion

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合

  //預設狀態
  tagStatusList = [Status.enabled, Status.disabled];
  statusList: Array<{ key: string; val: string }> = Object.entries(Status)
    .filter(([k, v]) => {
      return this.tagStatusList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));
  //預設構面
  categoryList: Array<{ key: string; val: string }> = Object.entries(TagDimension).map(([k, v]) => ({ key: k, val: v }))
  subCategoryList: Array<{ key: string; val: string }> = Object.entries(TagSubDimension).map(([k, v]) => ({ key: k, val: v }))

  //預設數學符號
  tagMathSymbolList = [MathSymbol.$gt, MathSymbol.$lt, MathSymbol.$eq];
  mathSymbolList: Array<{ key: string; val: string }> = Object.entries(MathSymbol)
    .filter(([k, v]) => {
      return this.tagMathSymbolList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設標籤類型
  tagTypeList: Array<{ key: string; val: string }> = Object.entries(TagType).map(([k, v]) => ({ key: k, val: v }))

  //預設條件設定方式
  tagSetConditionList: Array<{ key: string; val: string }> = Object.entries(TagSetCondition).map(([k, v]) => ({ key: k, val: v }))

  //預設偵測條件
  condition_valueList: Array<{ key: string; val: string }> = [{ key: 'condition_A', val: '近三個月_基金_申購金額' }, { key: 'condition_B', val: '假資料B' }, { key: 'condition_C', val: '假資料C' }];

  //預設集合方式
  joinValueList: Array<{ key: string; val: string }> = Object.entries(TagJoinValue).map(([k, v]) => ({ key: k, val: v }))

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private tagManageService: TagManageService,
    private customerManageService: CustomerManageService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService);
    this.validateForm = new FormGroup({
      tagName: new FormControl(null, Validators.required),
      status: new FormControl('enabled', Validators.required),
      tagType: new FormControl('normal', Validators.required),
      conditionSettingMethod: new FormControl('normal', Validators.required),
      fileName: new FormControl(null, Validators.required),
      startDate: new FormControl(new Date(), [ValidatorsUtil.dateFmt, Validators.required]),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), [ValidatorsUtil.dateFmt, Validators.required]),
      tagDimension: new FormControl(null, Validators.required),
      tagSubDimension: new FormControl(null, Validators.required),
      tagDescription: new FormControl(null),
      conditionValue: new FormControl(null, Validators.required),
      conditionSettingQuery: new FormControl(null, Validators.required),
      tagConditionSetting: new FormArray([]),
    }, [ValidatorsUtil.dateRange]);

    this.params = this.activatedRoute.snapshot.params;
    this.tagId = this.params['tagId'];
    this.changeRouteName = this.params['changeRoute']?.toLocaleLowerCase() ?? "";
    this.actionName = CommonUtil.getActionName(this.changeRouteName);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'html',
        class: 'col-2 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'col-3 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'string',
        class: 'col-2',
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-1',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      during: {
        title: '起迄時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<span class="date">${row.startDate}~${row.endDate}</span>` : '';
        },
        sort: false,
      },
    },
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  ngOnInit(): void {
    //#region 載入編輯資料
    if (!!this.tagId) {
      this.loadingService.open();
      this.tagManageService.getTagSettingRow(this.tagId).pipe(
        catchError(err => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '查無該筆資料，將為您導回標籤列表', ['pages', 'tag-manage', 'tag-list']);
          throw new Error(err.message);
        }),
        filter(res => res.code === RestStatus.SUCCESS),
        tap((res) => {
          const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistory', res.result as TagSetting); // 異動歷程處理
          Object.keys(res.result).forEach(key => {
            if (!!this.validateForm.controls[key]) {
              switch (key) {
                case 'startDate':
                case 'endDate':
                  this.validateForm.controls[key].setValue(new Date(res.result[key]))
                  break;
                case 'tagConditionSetting':
                  this.conditions.removeAt(0);
                  res.result.tagConditionSetting.forEach((conditionSetting, index) => {
                    if (!!conditionSetting.joinValue) {
                      this.conditions.push(new FormGroup({
                        id: new FormControl(index),
                        ['detectionCondition_' + index]: new FormControl(conditionSetting.detectionCondition, Validators.required),
                        ['thresholdValue_' + index]: new FormControl(+conditionSetting.thresholdValue, [Validators.required, Validators.pattern(RegExpUtil.isNumeric)]),
                        ['joinValue_' + index]: new FormControl(conditionSetting.joinValue, Validators.required)
                      }));
                    } else {
                      this.conditions.push(new FormGroup({
                        id: new FormControl(index),
                        ['detectionCondition_' + index]: new FormControl(conditionSetting.detectionCondition, Validators.required),
                        ['thresholdValue_' + index]: new FormControl(+conditionSetting.thresholdValue, [Validators.required, Validators.pattern(RegExpUtil.isNumeric)]),
                      }));
                    }
                  })
                  //console.info(this.conditions.getRawValue());
                  break;
                default:
                  this.validateForm.controls[key].setValue(res.result[key]);
                  break;
              }
            }
          });
          if (!!processedData) {
            if (this.changeRouteName === 'edit') {
              this.isHistoryOpen = processedData.isHistoryOpen;
              this.detail = processedData.detail;
            }
          }
          this.loadingService.close();
        })
      ).subscribe(res => {
        // console.info(res.result);
        //#region 設定欄位
        const formData = this.validateForm.getRawValue();
        this.changeTagType(formData.tagType);
        this.changeConditionSettingMethod(formData.conditionSettingMethod);
        //#endregion
      });

      //#region 搜尋客群名單 BY TagId
      let searchInfo: SearchInfo = {
        apiUrl: `${this.tagManageService.tagFunc}${this.tagId}/activity-setting`,
        nowPage: this.paginator.nowPage,
        //filters: this.validateForm.getRawValue(),
        errMsg: '標籤使用範圍查無資料'
      }
      this.restDataSource = this.tableService.searchData(searchInfo);
      //#endregion
    }
    //#endregion
    else {//新增
      //#region 設定欄位
      const formData = this.validateForm.getRawValue();
      this.changeTagType(formData.tagType);
      this.changeConditionSettingMethod(formData.conditionSettingMethod);
      //#endregion
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngDoCheck() {
    // console.info('this.findInvalidControls()', this.findInvalidControls())
  }

  //#region 標籤類型 更動時切換驗證
  changeTagType(key: string) {
    this.filePlaceholderName = '請上傳檔案';
    this.removeFieldIfExists('fileName');
    this.removeFieldIfExists('conditionSettingMethod');
    this.removeFieldIfExists('conditionSettingQuery');
    this.removeFieldIfExists('tagConditionSetting');

    switch (key?.toLocaleLowerCase()) {
      case 'normal':
        this.addFieldIfNotExists('conditionSettingMethod', 'normal', Validators.required);
        this.addFieldIfNotExists('conditionSettingQuery', null, Validators.required);
        this.validateForm?.patchValue({ 'tagType': 'normal' });
        break;
      case 'document':
        this.addFieldIfNotExists('fileName', null, Validators.required);
        this.validateForm?.patchValue({ 'tagType': 'document' });
        break;
    }
  }
  //#endregion

  //#region 條件設定方式 更動時切換驗證
  changeConditionSettingMethod(key: string) {
    this.removeFieldIfExists('conditionValue');
    this.removeFieldIfExists('tagConditionSetting');
    this.removeFieldIfExists('conditionSettingQuery');

    switch (key?.toLocaleLowerCase()) {
      case 'normal':
        this.addFieldIfNotExists('conditionSettingQuery', null, Validators.required);
        this.validateForm?.patchValue({ 'conditionSettingMethod': 'normal' });
        break;
      case 'field':
        if (!this.validateForm.contains('tagConditionSetting')) {
          this.validateForm.addControl('tagConditionSetting', new FormArray([]));
        }
        this.addFieldIfNotExists('conditionValue', null, Validators.required);
        if (this.conditions?.getRawValue()?.length === 0) {
          this.conditions.push(new FormGroup({
            id: new FormControl(0),
            ['detectionCondition_' + 0]: new FormControl(null, Validators.required),
            ['thresholdValue_' + 0]: new FormControl(null, [Validators.required, Validators.pattern(RegExpUtil.isNumeric)]),
          }));
        }
        this.validateForm?.patchValue({ 'conditionSettingMethod': 'field' });
        break;
    }

    this.conditions?.updateValueAndValidity();
  }
  //#endregion

  //#region 基本欄位檢核(新增/刪除)
  addFieldIfNotExists(fieldName: string, defaultValue: any, validationRules?: any) {
    if (!this.validateForm.contains(fieldName)) {
      this.validateForm.addControl(fieldName, new FormControl(defaultValue, validationRules));
    }
  }

  removeFieldIfExists(fieldName: string) {
    if (this.validateForm.contains(fieldName)) {
      this.validateForm.removeControl(fieldName);
    }
  }
  //#endregion

  //#region 條件區塊異動
  changeConditionsBtn(action: 'add' | 'remove', index: number) {
    if (action === 'add') {
      while (this.conditions.controls.filter(f => f.value.id === index).length > 0) {
        index = index + 1
      }
      this.conditions.push(new FormGroup({
        id: new FormControl(index),
        ['detectionCondition_' + index]: new FormControl(null, Validators.required),
        ['thresholdValue_' + index]: new FormControl(null, Validators.required)
      }));
      //最後一個選單前加入其餘欄位驗證
      for (let i = 0; i < this.conditions.length - 1; i++) {
        if (Object.keys(this.conditions.controls[i]?.value).length === 3) {
          this.setConditions('add', 'joinValue_', this.conditions.controls[i].get('id').value, i)
        }
      }
    } else {
      this.conditions.removeAt(index);
    }

    // console.info('changeConditionsBtn', this.conditions.getRawValue())
  }

  setConditions(action: 'add' | 'remove', key: string, id: number, index: number) {
    let fg = this.conditions.at(index) as FormGroup;
    if (action === 'add') {
      fg.setControl(`${key + id}`, new FormControl(null, Validators.required));
    } else {
      fg.removeControl(`${key}`);
    }
    // console.info('setConditions', this.conditions.getRawValue())
  }
  //#endregion

  //#region 檔案上傳(轉Base64)並驗證
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileValidatorResult = this.fileValidator(file);
    this.filePlaceholderName = CommonUtil.isBlank(file?.name) ? this.filePlaceholderName : file.name;
    if (fileValidatorResult !== null) {
      this.validateForm?.get('fileName')?.setErrors(fileValidatorResult);
      this.filePlaceholderName = '請上傳檔案';
      return
    }

    CommonUtil.convertFileToBase64(file)
      .then(base64String => {
        this.fileName = this.getFileNameWithoutExtension(file.name);
        this.fileData = base64String;
        this.uploadType = file.type;
      })
      .catch(error => {
        this.validateForm?.get('fileName')?.setErrors({ uploadFileMsg: error });
        return
      });

    this.validateForm?.get('fileName')?.setErrors(null);

  }

  fileValidator(file: File): { [key: string]: any } | null {
    if (!file) {
      return { uploadFileMsg: '未選擇檔案' };
    }

    // 驗證檔案大小
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > this.maxSizeInMB) {
      return { uploadFileMsg: '檔案大小超過5MB' };
    }

    // 驗證檔案格式
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!this.passFileArray.includes(fileExt)) {
      return { uploadFileMsg: '檔案格式錯誤' };
    }

    // 驗證通過，返回null表示驗證成功
    return null;
  }
  //#endregion

  //#region 抓檔案名稱並無副檔名
  getFileNameWithoutExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return fileName.substring(0, lastDotIndex);
    } else {
      return fileName;
    }
  }
  //#endregion

  //#region 刪除最後一個特定字元(含重複)
  removeLastCharIfEquals(inputString, targetChar) {
    if (!inputString || !targetChar) {
      return inputString;
    }

    const regex = new RegExp(`${targetChar}+[^${targetChar}]*$`);
    const result = inputString.replace(regex, '');

    return result;
  }
  //#endregion

  //#region 取得FormArray裡的FormGroup 和 getConditionId
  //取得FormArray裡的FormGroup
  getFormGroupInFormArray(formArrayName: string, index: number): FormGroup {
    return CommonUtil.getFormGroupInFormArray(this.validateForm, formArrayName, index);
  }

  getConditionId(index: number): number {
    return CommonUtil.getFormGroupInFormArray(this.validateForm, 'tagConditionSetting', index).get('id').value;
  }
  //#endregion

  //#region 條件分佈級距彈出視窗
  conditionDialog() {
    //這裡要改 call API
    const conditionDialogData = TagConditionChartLineMock as TagConditionChartLine;
    this.dialogService.open(TagConditionDialogComponent, {
      title: '條件分佈級距',
      data: conditionDialogData,
    });
  }
  //#endregion

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

  submit() {
    const valid = this.validateForm.valid;
    const reqData: TagSettingEditReq = this.getRequestData();

    if (!valid || !reqData) {
      const route = this.tagId ? [this.changeRouteName, this.tagId] : [];
      this.dialogService.alertAndBackToList(false, `${this.actionName}驗證失敗`, ['pages', 'tag-manage', 'tag-set', ...route]);
      return
    }

    // 調用(新增or複製)或編輯
    this.saveTagSetting(reqData);
  }

  //#region (新增or複製)或編輯
  saveTagSetting(reqData: any) {
    this.loadingService.open();

    const requestObservable = (this.tagId && this.changeRouteName === 'edit')
      ? this.tagManageService.updateTagSetting(this.tagId, reqData)
      : this.tagManageService.createTagSetting(reqData);

    requestObservable.pipe(
      catchError((err) => {
        this.loadingService.close();
        const route = this.tagId ? [this.changeRouteName, this.tagId] : [];
        this.dialogService.alertAndBackToList(false, `${this.actionName}失敗`, ['pages', 'tag-manage', 'tag-set', ...route]);
        throw new Error(err.message);
      }),
      tap(res => {
        // console.info(res);
        this.loadingService.close();
      })
    ).subscribe(res => {
      if (res.code === RestStatus.SUCCESS) {
        this.dialogService.alertAndBackToList(true, `${this.actionName}成功`, ['pages', 'tag-manage', 'tag-list']);
      }
    });
  }
  //#endregion

  //#region 組送出資料
  getRequestData(): TagSettingEditReq {
    const formData = this.validateForm.getRawValue();

    if (!formData) return undefined

    let reqData = new TagSettingEditReq({
      tagId: this.tagId,
      tagName: formData.tagName,
      status: formData.status,
      tagType: formData.tagType,
      uploadType: (formData.tagType === 'document') ? this.uploadType : null,
      fileName: (formData.tagType === 'document') ? this.fileName : null,
      //filePath: formData.filePath,
      fileData: (formData.tagType === 'document') ? this.fileData : null,
      conditionSettingMethod: formData.conditionSettingMethod, //條件設定方式
      startDate: formData.startDate ? moment(formData.startDate).format('YYYY-MM-DD') : null,
      endDate: formData.endDate ? moment(formData.endDate).format('YYYY-MM-DD') : null,
      tagDimension: formData.tagDimension,
      tagSubDimension: formData.tagSubDimension,
      tagDescription: formData.TagDescription,
      conditionSettingQuery:
        (formData.tagType === 'normal' && formData.conditionSettingMethod === 'normal') ?
          formData.conditionSettingQuery : null, //條件設定語法
      tagConditionSetting:
        (formData.tagType === 'normal' && formData.conditionSettingMethod === 'field' && Array.isArray(formData.tagConditionSetting)) ?
          formData.tagConditionSetting.map((m) => {
            const id = m['id'];
            return new TagConditionSetting({
              tagId: this.tagId,
              groupId: 1,//因只有一個，固定為1
              conditionValue: formData.conditionValue,
              detectionCondition: m['detectionCondition_' + id],
              thresholdValue: m['thresholdValue_' + id],
              joinValue: m['joinValue_' + id],
            });
          }) : null,
    });

    return reqData;
  }
  //#endregion

}
