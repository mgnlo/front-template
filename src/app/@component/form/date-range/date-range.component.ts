import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { RegExpUtil } from '@common/utils/reg-exp-util';

@Component({
  selector: 'date-range',
  templateUrl: './date-range.component.html',
  styleUrls: []
})
export class DateRangeComponent {

  readonly dateFormat = 'yyyy-MM-dd';
  @Input() form: FormGroup;
  sCtl: FormControl;
  eCtl: FormControl;

  constructor(private cdRef:ChangeDetectorRef){}

  ngOnChanges(changes: SimpleChanges) {
    this.sCtl = changes.form.currentValue.get('startDate') as FormControl;
    this.eCtl = changes.form.currentValue.get('endDate') as FormControl;
    this.cdRef.detectChanges();
  }

  getRequired(ctlName: string) {
    let ctl = ctlName === 'startDate' ? this.sCtl : this.eCtl;
    if (ctl?.validator) {
      return ctl.validator({} as AbstractControl)?.required !== undefined ? true : false;
    } else {
      return false;
    }
  }

  //format date
  fmtDate(e: KeyboardEvent, ctlName: string) {
    const element = e.target as HTMLInputElement;
    const isNumber = !isNaN(parseInt(e.key, 10));
    let v = element.value;
    if (v === "") {
      //欄位清空時的必填判斷
      this.form.get(ctlName).setErrors(this.getRequired(ctlName) ? { 'required': '此欄位為必填' } : null);
    }
    if (e.key === 'v') {
      //貼上的日期
      if (RegExpUtil.dateFmt1.test(v)) {
        v = v.replace(/[- /.]/g, '-')
      } else if (RegExpUtil.dateFmt2.test(v)) {
        v = `${v.substring(0, 4)}-${v.substring(4, 6)}-${v.substring(6, 8)}`;
      }
      //datepicker只吃Date型態, 因此要轉回Date格式
      this.form.get(ctlName).setValue(new Date(v));
    } else {
      //輸入的日期
      if (e.key && isNumber && (/^\d{4}$/.test(v) || /^\d{4}\-\d{2}$/.test(v))) {
        v += '-';
      }
    }
  }

  hasError(ctlName: string) {
    let ctl = ctlName === 'startDate' ? this.sCtl : this.eCtl;
    return (ctl.dirty || ctl.touched) && ctl?.errors;
  }

  lastError(ctlName: string) {
    let ctl = ctlName === 'startDate' ? this.sCtl : this.eCtl;
    return this.hasError(ctlName) ? Object.values(ctl.errors).map(err => err) : null
  }

}
