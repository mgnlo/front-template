import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'checkbox-icon',
  template: '<nb-icon *ngIf="bool" status="info" icon="checkmark-square-2"></nb-icon>'
})
export class CheckboxIconComponent implements OnInit {

  @Input() value: string;
  bool: boolean;
  constructor() { }
  ngOnInit(): void {
    this.bool = this.value === 'true' ? true : false;
  }
}

@Component({
  selector: 'checkbox-icon',
  template: '<nb-icon *ngIf="bool" status="info" icon="checkmark-square-2"></nb-icon>'
})
export class CheckboxIconPageComponent implements OnInit {

  @Input() value: string;
  bool: boolean;
  constructor() { }
  ngOnInit(): void {
    this.bool = this.value === 'true' ? true : false;
  }
}
