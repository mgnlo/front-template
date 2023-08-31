import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleUserList } from '@api/models/console-user.model';
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
export class ChangeDialogComponent {
  @Input() consoleUser: ConsoleUserList;
  @Input() consoleGroupList: Array<ConsoleGroup>;
  groupId: string;

  constructor(
    protected ref: NbDialogRef<ChangeDialogComponent>,
    private loadingService: LoadingService,
    private accountManageService: AccountManageService,
    private dialogService: DialogService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.consoleUser.currentValue != changes.consoleUser.previousValue) {
      this.groupId = changes.consoleUser.currentValue.consoleGroup?.groupId ? changes.consoleUser.currentValue.consoleGroup.groupId : '';
    }
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
    this.accountManageService.updateConsoleUserList(this.consoleUser.userId, this.consoleUser).pipe(
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
