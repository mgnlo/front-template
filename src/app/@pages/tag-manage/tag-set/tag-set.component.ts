import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { TagDetailView, TagSetting, TagSettingEditReq } from '@api/models/tag-manage.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { MathSymbol, Status } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { TagDimension, TagSetCondition, TagSubDimension, TagType } from '@common/enums/tag-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { catchError, filter, tap, map } from 'rxjs/operators';
import { TagManageService } from '../tag-manage.service';
import { TagConditionDialogComponent } from './condition-dialog/condition-dialog.component';

@Component({
  selector: 'tag-set',
  templateUrl: './tag-set.component.html',
  styleUrls: ['./tag-set.component.scss']
})
export class TagAddComponent extends BaseComponent implements OnInit {
  TagType = TagType;
  conditionSettingMethod = TagSetCondition;
  Status = Status;
  tagId: string;

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

  //預設檔案存放地方
  condition_valueList: Array<{ key: string; val: string }> = [{ key: 'condition_A', val: '近三個月_基金_申購金額' }, { key: 'condition_B', val: '假資料B' }, { key: 'condition_C', val: '假資料C' }];

  //集合方式
  joinValueList: Array<{ key: string; val: string }> = [{ key: 'and', val: 'and' }, { key: 'or', val: 'or' }];

  //取得新增條件區塊
  get conditions(): FormArray {
    return this.validateForm.get('tagConditionSetting') as FormArray
  }

  detail: TagDetailView;
  params: any = [];//路由參數
  actionName: string;// 新增/編輯/複製

  mockData: Array<ActivitySetting> = ActivityListMock;

  selectedFile: File | undefined;
  maxSizeInMB: number = 5;//檔案大小
  filePlaceholderName: string = '請上傳檔案';
  //#region 檔案白名單
  passFileArrayStr: string = '.csv,,,,'
  passFileArray: Array<string> = ['csv']
  //#endregion

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private tagManageService: TagManageService,
    private loadingService: LoadingService,
    private dialogService: DialogService) {
    super(storageService);
    this.validateForm = new FormGroup({
      tagName: new FormControl(null, Validators.required),
      status: new FormControl('enabled', Validators.required),
      tagType: new FormControl('normal', Validators.required),
      conditionSettingMethod: new FormControl('normal', Validators.required),
      fileName: new FormControl(null, Validators.required),
      startDate: new FormControl(new Date(), ValidatorsUtil.dateFmt),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), ValidatorsUtil.dateFmt),
      tagDimension: new FormControl(null, Validators.required),
      tagSubDimension: new FormControl(null, Validators.required),
      tagDescription: new FormControl(null),
      conditionValue: new FormControl(null, Validators.required),
      conditionSettingQuery: new FormControl(null, Validators.required),
      tagConditionSetting: new FormArray([
        new FormGroup({
          id: new FormControl(0),
          detectionCondition_0: new FormControl(null, Validators.required),
          thresholdValue_0: new FormControl(null, [Validators.required, ValidatorsUtil.number]),
          //C1: new FormControl(null, Validators.required),
        }),
      ]),
    }, [ValidatorsUtil.dateRange]);

    this.params = this.activatedRoute.snapshot.params;
    const changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = this.getActionName(changeRouteName);
    const getRawValue = this.validateForm.getRawValue();

    this.changeTagType(getRawValue.tagType)
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
        title: '起訖時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any) => {
          return `<span class="date">${cell}</span>`;
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
    this.dataSource = new LocalDataSource();
    this.mockData = this.mockData.map(mock => {
      return { ...mock, during: `${mock.startDate}~${mock.endDate}` } //起訖日區間
    })
    this.dataSource.load(this.mockData);
    this.tagId = this.activatedRoute.snapshot.params?.tagId;
    if (!!this.tagId) {
      const changeRouteName = this.params['changeRoute'] ?? "";
      this.actionName = this.getActionName(changeRouteName);
      const getRawValue = this.validateForm.getRawValue();
      this.loadingService.open();
      this.tagManageService.getTagSettingRow(this.tagId).pipe(
        catchError(err => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '查無該筆資料，將為您導回客群名單', ['pages', 'customer-manage', 'activity-list']);
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
                        ['thresholdValue_' + index]: new FormControl(+conditionSetting.thresholdValue, Validators.required),
                        ['joinValue_' + index]: new FormControl(conditionSetting.joinValue, Validators.required)
                      }));
                    } else {
                      this.conditions.push(new FormGroup({
                        id: new FormControl(index),
                        ['detectionCondition_' + index]: new FormControl(conditionSetting.detectionCondition, Validators.required),
                        ['thresholdValue_' + index]: new FormControl(+conditionSetting.thresholdValue, Validators.required),
                      }));
                    }
                  })
                  console.info(this.conditions.getRawValue());
                  break;
                default:
                  this.validateForm.controls[key].setValue(res.result[key]);
                  break;
              }
            }
          });
          if (!!processedData) {
            if (changeRouteName === 'edit') {
              this.isHistoryOpen = processedData.isHistoryOpen;
              this.detail = processedData.detail;
            }
          }
          this.loadingService.close();
        })
      ).subscribe(res => {
        console.info(res.result);
      });
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  //#region 標籤類型 更動時切換驗證
  changeTagType(key: string) {
    if (key === 'normal') {
      if (!this.validateForm.contains('conditionSettingMethod')) {
        this.addField('conditionSettingMethod', 'normal', Validators.required);
      }
      if (this.validateForm.contains('fileName')) {
        this.removeField('fileName');
      }
    }

    if (key === 'document') {
      if (!this.validateForm.contains('fileName')) {
        this.addField('fileName', null, Validators.required);
      }
      if (this.validateForm.contains('conditionSettingMethod')) {
        this.removeField('conditionSettingMethod');
      }
      //this.addField('fileName', null, [Validators.required,this.validateFileType]);
    }

  }
  //#endregion

  //#region 基本欄位檢核(新增/刪除)
  addField(fieldName: string, formState: any, fileFormatValidator: any) {
    this.validateForm.addControl(fieldName, new FormControl(formState, fileFormatValidator));
    //this.validateForm.controls[fieldName].updateValueAndValidity();
  }

  removeField(fieldName: string) {
    this.validateForm.removeControl(fieldName);
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

    //console.info('changeConditionsBtn', this.conditions.getRawValue())
  }

  setConditions(action: 'add' | 'remove', key: string, id: number, index: number) {
    let fg = this.conditions.at(index) as FormGroup;
    if (action === 'add') {
      fg.setControl(`${key + id}`, new FormControl(null, Validators.required));
    } else {
      fg.removeControl(`${key}`);
    }
    //console.info('setConditions', this.conditions.getRawValue())
  }
  //#endregion

  //#region 檔案上傳驗證
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileValidatorResult = this.fileValidator(file);
    this.filePlaceholderName = CommonUtil.isBlank(file?.name) ? this.filePlaceholderName : file.name;
    if (fileValidatorResult !== null) {
      this.validateForm.get('fileName').setErrors(fileValidatorResult);
      return
    } else {
      this.validateForm.get('fileName').setErrors(null);
    }
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
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!this.passFileArray.includes(fileExt)) {
      return { uploadFileMsg: '檔案格式錯誤' };
    }

    // 驗證通過，返回null表示驗證成功
    return null;
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
    this.dialogService.open(TagConditionDialogComponent, {
      title: '條件分佈級距',
      dataList: this.validateForm,
    });
  }
  //#endregion

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

  submit() {
    let valid = this.validateForm.valid;
    let reqData: TagSettingEditReq = this.getRequestData();
    // if (valid && !this.tagId) {
    //   this.loadingService.open();
    //   this.tagManageService.createTagSetting(reqData).pipe(
    //     catchError((err) => {
    //       this.loadingService.close();
    //       this.dialogService.alertAndBackToList(false, '新增失敗', ['pages', 'tag-manage', 'tag-list']);
    //       throw new Error(err.message);
    //     }),
    //     tap(res => {
    //       console.info(res)
    //       this.loadingService.close();
    //     })).subscribe(res => {
    //       if (res.code === RestStatus.SUCCESS) {
    //         this.dialogService.alertAndBackToList(true, '新增成功', ['pages', 'tag-manage', 'tag-list'])
    //       }
    //     });
    // } else if (valid && this.tagId) {
    //   this.loadingService.open();
    //   this.tagManageService.updateTagSetting(this.tagId, reqData).pipe(
    //     catchError((err) => {
    //       this.loadingService.close();
    //       this.dialogService.alertAndBackToList(false, '編輯失敗', ['pages', 'tag-manage', 'tag-list']);
    //       throw new Error(err.message);
    //     }),
    //     tap(res => {
    //       console.info(res)
    //       this.loadingService.close();
    //     })).subscribe(res => {
    //       if (res.code === RestStatus.SUCCESS) {
    //         this.dialogService.alertAndBackToList(true, '編輯成功', ['pages', 'tag-manage', 'tag-list'])
    //       }
    //     });
    // }
  }

  getRequestData(): TagSettingEditReq {
    let reqData: TagSettingEditReq = this.validateForm.getRawValue();
    reqData.startDate = moment(reqData.startDate).format('YYYY-MM-DD');
    reqData.endDate = moment(reqData.endDate).format('YYYY-MM-DD');
    console.info(reqData);
    return reqData;
  }

}
