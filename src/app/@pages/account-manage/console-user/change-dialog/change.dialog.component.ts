import { Component, Input, OnInit } from '@angular/core';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleUser } from '@api/models/console-user.model';
import { DialogService } from '@api/services/dialog.service';
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
  @Input() consoleUser: ConsoleUser;
  @Input() consoleGroupList: Array<ConsoleGroup>;
  groupId: string;

  constructor(
    protected ref: NbDialogRef<ChangeDialogComponent>,
    private loadingService: LoadingService,
    private accountManageService: AccountManageService,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    // document.querySelector(".option-list").scrollTop = 0;

    requestAnimationFrame(() => {
      this.groupId = !!this.consoleUser.consoleGroup?.groupId ? this.consoleUser.consoleGroup.groupId : '';
    });
  }

  save() {
    // 需要發送 6.7 電文進行更新
    this.consoleUser.consoleGroup = !this.consoleUser.consoleGroup?.groupId ? new ConsoleGroup() : this.consoleUser.consoleGroup;
    this.consoleUser.consoleGroup['groupId'] = this.groupId;
    this.consoleGroupList.filter((consoleGroup: ConsoleGroup) => {
      if (consoleGroup.groupId == this.groupId) {
        this.consoleUser.consoleGroup = consoleGroup;
      }
    });
    this.loadingService.open();
    this.accountManageService.updateConsoleUser(this.consoleUser.userId, this.consoleUser).pipe(
      catchError((err) => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, `${this.consoleUser.account} 權限變更失敗`);
        throw new Error(err.message);
      }),
      tap(res => {
        console.info(res)
        this.loadingService.close();
      })).subscribe(res => {
        if (res.code === RestStatus.SUCCESS) {
          this.dialogService.alertAndBackToList(true, `${this.consoleUser.account} 權限變更成功`);
          this.ref.close(this.consoleUser);
        }
      });
  }

  close() {
    this.ref.close(null);
  }
}
