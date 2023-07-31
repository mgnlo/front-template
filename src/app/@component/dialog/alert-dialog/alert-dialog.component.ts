import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

export class AlertDialogOption {
  isSuccess: boolean;
  backTo: string[];
  content: string;
}
@Component({
  selector: 'ngx-alert-dialog',
  templateUrl: 'alert-dialog.component.html',
  styleUrls: ['alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit {

  @Input() option: AlertDialogOption;

  constructor(protected ref: NbDialogRef<AlertDialogComponent>, private router: Router) {}

  ngOnInit() {
    interval(1500).pipe(
      map(val => 1 - val),
      takeWhile(x => x >= 0)
    ).subscribe(() => {
      this.router.navigate(this.option.backTo);
      this.ref.close();
    })
  }
}
