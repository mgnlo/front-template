import { Component, Input, OnInit, Output } from '@angular/core';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleUser } from '@api/models/console-user.model';
import { LoadingService } from '@api/services/loading.service';
import { RestStatus } from '@common/enums/rest-enum';
import { NbDialogRef } from '@nebular/theme';
import { AccountManageService } from '@pages/account-manage/account.manage.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-change',
  templateUrl: './change.dialog.component.html',
  styleUrls: ['./change.dialog.component.scss'],
  providers: [AccountManageService]
})
export class ChangeDialogComponent implements OnInit {
  @Input() consoleUser: string;
  @Input() consoleGroupList: string;

  consoleUserJson: ConsoleUser;
  consoleGroupListJson: Array<ConsoleGroup>;
  groupId;

  constructor(
    protected ref: NbDialogRef<ChangeDialogComponent>,
    private loadingService: LoadingService,
    private accountManageService: AccountManageService) {

  }

  ngOnInit() {
    this.consoleUserJson = JSON.parse(this.consoleUser);
    this.consoleGroupListJson = JSON.parse(this.consoleGroupList);
    // document.querySelector(".option-list").scrollTop = 0;

    requestAnimationFrame(() => {
      this.groupId = this.consoleUserJson.consoleGroup.groupId;
    });
  }

  save() {
    // 需要發送 6.6 電文進行更新
    this.consoleUserJson.consoleGroup.groupId = this.groupId;
    this.consoleGroupListJson.filter((consoleGroup: ConsoleGroup) => {
      if(consoleGroup.groupId == this.groupId){
        this.consoleUserJson.consoleGroup = consoleGroup;
      }
    });
    this.accountManageService.updateConsoleUser(this.consoleUserJson.userId, this.consoleUserJson).pipe(
      catchError((err) => {
        this.loadingService.close();
        throw new Error(err.message);
      }),
      tap(res => {
        console.info(res)
        this.loadingService.close();
      })).subscribe(res => {
        if (res.code === RestStatus.SUCCESS) {
          // 成功後需要通知主畫面異動成功
          this.ref.close(this.consoleUserJson);
        }
      });

    // 成功後需要通知主畫面異動成功，電文串接後底下刪除
    this.ref.close(this.consoleUserJson);
  }

  close() {
    this.ref.close(null);
  }
}
