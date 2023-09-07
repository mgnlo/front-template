import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss']
})
export class BasicInputComponent implements OnInit {

  @Input() title: string;
  @Input() form: FormGroup;
  @Input() ctlName: string;
  @Input() type?: 'text' | 'password' | 'number' = 'text';
  @Input() placeholder?: string = '請輸入';
  @Input() maxlength?: number = null;
  @Input() infos?: string[]; //欄位提示文字
  @Input() linkInfo?: {link: string, title: string}; //連結文字
  @Input() disabled?: boolean = false;

  firstErr: string;
  ctl: FormControl;
  constructor() { }

  ngOnInit(): void {
    this.ctl = this.form.get(this.ctlName) as FormControl;
  }

  get required(){
    if(this.ctl?.validator) {
      return this.ctl.validator({} as AbstractControl)?.required !== undefined ? true : false;
    } else {
      return false;
    }
  }
  
  ngDoCheck(): void {
    if(!!this.ctl?.errors){
      //只取第一個錯誤訊息
      this.firstErr = Object.values(this.ctl.errors).map(val => val as string)[0];
    }
  }

  hasError(){
    return (this.ctl?.dirty || this.ctl?.touched) && this.ctl?.errors;
  }
}
