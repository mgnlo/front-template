import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Status } from '@common/enums/common-enum';
import { ENUMS } from '@common/pipes/enum.pipe';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() title: string;
  @Input() form: FormGroup;
  @Input() ctlName: string;
  @Input() mapList?: Map<string, string>;
  @Input() selectList?: {options: any, key: string|number, val: string};
  /** 有enumName就會以此做enum的對應, 沒enumName就會用ctlName做對應 */
  @Input() enumName?: string;
  @Input() placeholder?: string = '全部';
  @Output() valueChange? = new EventEmitter<any>();

  firstErr: string;
  ctl: FormControl;
  enumList = new Map();
  enumKey: string = null;
  constructor() { }

  ngOnInit(): void {
    this.ctl = this.form.get(this.ctlName) as FormControl;
    if(!!this.mapList){
      this.enumList = this.mapList;
    } else if(!!this.enumName && Object.keys(ENUMS).includes(this.enumName)){
      this.enumKey = this.enumName;
    } else if (Object.keys(ENUMS).includes(this.ctlName)){
      this.enumKey = this.ctlName;
    }
    if(!!this.enumKey){
      switch (this.enumKey) {
        case 'status':
          Object.keys(Status).filter(status => status !== 'reviewing').forEach(key => { this.enumList.set(key, Status[key]) });
          break;
        default:
          if(!!Object.keys(ENUMS).filter(key => this.enumKey == key)[0]){
            let enumList = ENUMS[Object.keys(ENUMS).filter(key => this.enumKey == key)[0]];
            Object.keys(enumList).forEach(key => { this.enumList.set(key, enumList[key]) });
          }
          break;
      }
    }
  }

  get required(){
    if(this.ctl?.validator) {
      return this.ctl.validator({} as AbstractControl)?.required !== undefined ? true : false;
    } else {
      return false;
    }
  }

  ngDoCheck(): void {
    // console.info(this.ctl.errors)
    if(!!this.ctl?.errors){
      //只取第一個錯誤訊息
      this.firstErr = Object.values(this.ctl.errors).map(val => val as string)[0];
    }
  }

  hasError(){
    return (this.ctl?.dirty || this.ctl?.touched) && this.ctl?.errors;
  }

  valueChangeFn(param: any){
    this.valueChange.next(param);
  }
}
