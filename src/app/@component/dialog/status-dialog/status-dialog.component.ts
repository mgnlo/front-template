import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

export class StatusDialogOption {
  bool: boolean;
  backTo: string;
}
@Component({
  selector: 'ngx-status-dialog',
  templateUrl: 'status-dialog.component.html',
  styleUrls: ['status-dialog.component.scss'],
})
export class StatusDialogComponent implements OnInit {

  @Input() option: StatusDialogOption;

  constructor(protected ref: NbDialogRef<StatusDialogComponent>, private router: Router) {}

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
