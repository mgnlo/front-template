import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { NbDialogRef } from '@nebular/theme';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

export class ReviewDialogOption {
  title?: string; //reject need title
  isApproved: boolean;
}

@Component({
  selector: 'ngx-review-dialog',
  templateUrl: 'review-dialog.component.html',
  styleUrls: ['review-dialog.component.scss'],
})
export class ReviewDialogComponent implements OnInit {

  @Input() dialogSize: string;
  @Input() option: ReviewDialogOption;
  @Output() emit: EventEmitter<any> = new EventEmitter();
  
  form = new FormGroup({
    reason: new FormControl('', [Validators.required, ValidatorsUtil.blank])
  });

  constructor(protected ref: NbDialogRef<ReviewDialogComponent>, protected router: Router) {}

  ngOnInit() {
    if(this.option.isApproved){
      interval(1500).pipe(
        map(val => 1 - val),
        takeWhile(x => x >= 0)
      ).subscribe(() => {
        this.emit.next({isApproved: true, reviewComment: null});
        this.ref.close();
      })
    }
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if(this.form.valid){
      this.emit.next({isApproved: false, reviewComment: this.form.get('reason').value});
      this.ref.close();
    }
  }
}
