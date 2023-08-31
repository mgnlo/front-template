import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { Frequency, chineseWeekDayValues } from '@common/enums/common-enum';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LocalDataSource } from 'ng2-smart-table';

export const CommonUtil = {
  /** 取得副檔名*/
  getFileExtension(fileName: string): string {
    const lastDotIndex = fileName?.lastIndexOf('.');

    if (lastDotIndex === -1) {
      return ''; // 若找不到點，則沒有副檔名
    }

    const extension = fileName?.substring(lastDotIndex + 1)?.toLowerCase();
    return extension;
  },
  /** 取得檔案名稱，無副檔名*/
  getFileNameWithoutExtension(fileName: string): string {
    const lastDotIndex = fileName?.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return fileName?.substring(0, lastDotIndex);
    } else {
      return fileName;
    }
  },
  /** 檔案轉Base64*/
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      //reject(new Error('轉換為Base64時發生錯誤'));
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target?.result?.toString()?.split(',')[1];
        if (base64String) {
          resolve(base64String);
        } else {
          reject(new Error('轉換為Base64時發生錯誤'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  },
  /** 取得路由中文 */
  getActionName(changeRouteName: string): string {
    switch (changeRouteName) {
      case 'edit':
        return '編輯';
      case 'copy':
        return '複製';
      default:
        return '新增';
    }
  },
  /** 取得第一個 FormControl error 的 key 來套 i18n */
  getFirstFormContorlError: (errors: ValidationErrors): string => {
    if (!errors) { return ''; }
    return Object.keys(errors)[0];
  },
  /** Moment 日期轉換成後端接收字串 */
  getDateStringByMoment: (m: Moment): string => {
    if (moment.isMoment(m)) {
      return m.year().toString().padStart(4, '0') +
        (m.month() + 1).toString().padStart(2, '0') +
        m.date().toString().padStart(2, '0');
    } else {
      return m + '';
    }
  },
  /**
   * 是否為空字串
   * isBlank(undefined), return true
   * isBlank(null), return true
   * isBlank(""), return true
   * isBlank(" "), return false
   */
  isBlank(str: string): boolean {
    if (str === undefined || str === null || String(str).trim() === '') {
      return true;
    }
    return false;
  },

  /**
   * 是否不為空字串
   */
  isNotBlank(str: string): boolean {
    return !this.isBlank(str);
  },
  /** 後端日期轉成顯示用日期 */
  toViewDateString(value: string): string {
    const reg = /^(\d{4})(\d{2})(\d{2})$/;
    if (reg.test(value)) {
      return value.replace(reg, '$1/$2/$3');
    } else {
      return value;
    }
  },
  /** 輸入時改變日期格式 */
  replaceDate(event: KeyboardEvent): void {
    const element = event.target as HTMLInputElement;
    const v = element.value;
    const isNumber = !isNaN(parseInt(event.key, 10));

    if (event.key && isNumber && (/^\d{4}$/.test(v) || /^\d{4}\/\d{2}$/.test(v))) {
      element.value += '/';
    }
  },
  /** 比較兩個object, 以objA的key為比較基準*/
  compareObj<T extends Object>(objA: T, objB: T): { [x: string]: boolean } {
    const result: { [key in string]: boolean } = {};
    Object.keys(objA).map(key => {
      if (!!objA[key] && !!objB[key]) {
        result[key] = objA[key] === objB[key] ? true : false;
      } else {
        result[key] = false;
      }
    })
    return result;
  },
  /** 將flat資料group
   * @param datas 要分類的data
   * @param key group by的key
   * @param keepKey 是否保留group by的key在裡面的item
  */
  groupBy<T>(datas: T[], key: string, keepKey?: boolean) {
    let keep = keepKey === undefined ? true : keepKey;
    return datas.reduce(function (group, data) {
      let tmpData = Object.assign({}, data);
      if (!keep) { delete tmpData[key]; }
      (group[data[key]] = group[data[key]] || []).push(tmpData);
      return group;
    }, {});
  },
  /** 將group好的資料flat
   * @param datas 要flat的data
   * @param keepName group的key名稱
  */
  flatGroupItem(datas: {}, keyName: string) {
    let arr = [];
    Object.keys(datas).forEach(key => {
      let flatItem = datas[key].reduce(function (group, data) {
        group[keyName] = key;
        Object.entries(data).forEach(([k, v]) => (group[k] = v));
        return group;
      }, {})
      arr.push(flatItem)
    })
    return arr;
  },
  /** 取得歷程資料 */
  getHistoryProcessData<T>(reviewHistory: string, data: T): any {
    if (!!data) {
      if (!data[reviewHistory]) return null;
      let detail = JSON.parse(JSON.stringify(data));
      let isHistoryOpen = {};

      if (data[reviewHistory].length > 0) {
        detail.historyGroupView = {};
      }

      data[reviewHistory].forEach(history => {
        if (!detail.historyGroupView || !detail.historyGroupView[history.groupId]) {
          isHistoryOpen[history.groupId] = true;
          detail.historyGroupView[history.groupId] = {
            type: history.type,
            flows: [{ time: history.time, title: history.title, detail: history.detail }]
          };
        } else {
          detail.historyGroupView[history.groupId].flows.push({ time: history.time, title: history.title, detail: history.detail });
        }
      });
      return { isHistoryOpen, detail };
    }
    return null;
  },
  /** 取得FormArray裡的FormGroup
   * @param validateForm 最外圈的FormGroup
   * @param formArrayName FormArray名字
   * @param index FormArray裡的第幾個FormGroup (取第二層的FormGroup)
  */
  getFormGroupInFormArray(validateForm: FormGroup, formArrayName: string, index: number): FormGroup {
    let conditionArray = validateForm.get(formArrayName) as FormArray;
    return conditionArray.at(index) as FormGroup;
  },
  /** 取得FormArray裡的FormGroup
   * @param searchParam 傳入 validateForm.getRawValue()
  */
  getSearchFilters(searchParam: { [key: string]: any }[]): { key: string, value: string | boolean | number }[] {
    return Object.keys(searchParam).filter(key => CommonUtil.isNotBlank(searchParam[key])).map(key => {
      let value = key === 'startDate' || key === 'endDate' ? moment(searchParam[key]).format('YYYY-MM-DD') : searchParam[key];
      return { key: key, value: value };
    });
  },
  /** 暫存自動塞入表單
   * @param validateForm FormGroup
   * @param getSessionVal 暫存資料
  */
  initializeFormWithSessionData(validateForm: any, getSessionVal: any) {
    if (!!getSessionVal?.filter) {
      Object.keys(getSessionVal.filter).forEach(key => {
        const control = validateForm.controls[key];
        let val = !!getSessionVal.filter[key] && (key === 'startDate' || key === 'endDate') ?
          new Date(getSessionVal.filter[key]) : getSessionVal.filter[key];
        if (control) { control.patchValue(val); }
      });
    }
  },
  /** 刪除最後一個特定字元(含重複)
   *  @param inputString 輸入字串
   *  @param targetChar 欲刪除字元
  */
  removeLastCharIfEquals(inputString: string, targetChar: string) {
    if (!inputString || !targetChar) {
      return inputString;
    }

    const regex = new RegExp(`${targetChar}+[^${targetChar}]*$`);
    const result = inputString.replace(regex, '');

    return result;
  },
  /** 設定每頁全選暫存
   *  取得 更新的 tempPageIsAllSelected 頁碼和是否勾選全選
   *  @param tempPageIsAllSelected 暫存資料
   *  @param pageNum 頁碼
   *  @param isAllSelected 是否全選
  */
  onSetTempPageIsAllSelected(
    tempPageIsAllSelected: Array<{ pageNum: number, val: boolean }>,
    pageNum: number,
    isAllSelected: boolean) {
    const existingIndex = tempPageIsAllSelected.findIndex(item => item.pageNum === pageNum);

    if (existingIndex === -1) {
      tempPageIsAllSelected.push({ pageNum: pageNum, val: isAllSelected });
    } else {
      tempPageIsAllSelected[existingIndex].val = isAllSelected;
    }
    return tempPageIsAllSelected;
  },
  /** 設定Grid單頁全選(刪除)功能
   *  取得 更新的 selectedRows 選取數組
   *  @param idName 表單Id
   *  @param dataSource 表單來源
   *  @param selectedRows 選取數組
   *  @param isAllSelected 是否全選
  */
  async onSetGridPageChecked(
    idName: string,
    dataSource: LocalDataSource,
    selectedRows: Array<{ rowId: string }>,
    isAllSelected: boolean) {
    if (!(dataSource instanceof LocalDataSource)) {
      return new Array;
    }

    const filteredAndSortedData = await dataSource.getElements();

    const selectedRowIds = new Set(
      filteredAndSortedData
        .filter(f => f?.isShow && f?.isSelected)
        .map(selectedRow => selectedRow[idName])
    );

    //有存在的id && 有顯示的Checkbox
    const filterSelectRow = row => row[idName] && row?.isShow;

    if (isAllSelected) {
      filteredAndSortedData
        .filter(filterSelectRow)
        .forEach(row => {
          const rowId = row[idName];
          if (!selectedRowIds.has(rowId)) {
            selectedRows.push({ rowId });
          }
        });
    } else {
      selectedRows = selectedRows.filter(selectedRow => !selectedRowIds.has(selectedRow.rowId));
    }

    return selectedRows;
  },
  /** 處理執行頻率顯示
   *  @param frequency 執行頻率
   *  @param frequencyTime 執行時間
  */
  processExecutionFrequency(frequency: string, frequencyTime: string) {
    let result = '';

    if (this.isBlank(frequency) || this.isBlank(frequencyTime))  return result;

    const frequencyTimeArray = frequencyTime.split(/[:：]/);
    const frequencyLow = frequency?.toLowerCase();

    switch (frequencyLow) {
      case 'daily':
        result = `${Frequency[frequencyLow]} ${frequencyTimeArray[0] ?? ''} 時 ${frequencyTimeArray[1] ?? ''} 分`;
        break;
      case 'weekly':
        const dayOfWeek = parseInt(frequencyTimeArray[0] ?? '0');
        const weekDayName = chineseWeekDayValues[dayOfWeek - 1] || '';
        result = `${Frequency[frequencyLow]} ${weekDayName} ${frequencyTimeArray[1] ?? ''} 時 ${frequencyTimeArray[2] ?? ''} 分`;
        break;
      case 'monthly':
        const dayOfMonth = frequencyTimeArray?.[0] === '999' ? '月底' : frequencyTimeArray[0] ?? '';
        result = `${Frequency[frequencyLow]} ${dayOfMonth}日 ${frequencyTimeArray[1] ?? ''} 時 ${frequencyTimeArray[2] ?? ''} 分`;
        break;
      default:
        result = `${Frequency[frequencyLow]} ${frequencyTime}`;
        break;
    }

    return result;
  }

}; // End
