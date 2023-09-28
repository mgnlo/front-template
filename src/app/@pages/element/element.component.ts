import { Component, HostBinding, OnInit, ViewChild } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { NbDialogService, NbGlobalPhysicalPosition, NbIconConfig, NbToastrConfig, NbToastrService } from "@nebular/theme";
import { TextDialogComponent } from "@pages/dialog/textDialog/textDialog";
import { ConfirmDialogComponent } from "@pages/dialog/confirmDialog/confirmDialog";
import { StatusDialogComponent } from "@pages/dialog/statusDialog/statusDialog";
import { TimeoutDialogComponent } from "@pages/dialog/timeoutDialog/timeoutDialog";

@Component({
  selector: "app-page-element",
  templateUrl: "./element.component.html",
  styleUrls: ["./element.component.scss"]
})
export class ElementComponent implements OnInit {

  isOpen = true;
  isOpen2 = false;
  isShowSubItem = false;
  isShowListItem = false;
  isShowListItem2 = false;
  showPassword = false;
  selected = '1';
  selectedItem = '0';
  toggleBtnStatus:string = "info"
  adapter = new DemoFilePickerAdapter(this.http);
  mongoDB = "{variables: {$elemMatch: {key:’產品持有數’, value: {$gte: 3}}}}";

  @ViewChild('autoInput') txnInput: { nativeElement: { value: string; }; };

  public ngOnInit(): void {}
  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService, private http: HttpClient) { }

  private index: number = 0;
  @HostBinding('class')
  
  classes = 'example-items-rows';
  positions = NbGlobalPhysicalPosition;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  showToast(position:any, status:any, toastTitle:any, iconName:any) {
    const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    this.index += 1;
    const config: Partial<NbToastrConfig> = { position, status, icon: iconConfig };
    
    this.toastrService.show(`訊息文字訊息文字訊息文字訊息文字`, toastTitle + `${this.index}`, config);
  }
  openTextSmallDialog() {
    this.dialogService.open(TextDialogComponent, {
      context: {
        dialogSize: 'small',
        title: 'Dialog標題',
        content: '文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容',
        btnName: '關 閉',
      }
    });
  }
  openTextMeduimDialog() {
    this.dialogService.open(TextDialogComponent, {
      context: {
        dialogSize: 'meduim',
        title: 'Dialog標題',
        content: '文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容',
        btnName: '關 閉',
      }
    });
  }
  openTextLargeDialog() {
    this.dialogService.open(TextDialogComponent, {
      context: {
        dialogSize: 'large',
        title: 'Dialog標題',
        content: '文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容',
        btnName: '確 認',
      }
    });
  }
  openConfirmDialog() {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        dialogSize: 'small',
        title: 'Dialog標題',
        content: '文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容',
        subBtnName: '取 消',
        mainBtnName: '確 認',
      }
    });
  }
  openSuccessDialog() {
    this.dialogService.open(StatusDialogComponent, {
      context: {
        isSuccess: true,
        title: '執行成功',
      }
    });
  }
  openFailDialog() {
    this.dialogService.open(StatusDialogComponent, {
      context: {
        isSuccess: false,
        title: '執行失敗',
      }
    });
  }
  openTimeoutDialog() {
    this.dialogService.open(TimeoutDialogComponent, {
      context: {
        title: '逾時操作',
        btnName: '關 閉',
      }
    });
  }
}
