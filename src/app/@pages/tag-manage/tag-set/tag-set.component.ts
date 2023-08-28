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
import { TagJoinValue, TagSetCondition, TagType } from '@common/enums/tag-enum';
import { CommonUtil } from '@common/utils/common-util';
import { RegExpUtil } from '@common/utils/reg-exp-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { catchError, filter, tap, finalize } from 'rxjs/operators';
import { TagManageService } from '../tag-manage.service';
import { TagConditionDialogComponent } from './condition-dialog/condition-dialog.component';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { TagConditionChartLineMock } from '@common/mock-data/tag-condition-chart-line-mock';
import { FileService } from '@api/services/file.service';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { ConfigService } from '@api/services/config.service';
import { TagCategoryMock } from '@common/mock-data/tag-category-mock';
import { FileResp } from '@api/models/file.model';

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

  enterKeyHandled = false;
  backspaceKeyHandled = false;

  //偵測條件下拉
  selectedConditionId: string = '';
  selectedConditionKey: string = '';

  //預設狀態
  tagStatusList = [Status.enabled, Status.disabled];
  statusList: Array<{ key: string; val: string }> = Object.entries(Status)
    .filter(([k, v]) => {
      return this.tagStatusList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設構面
  beforeCategory: string = '';

  categoryList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();
  subCategoryList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();

  tempCategoryList: Array<{ groupId: number; key: string; val: string }> = new Array<{ groupId: number; key: string; val: string }>();
  tempSubCategoryList: Array<{ groupId: number; key: string; val: string }> = new Array<{ groupId: number; key: string; val: string }>();

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
    private router: Router,
    configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private tagManageService: TagManageService,
    private fileService: FileService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService);
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
      conditionKey: new FormControl(null, [Validators.required, this.existsInConditionKeyList]),
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
    //#region 抓取(主/子)標籤構面
    this.categoryList = new Array<{ key: string; val: string }>();
    this.subCategoryList = new Array<{ key: string; val: string }>();
    this.tempCategoryList = new Array<{ groupId: number; key: string; val: string }>();
    this.tempSubCategoryList = new Array<{ groupId: number; key: string; val: string }>();

    this.tagManageService.getTagDimensionList().pipe(
      catchError((err) => {
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        const respData = JSON.parse(JSON.stringify(res.result));
        if (!respData || respData?.length == 0) return

        respData.forEach((category, index) => {
          this.categoryList.push({ key: category.categoryKey, val: category.categoryName });
          this.tempCategoryList.push({ groupId: index + 1, key: category.categoryKey, val: category.categoryName })

          category.tagTopic.forEach(subCategory => {
            this.subCategoryList.push({ key: subCategory.tagTopicKey, val: subCategory.tagTopicName });
            this.tempSubCategoryList.push({ groupId: index + 1, key: subCategory.tagTopicKey, val: subCategory.tagTopicName });
          });
        });

      })
    ).subscribe((res) => {
      //console.info('res', res)
    })

    if (true) {
      TagCategoryMock.forEach((category, index) => {
        this.categoryList.push({ key: category.categoryKey, val: category.categoryName });
        this.tempCategoryList.push({ groupId: index + 1, key: category.categoryKey, val: category.categoryName })

        category.tagTopic.forEach(subCategory => {
          this.subCategoryList.push({ key: subCategory.tagTopicKey, val: subCategory.tagTopicName });
          this.tempSubCategoryList.push({ groupId: index + 1, key: subCategory.tagTopicKey, val: subCategory.tagTopicName });
        });
      });
      // console.info('this.categoryList', this.categoryList)
      // console.info('this.tempCategoryList', this.tempCategoryList)
      // console.info('this.subCategoryList', this.subCategoryList)
      // console.info('this.tempSubCategoryList', this.tempSubCategoryList)
    }
    //#endregion

    //#region 載入編輯資料
    if (!!this.tagId) {
      this.loadingService.open();

      if (this.isMock) {
        let mockData = TagSettingMock.find(tag => tag.tagId === this.tagId)
        this.setData(mockData);
        this.loadingService.close();
        const formData = this.validateForm.getRawValue();
        this.changeConditionSettingMethod(formData.conditionSettingMethod);
        this.changeTagType(formData.tagType);
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
              this.detail.historyGroupView = processedData.detail?.historyGroupView;
            }
          }
        }),
        finalize(() => {
          this.loadingService.close();
        })
      ).subscribe(res => {
        // console.info(res.result);
        //#region 設定欄位
        const formData = this.validateForm.getRawValue();
        this.changeConditionSettingMethod(formData.conditionSettingMethod);
        this.changeTagType(formData.tagType);
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
      this.changeConditionSettingMethod(formData.conditionSettingMethod);
      this.changeTagType(formData.tagType);
      //#endregion
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngDoCheck() {
    console.info('this.findInvalidControls()', this.findInvalidControls())
    const tagDimension = this.validateForm.get('tagDimension')?.value;
    if (CommonUtil.isNotBlank(tagDimension) && tagDimension != this.beforeCategory) {
      this.beforeCategory = tagDimension;
      // console.info('tagDimension', tagDimension)
      this.getTagSubDimensionList();
    }
  }

  //#region 切換取得標籤構面List
  getTagSubDimensionList(): void {
    const tagSubDimension = this.validateForm.get('tagSubDimension')?.value;
    const snbGetGroupId = this.tempSubCategoryList.find(f => f.key.toLowerCase() === tagSubDimension?.toLowerCase())?.groupId
    const getGroupId = this.tempCategoryList.find(f => f.key.toLowerCase() === this.validateForm.get('tagDimension').value.toLowerCase())?.groupId

    if ((CommonUtil.isNotBlank(this.beforeCategory) && !snbGetGroupId && getGroupId !== snbGetGroupId) ||
      (CommonUtil.isNotBlank(tagSubDimension) && getGroupId !== snbGetGroupId)) {
      this.validateForm.get('tagSubDimension').patchValue('');
      this.validateForm.get('tagSubDimension').setErrors({ 'tagSubDimensionErrMsg': '請重新選擇' });
    }

    if (!getGroupId) return
    this.subCategoryList = new Array<{ key: string; val: string }>();
    this.tempSubCategoryList.filter(f => f.groupId === getGroupId).forEach(f =>
      this.subCategoryList.push({ key: f.key, val: f.val })
    );
  }
  //#endregion

  //#region 標籤類型 更動時切換驗證
  changeTagType(key: string) {
    this.validateForm?.get('fileName')?.patchValue('');
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
        this.addFieldIfNotExists('conditionSettingQuery', null, Validators.required);
        this.validateForm?.patchValue({ 'conditionSettingMethod': 'normal' });
        break;
      case 'field':
        if (!this.validateForm.contains('tagConditionSetting')) {
          this.validateForm.addControl('tagConditionSetting', new FormArray([]));
        }
        this.addFieldIfNotExists('conditionKey', null, Validators.required);
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

  //#region 取得偵測條件下拉資料&&塞選查詢  //取得圖表資料
  //取得偵測條件下拉資料
  getConditionKeyList(): void {
    if (this.conditionKeyList.length > 0 &&
      this.conditionKeyList.some(s => s.val === this.validateForm?.get('conditionKey')?.value)) return

    this.conditionKeyList = new Array<{ key: string; val: string }>();
    this.filterConditionKeyList = new Array<{ key: string; val: string }>();

    this.tagManageService.getTagConditionList().pipe(
      catchError((err) => {
        this.filterConditionKeyList = new Array<{ key: string; val: string }>();
        this.validateForm?.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '查詢偵測條件失敗' });
        throw new Error(err.message);
      }),
    ).subscribe(res => {
      if (res.code === RestStatus.SUCCESS) {
        if (!res.result || res.result.length === 0) {
          this.validateForm?.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '查無偵測條件' });
          return
        }
        res.result.forEach(m => {
          this.conditionKeyList.push({ key: m.conditionKey, val: m.conditionName });
        });
        this.filterConditionKeyList = [...this.conditionKeyList];
      }
    });
  }

  //阻擋Enter
  onKeyDown(event: KeyboardEvent): void {
    // console.info('eventeventevent', event)
    if (event.code === 'Enter') {
      this.enterKeyHandled = true;
    }
    if (event.code === 'Backspace') {
      this.backspaceKeyHandled = true;
    }
  }

  onBlurConditionKeyInput(): void {
    if (this.validateForm.get('conditionKey')?.hasError('condition_valueErrMsg')) return

    if (CommonUtil.isBlank(this.selectedConditionId)) {
      this.validateForm.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '請點選一筆' });
      return
    }

    this.validateForm.get('conditionKey')?.setErrors(null);
  }

  //輸入查詢
  onConditionKeyChange(event: any) {
    this.selectedConditionId = '';
    this.conditionDialogData = undefined;

    this.validateForm.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '請選擇一筆' });

    if (this.enterKeyHandled) {
      this.enterKeyHandled = false;
      return;
    }

    if (this.backspaceKeyHandled) {
      this.backspaceKeyHandled = false;
      if (this.filterConditionKeyList?.length === 0) {
        this.conditionKeyFilter(event.target.value);
      }
      return;
    }

    this.conditionKeyFilter(event.target.value);
  }

  //下拉選擇
  onConditionKeySelectChange(event: any) {
    // console.info('event',event)
    if (CommonUtil.isBlank(event.key) || CommonUtil.isBlank(event.val)) {
      return
    }

    this.selectedConditionId = event.key;
    this.selectedConditionKey = event.val;

    // console.log('selectedConditionId Value:', this.selectedConditionId);
    // console.log('Selected Value:', this.selectedConditionKey);

    this.getTagConditionalDistribution();

    this.conditionKeyFilter(this.selectedConditionKey);

    this.validateForm.get('conditionKey').setValue(this.selectedConditionKey);
  }

  //篩選邏輯
  conditionKeyFilter(value: string): void {
    const filterValue = value?.toLowerCase();

    this.filterConditionKeyList = new Array<{ key: string; val: string }>();

    if (CommonUtil.isBlank(filterValue)) {
      this.filterConditionKeyList = this.conditionKeyList
      return
    }

    this.tagManageService.filterTagConditionList(new TagConditionChartLine({ conditionName: value })).pipe(
      catchError((err) => {
        this.filterConditionKeyList = new Array<{ key: string; val: string }>();
        this.validateForm?.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '查詢偵測條件失敗' });
        throw new Error(err.message);
      }),
    ).subscribe(res => {
      if (res.code === RestStatus.SUCCESS) {
        if (!res.result || res.result.length === 0) {
          this.validateForm?.get('conditionKey')?.setErrors({ 'condition_valueErrMsg': '查無偵測條件' });
          return
        }
        res.result.forEach(m => {
          this.filterConditionKeyList.push({ key: m.conditionKey, val: m.conditionName });
        });
        // console.info('this.filterConditionKeyList', this.filterConditionKeyList)
      }
    });
  }

  //取得圖表資料
  getTagConditionalDistribution() {
    const conditionId = this.selectedConditionId

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
        throw new Error(err.message);
      }),
    ).subscribe(res => {
      if (res.code === RestStatus.SUCCESS) {
        this.conditionDialogData = JSON.parse(JSON.stringify(res.result))
      }
    });
  }

  // 檢查是否存在清單中
  existsInConditionKeyList = (ctl: FormControl): { [key: string]: any } | null => {
    // console.info('ctl', ctl)
    if ((ctl.dirty || ctl.touched || ctl.valueChanges) && this.conditionKeyList) {
      const filterValue = ctl.value?.toLowerCase();
      if (!CommonUtil.isBlank(filterValue) && !this.conditionKeyList.some(item => item.val?.toLowerCase() === filterValue)) {
        return { 'condition_valueErrMsg': '不存在偵測條件清單中' }; // 驗證失敗
      }
    }

    if ((ctl.dirty || ctl.touched) && CommonUtil.isBlank(ctl.value)) {
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
  //#endregion

  //#region 檔案上傳並驗證
  onUploadFile(event: any) {
    console.log('event', event);

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

    // console.info('file', file)
    // console.info('uploadType', this.uploadType)
    formData.forEach((value, key) => {
      console.info(key, value);
    });

    this.loadingService.open();
    this.fileService.uploadFileService(formData).pipe(
      catchError((err) => {
        //console.info('err', err)
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
      tap(res => {
        // console.info(res);
      }),
      finalize(() => {
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
      fileName: (formData.tagType === 'document') ? this.uploadFileName : null,
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
            result.tagConditionSetting.forEach((conditionSetting, index) => {
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
