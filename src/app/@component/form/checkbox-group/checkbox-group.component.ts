import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Status } from '@common/enums/common-enum';
import { ENUMS } from '@common/pipes/enum.pipe';

@Component({
  selector: 'checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit {

  @Input() title: string;
  @Input() form: FormGroup;
  @Input() formGroupName: string;
  @Input() selectList?: { options: any, key: string | number, val: string };
  /** 有enumName就會以此做enum的對應, 沒enumName就會用ctlName做對應 */
  @Input() enumName?: string;
  @Input() status?: string = 'info';
  @Input() popupText?: string; //標題右側的popup說明文字
  @Output() valueChange?= new EventEmitter<any>();

  firstErr: string;
  fg: FormGroup;
  enumList = new Map();
  enumKey: string = null;
  constructor() { }

  ngOnInit(): void {
    this.fg = this.form.get(this.formGroupName) as FormGroup;
    if (!!this.enumName && Object.keys(ENUMS).includes(this.enumName)) {
      this.enumKey = this.enumName;
    } else if (Object.keys(ENUMS).includes(this.formGroupName)) {
      this.enumKey = this.formGroupName;
    }
    if (!!this.enumKey) {
      switch (this.enumKey) {
        case 'status':
          Object.keys(Status).filter(status => status !== 'reviewing').forEach(key => { this.enumList.set(key, Status[key]) });
          break;
        default:
          if (!!Object.keys(ENUMS).filter(key => this.enumKey == key)[0]) {
            let enumList = ENUMS[Object.keys(ENUMS).filter(key => this.enumKey == key)[0]];
            Object.keys(enumList).forEach(key => { this.enumList.set(key, enumList[key]) });
          }
          break;
      }
    }
  }

  get required() {
    if (this.fg?.validator) {
      return this.fg.validator({} as AbstractControl)?.required !== undefined ? true : false;
    } else {
      return false;
    }
  }

  ngDoCheck(): void {
    // console.info(this.ctl.errors)
    if (!!this.fg?.errors) {
      //只取第一個錯誤訊息
      this.firstErr = Object.values(this.fg.errors).map(val => val as string)[0];
    }
  }

  hasError() {
    return (this.fg?.dirty || this.fg?.touched) && this.fg?.errors;
  }

  valueChangeFn(param: any) {
    this.valueChange.next(param);
  }
}
