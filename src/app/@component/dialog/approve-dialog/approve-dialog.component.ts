import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

export class ApproveDialogOption {
  bool: boolean;
  backTo: string;
}
@Component({
  selector: 'ngx-approve-dialog',
  templateUrl: 'approve-dialog.component.html',
  styleUrls: ['approve-dialog.component.scss'],
})
export class ApproveDialogComponent implements OnInit {

  @Input() option: ApproveDialogOption;

  constructor(protected ref: NbDialogRef<ApproveDialogComponent>, private router: Router) {}

  ngOnInit() {
    interval(1500).pipe(
      map(val => 1 - val),
      takeWhile(x => x >= 0)
    ).subscribe(() => {
      this.router.navigate(['pages', 'review-manage', this.option.backTo]);
      this.ref.close();
    })
  }
}
