import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-agree-dialog',
  templateUrl: 'agree-dialog.component.html',
  styleUrls: ['agree-dialog.component.scss'],
})
export class AgreeDialogComponent implements OnInit {

  @Input() backTo: string;

  constructor(protected ref: NbDialogRef<AgreeDialogComponent>, private router: Router) {}

  ngOnInit() {
    interval(1000).pipe(
      map(val => 1 - val),
      takeWhile(x => x >= 0)
    ).subscribe(() => {
      //TODO: 送出審核同意
      this.router.navigate(['pages', 'review-manage', this.backTo]);
      this.ref.close();
    })
  }
}
