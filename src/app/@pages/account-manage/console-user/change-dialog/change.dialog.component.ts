import { Component, Input, OnInit, Output } from '@angular/core';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleUser } from '@api/models/console-user.model';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-change',
  templateUrl: './change.dialog.component.html',
  styleUrls: ['./change.dialog.component.scss'],
  providers: [],
})
export class ChangeDialogComponent implements OnInit {

  @Input() consoleUser: string;
  @Input() consoleGroupList: string;
  @Output() cha

  consoleUserJson: ConsoleUser;
  consoleGroupListJson: Array<ConsoleGroup>;
  groupId;

  constructor(protected ref: NbDialogRef<ChangeDialogComponent>,) {
    
  }

  ngOnInit() {
    this.consoleUserJson = JSON.parse(this.consoleUser);
    this.consoleGroupListJson = JSON.parse(this.consoleGroupList);
    // document.querySelector(".option-list").scrollTop = 0;

    requestAnimationFrame(() => {
      this.groupId = this.consoleUserJson.consoleGroup.groupId;
    });    
  }

  save(){
    // 需要發送 5.6 電文進行更新
    // 成功後需要通知主畫面異動成功
    this.ref.close(true);
  }

  close() {
    this.ref.close(false);
  }
}
