import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

export const CommonUtil = {
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
  /** 將flat資料group */
  groupBy<T>(datas: T[], key: string) {
    return datas.reduce(function (group, data) {
      (group[data[key]] = group[data[key]] || []).push(data);
      return group;
    }, {});
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
  getSearchFilters(searchParam: any): { key: string, value: string | boolean | number }[]{
    return Object.keys(searchParam).filter(key => CommonUtil.isNotBlank(searchParam[key])).map(key => {
      let value = key === 'startDate' || key === 'endDate' ? moment(searchParam[key]).format('YYYY-MM-DD') : searchParam[key];
      return { key: key, value: value };
    });
  },
}; // End
