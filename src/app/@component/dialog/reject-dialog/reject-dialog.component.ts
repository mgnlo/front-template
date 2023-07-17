import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

export class RejectDialogOption {
  title: string;
  backTo: string;
}

@Component({
  selector: 'ngx-reject-dialog',
  templateUrl: 'reject-dialog.component.html',
  styleUrls: ['reject-dialog.component.scss'],
})
export class RejectDialogComponent implements OnInit {

  @Input() option: RejectDialogOption;
  form: FormGroup = new FormGroup({
    reason: new FormControl('', Validators.required)
  });

  constructor(protected ref: NbDialogRef<RejectDialogComponent>, protected router: Router) {}

  ngOnInit() {}

  cancel() {
    this.ref.close();
  }

  submit() {
    if(this.form.valid){
      //TODO:駁回API
      this.router.navigate(['pages', 'review-manage', this.option.backTo]);
      this.ref.close();
    }
  }
}
