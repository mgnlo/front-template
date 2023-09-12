import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { CommonUtil } from './common-util';
import { RegExpUtil } from './reg-exp-util';
import { ValidateUtil } from './validate-util';

export const ValidatorsUtil = {
  /** 日期區間 */
  dateRange: (ctl: AbstractControl) => {
    const startCtl = ctl.get('startDate');
    const endCtl = ctl.get('endDate');
    const startDate = startCtl.value as Date;
    const endDate = endCtl.value as Date;
    if ((
      startDate && (startCtl.dirty || startCtl.touched) &&
      endDate && (endCtl.dirty || endCtl.touched)) &&
      endDate != null && startDate > endDate
    ) {
      return { 'dateErrMsg': '結束時間不得大於起始時間' };
    }
    return null;
  },
  /** 手輸日期檢查 */
  dateFmt: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v instanceof Date) {
      return null
    } else if ((ctl.dirty || ctl.touched) && !RegExpUtil.dateFmt1.test(v)) {
      return { 'format': '日期格式錯誤' };
    } else {
      return null;
    }
  },
  /** 搜尋區的身份證字號檢核 */
  searchCustId: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !/^[a-zA-Z0-9]*$/.test(v)) {
      return { 'searchCustId': '請輸入有效用戶編號，英文字母或數字' };
    }
    return null;
  },
  /** 檢查:正整數格式 */
  number: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !/^\d+$/i.test(v)) {
      return { 'number': '請輸入數字' };
    }
    return null;
  },
  /** 檢查:身份證字號 */
  id: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.checkIdentity(v)) {
      return { 'id': '身分證號有誤' };
    }
    return null;
  },
  /** 檢查:外來人口身分證(新+舊) + 國內身分證 */
  migrantId: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.isMigrantsId(v) && !ValidateUtil.checkIdentity(v)) {
      return { 'migrantId': '身分證號或外來人口統一證號有誤' };
    }
    return null;
  },
  /** 檢查:統一編號 */
  UBN: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.checkUBN(v)) {
      return { 'ubn': '統編有誤' };
    }
    return null;
  },
  /** 檢查:身份證字號或統一編號 */
  idOrUbn: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v &&
      (ctl.dirty || ctl.touched) &&
      (!ValidateUtil.checkIdentity(v) && !ValidateUtil.checkUBN(v))
    ) {
      return { 'ubnId': '身分證號或統編有誤' };
    }
    return null;
  },
  /** 檢查:手機格式 */
  mobile: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !/^09\d{8}$/i.test(v)) {
      return { 'mobile': '手機號碼有誤' };
    }
    return null;
  },
  /** 檢查電話碼數*/
  tel: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !/^\d{7,8}$/i.test(v)) {
      return { 'creditLoan.invalid.msg.tel': true };
    }
    return null;
  },
  /** 檢查:金額或數字範圍 */
  numberRange: (min: number, max: number, i18ErrKey: string): ValidatorFn => {
    return (ctl: AbstractControl) => {
      const v = ctl.value;
      if (v && (ctl.dirty || ctl.touched) && (+v < min || +v > max)) {
        return { [i18ErrKey]: true };
      }
      return null;
    };
  },
  /** 檢查:email格式 */
  email: (ctl: AbstractControl) => {
    const v = ctl.value;
    const exp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.checkEmail(ctl.value) && !exp.test(v)) {
      return { 'email': '電子郵件輸入錯誤' };
    }
    return null;
  },
  /** 檢查地址 */
  address: (ctl: AbstractControl) => {
    const v = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && !/^[\u4e00-\u9fa50-9\-]+$/.test(v)) {
      return { 'address': '地址格式有誤' };
    }
    return null;
  },
  /** 檢查數字不為0 */
  notZero: (ctl: AbstractControl) => {
    if ((ctl.dirty || ctl.touched) && +ctl.value === 0) {
      return { 'zero': '不可為0' };
    }
    return null;
  },
  /** 是否為空 */
  blank: (ctl: AbstractControl) => {
    const v: string = ctl.value;
    if (v && (ctl.dirty || ctl.touched) && ((v || '').trim().length === 0)) {
      return { 'blank': '不可為空' };
    }
    return null;
  },
  /** 至少要幾個FormControl為true (用於checkbox-group) */
  atLeast: (num: number): ValidatorFn => {
    return (fg: FormGroup) => {
      if (!!fg.controls && (fg.dirty || fg.touched) && Object.keys(fg.controls).filter(ctl => fg.get(ctl).value == true).length < num) {
        return { 'least': `至少選取 ${num} 個` };
      }
      return null;
    };
  },
  isRepeat: (ctl: AbstractControl) => {
    const v: string = ctl.value;
    if (ctl.parent?.value) {
      const valueList = Object.values(ctl.parent.value);
      const uniqueList = Array.from(new Set(valueList).values());
      let repeatList = new Set();
      valueList.filter((val, i, arr) => ValidatorsUtil.countInArray(arr, val) > 1).forEach((val) => repeatList.add(val));
      if (uniqueList.length !== valueList.length && repeatList.has(v)) {
        return { 'repeat': '不可重複' };
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
  countInArray<T>(array: T[], target: T) {
    var count = 0;
    array.filter((v, i, arr) => arr[i] === target).forEach(() => count++);
    return count;
  }
};
