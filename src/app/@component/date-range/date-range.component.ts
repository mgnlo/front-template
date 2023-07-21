import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegExpUtil } from '@common/utils/reg-exp-util';

@Component({
  selector: 'date-range',
  templateUrl: './date-range.component.html',
  styleUrls: []
})
export class DateRangeComponent implements OnInit {

  readonly dateFormat = 'yyyy-MM-dd';
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  //format date
  fmtDate(e: KeyboardEvent, ctlName: string){
    const element = e.target as HTMLInputElement;
    const v = element.value;
    if(e.key === 'v'){
      //貼上的日期
      if(RegExpUtil.dateFmt1.test(v)){
        element.value =  v.replace(/[- /.]/g, '-')
      } else if(RegExpUtil.dateFmt2.test(v)){
        element.value = `${v.substring(0, 4)}-${v.substring(4, 6)}-${v.substring(6, 8)}`;
      }
      //datepicker只吃Date型態, 因此要轉回Date格式
      this.form.get(ctlName).setValue(new Date(element.value));
    } else {
      //輸入的日期
      const isNumber = !isNaN(parseInt(e.key, 10));
      if (e.key && isNumber && (/^\d{4}$/.test(v) || /^\d{4}\-\d{2}$/.test(v))) {
        element.value += '-';
      }
    }
  }

}
