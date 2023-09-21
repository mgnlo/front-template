import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { TagConditionChartLine, TagConditionReq, TagConditionSetting, TagDetailView, TagSetting, TagSettingEditReq } from '@api/models/tag-manage.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { MathSymbol, Status } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { TagJoinValue, TagSetCondition, TagType } from '@common/enums/tag-enum';
import { CommonUtil } from '@common/utils/common-util';
import { RegExpUtil } from '@common/utils/reg-exp-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { catchError, filter, tap, finalize, first } from 'rxjs/operators';
import { TagManageService } from '../tag-manage.service';
import { TagConditionDialogComponent } from './condition-dialog/condition-dialog.component';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { TagConditionChartLineMock } from '@common/mock-data/tag-condition-chart-line-mock';
import { FileService } from '@api/services/file.service';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { ConfigService } from '@api/services/config.service';
import { TagCategoryMock, TagSubCategoryMock } from '@common/mock-data/tag-category-mock';
import { FileResp } from '@api/models/file.model';
import { TagConditionMock } from '@common/mock-data/tag-condition-mock';
import { LoginService } from '@api/services/login.service';

@Component({
  selector: 'tag-set',
  templateUrl: './tag-set.component.html',
  styleUrls: ['./tag-set.component.scss']
})
export class TagSetComponent extends BaseComponent implements OnInit {

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
  uploadFileName: string;
  fileData: string;
  uploadType: string;
  //#region 檔案白名單
  passFileArrayStr: string = '.csv,,,,'
  passFileArray: Array<string> = ['csv']
  //#endregion

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合

  //偵測條件下拉
  selectedConditionKey: string = '';
  selectedConditionVal: string = '';
  isInit: boolean = false; //控制偵測條件下拉的auto-complete要不要show

  //預設狀態
  tagStatusList = [Status.enabled, Status.disabled];
  statusList: Array<{ key: string; val: string }> = Object.entries(Status)
    .filter(([k, v]) => {
      return this.tagStatusList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設構面
  beforeCategoryVal: string = '';
  beforeSubCategoryVal: string = '';

  categoryList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();
  subCategoryList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();

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
  conditionKeyList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();
  filterConditionKeyList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();

  //預設集合方式
  joinValueList: Array<{ key: string; val: string }> = Object.entries(TagJoinValue).map(([k, v]) => ({ key: k, val: v }))

  //預設條件分佈級距
  conditionDialogData: TagConditionChartLine;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tagManageService: TagManageService,
    private fileService: FileService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
    this.validateForm = new FormGroup({
      tagName: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
      status: new FormControl('enabled', Validators.required),
      tagType: new FormControl('normal', Validators.required),
      conditionSettingMethod: new FormControl('normal', Validators.required),
      fileName: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
      startDate: new FormControl(new Date(), [ValidatorsUtil.dateFmt, Validators.required]),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), [ValidatorsUtil.dateFmt, Validators.required]),
      categoryKey: new FormControl(null, Validators.required),
      tagTopicKey: new FormControl({ value: null, disabled: true }, Validators.required),
      tagDescription: new FormControl(null),
      conditionKey: new FormControl({ value: null, disabled: true }, [Validators.required, this.existsInConditionKeyList]),
      conditionSettingQuery: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
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
        type: 'string',
        sort: false,
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p>${(cell ?? "")}</p>`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: any, row: any) => {
          if (!cell) { return '' }
          return `<p class="text_center">` + (cell ?? "") + `</p>`;
        },
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: any, row: any) => {
          if (!cell) { return '' }
          return `<p class="text_center">` + (cell ?? "") + `</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string, row: TagSetting) => {
          return `<p class="text_center">${(Status[row.reviewStatus] || Status[cell] || '')}</p>`;
        },
        sort: false,
      },
      during: {
        title: '起迄時間',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<p class="text_center">${row?.startDate} ~ ${row?.endDate}</p>` : '';
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
    //#region 抓取(主)標籤構面
    this.getTagCategoryList();
    //#endregion

    //#region 載入編輯資料
    if (!!this.tagId) {
      this.loadingService.open();

      if (this.isMock) {
        let mockData = TagSettingMock.find(tag => tag.tagId === this.tagId)
        this.setData(mockData);
        this.loadingService.close();
        const formData = this.validateForm.getRawValue();
        this.changeTagType(formData.tagType);
        this.changeConditionSettingMethod(formData.conditionSettingMethod);
        this.dataSource.load(ActivityListMock);
        return;
      }

      this.tagManageService.getTagSettingRow(this.tagId).pipe(
        catchError(err => {
          this.dialogService.alertAndBackToList(false, '查無該筆資料，將為您導回標籤列表', ['pages', 'tag-manage', 'tag-list']);
          throw new Error(err.message);
        }),
        filter(res => res.code === RestStatus.SUCCESS),
        tap((res) => {
          this.detail = JSON.parse(JSON.stringify(res.result));
          console.info('this.detail', this.detail)
          const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistoryAud', res.result as TagSetting); // 異動歷程處理

          this.setData(this.detail);

          if (!!processedData) {
            if (this.changeRouteName === 'edit') {
              this.isHistoryOpen = processedData.isHistoryOpen;
              this.detail.historyGroupView = processedData.detail?.historyGroupView;
            }
          }

          this.changeTagType(this.detail.tagType);
          this.changeConditionSettingMethod(this.detail.conditionSettingMethod);
        }),
        finalize(() => {
          this.loadingService.close();
        })
      ).subscribe();

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
      this.validateForm.get('endDate')?.patchValue(new Date('9999-12-31'));
      //#region 設定欄位
      const formData = this.validateForm.getRawValue();
      this.changeTagType(formData.tagType);
      this.changeConditionSettingMethod(formData.conditionSettingMethod);
      //#endregion
    }
  }

  ngDoCheck() {
    this.validateForm.get('categoryKey').valueChanges.pipe(first()).subscribe(() => {
      //第一次load回資料塞值的時候
      this.isInit = true;
    });
    // console.info('this.findInvalidControls()', this.findInvalidControls())
    const categoryKeyVal = this.validateForm.get('categoryKey')?.value;
    if (CommonUtil.isNotBlank(categoryKeyVal) && categoryKeyVal != this.beforeCategoryVal) {
      this.beforeCategoryVal = categoryKeyVal;
      // console.info('categoryKey', categoryKey)
      this.getTagSubCategoryList(categoryKeyVal);

      if (CommonUtil.isBlank(this.validateForm.get('tagTopicKey')?.value)) return

      this.validateForm?.get('tagTopicKey')?.patchValue('');
      this.validateForm?.get('tagTopicKey')?.setErrors({ 'tagTopicKeyErrMsg': '請重新選擇' });
    }

    const tagTopicKeyVal = this.validateForm.get('tagTopicKey')?.value;
    if (CommonUtil.isNotBlank(categoryKeyVal) &&
      CommonUtil.isNotBlank(tagTopicKeyVal) &&
      tagTopicKeyVal != this.beforeSubCategoryVal &&
      this.validateForm.get('conditionSettingMethod')?.value === 'field') {
      this.beforeSubCategoryVal = tagTopicKeyVal;
      //#region 抓取偵測條件
      this.getConditionKeyList(categoryKeyVal, tagTopicKeyVal);
      //#endregion
      if (CommonUtil.isBlank(this.validateForm.get('conditionKey')?.value)) return
    }
  }

  //#region 取得標籤構面List
  getTagCategoryList(): void {
    this.categoryList = new Array<{ key: string; val: string }>();

    if (this.isMock) {
      TagCategoryMock.forEach((category) => {
        this.categoryList.push({ key: category.categoryKey, val: category.categoryName });
      });
      return
    }

    this.tagManageService.getTagCategoryListOption().pipe(
      catchError((err) => {
        this.dialogService.alertAndBackToList(false, '查詢標籤構面失敗');
        this.validateForm?.get('categoryKey')?.setErrors({ 'categoryKeyErrMsg': err.message ? err.message : '查詢標籤構面失敗' });
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        const mapArray = JSON.parse(JSON.stringify(res.result)) as Record<string, string>;
        if (!mapArray || Object.keys(mapArray).length === 0) {
          this.dialogService.alertAndBackToList(false, '查無標籤構面');
          this.validateForm?.get('categoryKey')?.setErrors({ 'categoryKeyErrMsg': '查無標籤構面' });
          return;
        }

        this.categoryList = Object.entries(mapArray).map(([key, val]) => ({ key, val }));
      })
    ).subscribe()
  }

  getTagSubCategoryList(categoryKeyVal: string): void {
    this.subCategoryList = new Array<{ key: string; val: string }>();
    if (CommonUtil.isBlank(categoryKeyVal)) return

    this.validateForm.get('tagTopicKey').enable();

    if (this.isMock) {
      TagSubCategoryMock.tagTopic.forEach((tagTopic) => {
        this.subCategoryList.push({ key: tagTopic.tagTopicKey, val: tagTopic.tagTopicName });
      });
      return
    }

    this.tagManageService.getTagSubCategoryListOption(categoryKeyVal).pipe(
      catchError((err) => {
        this.dialogService.alertAndBackToList(false, '查詢子標籤構面失敗');
        this.validateForm?.get('tagTopicKey')?.setErrors({ 'tagTopicKeyErrMsg': err.message ? err.message : '查詢子標籤構面失敗' });
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        const mapArray = JSON.parse(JSON.stringify(res.result)) as Record<string, string>;
        if (!mapArray || Object.keys(mapArray).length === 0) {
          this.dialogService.alertAndBackToList(false, '查無子標籤構面');
          this.validateForm?.get('tagTopicKey')?.setErrors({ 'tagTopicKeyErrMsg': '查無子標籤構面' });
          return;
        }

        this.subCategoryList = Object.entries(mapArray).map(([key, val]) => ({ key, val }));
        if (this.tagId) {
          this.validateForm?.get('tagTopicKey').patchValue(this.detail?.tagTopicKey)
        }
      })
    ).subscribe()
  }
  //#endregion

  //#region 標籤類型 更動時切換驗證
  changeTagType(key: string) {
    this.validateForm?.get('fileName')?.patchValue('');
    this.removeFieldIfExists('fileName');
    this.removeFieldIfExists('conditionSettingMethod');
    this.removeFieldIfExists('conditionSettingQuery');

    switch (key?.toLocaleLowerCase()) {
      case 'normal':
        this.addFieldIfNotExists('conditionSettingMethod', 'normal', Validators.required);
        this.addFieldIfNotExists('conditionSettingQuery', this.detail?.conditionSettingQuery, [Validators.required, ValidatorsUtil.blank]);
        this.validateForm?.patchValue({ 'tagType': 'normal' });
        break;
      case 'document':
        this.addFieldIfNotExists('fileName', null, Validators.required);
        this.validateForm.get('fileName').patchValue(this.detail?.fileName);
        this.validateForm?.patchValue({ 'tagType': 'document' });
        break;
    }
  }
  //#endregion

  //#region 條件設定方式 更動時切換驗證
  changeConditionSettingMethod(key: string) {
    this.removeFieldIfExists('conditionKey');
    this.removeFieldIfExists('tagConditionSetting');
    this.removeFieldIfExists('conditionSettingQuery');

    switch (key?.toLocaleLowerCase()) {
      case 'normal':
        this.addFieldIfNotExists('conditionSettingQuery', this.detail?.conditionSettingQuery, [Validators.required, ValidatorsUtil.blank]);
        this.validateForm?.patchValue({ 'conditionSettingMethod': 'normal' });
        break;
      case 'field':
        if (!this.validateForm.contains('tagConditionSetting')) {
          this.validateForm.addControl('tagConditionSetting', new FormArray([]));
        }
        this.addFieldIfNotExists('conditionKey', null, [Validators.required, this.existsInConditionKeyList]);

        this.createConditionControl(this.detail?.tagConditionSetting);

        if (!this.detail?.tagConditionSetting || this.detail?.tagConditionSetting?.length === 0) {
          if (this.conditions?.getRawValue()?.length === 0) {
            this.conditions.push(new FormGroup({
              id: new FormControl(0),
              ['detectionCondition_' + 0]: new FormControl(null, Validators.required),
              ['thresholdValue_' + 0]: new FormControl(null, [Validators.required, Validators.pattern(RegExpUtil.isNumeric)]),
            }));
          }
        }
        this.validateForm?.patchValue({ 'conditionSettingMethod': 'field' });
        //#region 抓取偵測條件
        const categoryKeyVal = this.validateForm.get('categoryKey')?.value;
        const tagTopicKeyVal = this.validateForm.get('tagTopicKey')?.value;
        this.getConditionKeyList(categoryKeyVal, tagTopicKeyVal);
        //#endregion
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

  //#region 取得偵測條件下拉資料&&塞選查詢  //取得圖表資料
  //取得偵測條件下拉資料
  getConditionKeyList(categoryKeyVal: string, tagTopicKeyVal: string): void {
    this.conditionKeyList = new Array<{ key: string; val: string }>();
    this.filterConditionKeyList = new Array<{ key: string; val: string }>();

    if (CommonUtil.isBlank(categoryKeyVal) || CommonUtil.isBlank(tagTopicKeyVal)) return

    this.validateForm.get('conditionKey').enable();

    if (this.isMock) {
      TagConditionMock.forEach((condition) => this.conditionKeyList.push({ key: condition.conditionKey, val: condition.conditionName }))
      this.filterConditionKeyList = [...this.conditionKeyList];
      return
    }

    this.tagManageService.getTagFilterConditionListOption(
      new TagConditionReq(
        {
          categoryKey: categoryKeyVal,
          tagTopicKey: tagTopicKeyVal
        })).pipe(
          catchError((err) => {
            this.dialogService.alertAndBackToList(false, '查詢偵測條件失敗');
            this.validateForm?.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': err.message ? err.message : '查詢偵測條件失敗' });
            throw new Error(err.message);
          }),
          filter(res => res.code === RestStatus.SUCCESS),
          tap(res => {
            const mapArray = JSON.parse(JSON.stringify(res.result)) as Record<string, string>;
            if (!mapArray || Object.keys(mapArray).length === 0) {
              this.dialogService.alertAndBackToList(false, '查無偵測條件');
              this.validateForm?.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '查無偵測條件' });
              return;
            }

            this.conditionKeyList = Object.entries(mapArray).map(([key, val]) => ({ key, val }));
            this.filterConditionKeyList = [...this.conditionKeyList];
            if (this.tagId) {
              const conditionKey = this.conditionKeyList.find(f => f.key == this.detail?.tagConditionSetting?.[0]?.conditionKey)
              this.selectedConditionKey = conditionKey?.key;
              this.selectedConditionVal = conditionKey?.val;
              this.validateForm.get('conditionKey').patchValue(conditionKey?.val);
              this.conditionKeyFilter(conditionKey?.val);
              this.getTagConditionalDistribution();
            }
          }),
        ).subscribe();
  }

  onBlurConditionKeyInput(): void {
    if (this.validateForm.get('conditionKey')?.hasError('condition_valueErrMsg')) return

    if (this.conditionKeyList?.length === 0) {
      this.validateForm.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '查無偵測條件' });
      return
    }

    if (CommonUtil.isBlank(this.selectedConditionKey) && !this.tagId) {
      this.validateForm.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '請點選一筆' });
      return
    }

    this.validateForm.get('conditionKey')?.setErrors(null);
  }

  //輸入查詢
  onConditionKeyChange(event: any) {
    this.selectedConditionKey = '';
    this.conditionDialogData = undefined;

    this.conditionKeyFilter(event.target.value);

    if (this.validateForm.get('conditionKey')?.hasError('condition_valueErrMsg')) return

    if (CommonUtil.isBlank(this.selectedConditionKey)) {
      this.validateForm.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '請點選一筆' });
    }
  }

  //下拉選擇
  onConditionKeySelectChange(event: any) {
    // console.info('event',event)
    if (CommonUtil.isBlank(event.key) || CommonUtil.isBlank(event.val)) {
      return
    }

    this.selectedConditionKey = event.key;
    this.selectedConditionVal = event.val;

    // console.log('selectedConditionKey Value:', this.selectedConditionKey);
    // console.log('Selected Value:', this.selectedConditionVal);

    this.getTagConditionalDistribution();

    this.conditionKeyFilter(this.selectedConditionVal);

    this.validateForm.get('conditionKey').setValue(this.selectedConditionVal);
  }

  //篩選邏輯
  conditionKeyFilter(value: string): void {
    const filterValue = value?.toLowerCase();

    this.filterConditionKeyList = new Array<{ key: string; val: string }>();

    if (CommonUtil.isBlank(filterValue)) {
      this.filterConditionKeyList = [...this.conditionKeyList];
      return
    }

    this.filterConditionKeyList = this.conditionKeyList.filter((f) => {
      return f.val?.toLowerCase()?.includes(filterValue);
    })
  }

  //取得圖表資料
  getTagConditionalDistribution() {
    const conditionId = this.selectedConditionKey

    if (this.isMock) {
      this.conditionDialogData = TagConditionChartLineMock as TagConditionChartLine;
      return
    }

    if (!conditionId) {
      this.conditionDialogData = undefined;
      return
    }

    this.tagManageService.getTagConditionalDistribution(conditionId).pipe(
      catchError((err) => {
        this.dialogService.alertAndBackToList(false, '取得圖表資料失敗');
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        this.conditionDialogData = JSON.parse(JSON.stringify(res.result))
      })
    ).subscribe();
  }

  // 檢查是否存在清單中
  existsInConditionKeyList = (ctl: FormControl): { [key: string]: any } | null => {
    //console.info('ctl', ctl)
    let filterValue = '';
    if (ctl?.value instanceof Object && 'key' in ctl?.value && 'val' in ctl?.value) {
      filterValue = ctl?.value?.val?.toLowerCase()
    } else {
      filterValue = ctl?.value?.toLowerCase()
    }

    if ((ctl.dirty || ctl.touched || ctl.valueChanges) && this.conditionKeyList) {
      // console.info('this.dataList', this.dataList)
      // console.info('filterValue', filterValue)
      if (!CommonUtil.isBlank(filterValue) && this.conditionKeyList.filter(item => item?.val?.toLowerCase() === filterValue).length === 0) {
        return { 'condition_valueErrMsg': '不存在偵測條件清單中' }; // 驗證失敗
      }
    }

    if ((ctl.dirty || ctl.touched) && CommonUtil.isBlank(filterValue)) {
      return { 'condition_valueErrMsg': '不可為空' }; // 驗證失敗
    }

    return null; // 驗證成功
  };
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

  createConditionControl(tagConditionSetting: TagConditionSetting[]) {
    tagConditionSetting?.forEach((conditionSetting, index) => {
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
  }
  //#endregion

  //#region 檔案上傳並驗證
  onUploadFile(event: any) {
    // console.log('event', event);

    const file: File = event.target.files[0];
    const fileValidatorResult = this.fileValidator(file);
    if (fileValidatorResult !== null) {
      this.validateForm?.get('fileName')?.setErrors(fileValidatorResult);
      this.validateForm?.get('fileName')?.patchValue('');
      return
    }

    this.validateForm?.get('fileName')?.patchValue(file?.name);
    this.uploadFileName = CommonUtil.getFileNameWithoutExtension(file?.name);
    this.uploadType = file?.type?.split('/')?.[1] ? file?.type?.split('/')?.[1] : CommonUtil.getFileExtension(file?.name);

    let formData = new FormData();
    formData.append('fileData', file);

    this.loadingService.open();
    this.fileService.uploadFileService(formData).pipe(
      catchError((err) => {
        this.dialogService.alertAndBackToList(false, '檔案上傳失敗');
        this.validateForm?.get('fileName')?.setErrors({ uploadFileMsg: err.message ? err.message : '檔案上傳失敗' });
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        const result = JSON.parse(JSON.stringify(res.result)) as FileResp
        const fileId = result.fileDataId;
        if (CommonUtil.isBlank(fileId)) {
          this.validateForm?.get('fileName')?.setErrors({ uploadFileMsg: '檔案上傳失敗(識別碼為空)' });
          return
        }
        this.fileData = fileId;
        this.validateForm?.get('fileName')?.setErrors(null);
      }),
      finalize(() => {
        this.loadingService.close();
      })
    ).subscribe();
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

  //#region 刪除最後一個特定字元(含重複)
  removeLastCharIfEquals(inputString: string, targetChar: string) {
    return CommonUtil.removeLastCharIfEquals(inputString, targetChar);
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
    this.dialogService.open(TagConditionDialogComponent, {
      title: '條件分佈級距',
      data: this.conditionDialogData,
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
        const route = this.tagId ? [this.changeRouteName, this.tagId] : [];
        this.dialogService.alertAndBackToList(false, `${this.actionName}失敗`, ['pages', 'tag-manage', 'tag-set', ...route]);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(() => {
        // console.info(res);
        this.dialogService.alertAndBackToList(true, `${this.actionName}標籤送審成功`, ['pages', 'tag-manage', 'tag-list']);
      }),
      finalize(() => {
        this.loadingService.close();
      })
    ).subscribe();
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
      fileName: (formData.tagType === 'document') ? this.uploadFileName : null,
      //filePath: formData.filePath,
      fileData: (formData.tagType === 'document') ? this.fileData : null,
      conditionSettingMethod: formData.conditionSettingMethod, //條件設定方式
      startDate: formData.startDate ? moment(formData.startDate).format('YYYY-MM-DD') : null,
      endDate: formData.endDate ? moment(formData.endDate).format('YYYY-MM-DD') : null,
      categoryKey: formData.categoryKey,
      tagTopicKey: formData.tagTopicKey,
      tagDescription: formData.tagDescription,
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
              conditionKey: this.filterConditionKeyList.find(item => item.val === formData.conditionKey)?.key,
              detectionCondition: m['detectionCondition_' + id],
              thresholdValue: m['thresholdValue_' + id],
              joinValue: m['joinValue_' + id],
            });
          }) : null,
    });

    console.info('reqData', reqData)
    return reqData;
  }

  setData(result: TagSetting) {
    this.detail = JSON.parse(JSON.stringify(result));
    const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistoryAud', result as TagSetting); // 異動歷程處理
    Object.keys(result).forEach(key => {
      if (!!this.validateForm.controls[key]) {
        switch (key) {
          case 'startDate':
          case 'endDate':
            this.validateForm.controls[key].setValue(new Date(result[key]))
            break;
          case 'tagConditionSetting':
            this.conditions.removeAt(0);
            this.createConditionControl(result.tagConditionSetting);

            //console.info(this.conditions.getRawValue());
            break;
          default:
            this.validateForm.controls[key].setValue(result[key]);
            break;
        }
      }
    });
    if (!!processedData) {
      if (this.changeRouteName === 'edit') {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail.historyGroupView = processedData.detail?.historyGroupView;
      }
    }
  }
  //#endregion

}
