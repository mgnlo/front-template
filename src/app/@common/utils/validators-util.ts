import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
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
            return {'range': true};
        }
        return null;
    },
    /** 檢查:身份證字號 */
    id: (ctl: AbstractControl) => {
        const v = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.checkIdentity(v)) {
            return { 'creditLoan.invalid.msg.ID': true };
        }
        return null;
    },
    /** 檢查:外來人口身分證(新+舊) + 國內身分證 */
    migrantId: (ctl: AbstractControl) => {
        const v = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.isMigrantsId(v) && !ValidateUtil.checkIdentity(v)) {
            return { 'creditLoan.invalid.msg.ID': true };
        }
        return null;
    },
    /** 檢查:統一編號 */
    UBN: (ctl: AbstractControl) => {
        const v = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.checkUBN(v)) {
            return { 'creditLoan.invalid.msg.ID': true };
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
            return { 'creditLoan.invalid.msg.ID': true };
        }
        return null;
    },
    /** 檢查:手機格式 */
    mobile: (ctl: AbstractControl) => {
        const v = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && !/^09\d{8}$/i.test(v)) {
            return { 'creditLoan.invalid.msg.mobile': true };
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
    /** 檢查:正整數格式 */
    fullNumber: (ctl: AbstractControl) => {
        const v = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && !/^\d+$/i.test(v)) {
            return { 'creditLoan.invalid.msg.fullNumber': true };
        }
        return null;
    },
    /** 檢查:email格式 */
    email: (ctl: AbstractControl) => {
        const v = ctl.value;
        const exp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (v && (ctl.dirty || ctl.touched) && !ValidateUtil.checkEmail(ctl.value) && !exp.test(v)) {
            return { 'creditLoan.invalid.msg.email': true };
        }
        return null;
    },
    /** 檢查地址 */
    address: (ctl: AbstractControl) => {
        const v = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && !/^[\u4e00-\u9fa50-9\-]+$/.test(v)) {
            return { 'creditLoan.invalid.msg.address': true };
        }
        return null;
    },
    /** 檢查戶籍地址及通訊地址的號，只能數字及“-“ */
    addressNumber: (ctl: AbstractControl) => {
        const v = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && !/^[0-9\-]+$/.test(v)) {
            return { 'creditLoan.invalid.msg.address.number': true };
        }
        return null;
    },
    /** 檢查數字不為0 */
    notZero: (ctl: AbstractControl) => {
      if ((ctl.dirty || ctl.touched) && +ctl.value === 0) {
          return {'creditLoan.calculate.query.remind4': true};
      }
      return null;
    },
    blank: (ctl: AbstractControl) => {
        const v: string = ctl.value;
        if (v && (ctl.dirty || ctl.touched) && ((v || '').trim().length === 0)) {
            return { 'blank': true };
        }
        return null;
    }
};
