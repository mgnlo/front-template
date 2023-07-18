import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core"
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbDialogService, NbThemeService } from "@nebular/theme";

@Component({
  selector: "app-page-element",
  templateUrl: "./element.component.html",
  styleUrls: ["./element.component.scss"]
})
export class ElementComponent implements OnInit {

  isOpen = true;
  isOpen2 = true;
  selectedItem = "0";
  mongoDB = "{variables: {$elemMatch: {key:’產品持有數’, value: {$gte: 3}}}}";


  @ViewChild('autoInput') txnInput: { nativeElement: { value: string; }; };
  options: string[];
  filteredOptions$: Observable<string[]>;
  

  public ngOnInit(): void {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
  }

  adapter = new DemoFilePickerAdapter(this.http);
  constructor(private http: HttpClient, private dialogService: NbDialogService) {}
  
  // 密碼欄位設定
  showPassword = false;
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  // 下拉是選單自動帶入值
  selected = '1';

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
}

