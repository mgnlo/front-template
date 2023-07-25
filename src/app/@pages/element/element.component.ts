import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core"
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbDialogService, NbThemeService } from "@nebular/theme";

export interface SparklineChartDataItem<V = number, L = string> {
  id: string | number;
  x: L;
  y: V;
}

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
  

  public data: SparklineChartDataItem[] = [
    {
      id: 1,
      x: '1 Minute Ago',
      y: 25
    },
    {
      id: 2,
      x: '5 Minute Ago',
      y: 20
    },
    {
      id: 3,
      x: '10 Minute Ago',
      y: 35
    },
    {
      id: 4,
      x: '15 Minute Ago',
      y: 17
    },
    {
      id: 5,
      x: '20 Minute Ago',
      y: 17
    },
    {
      id: 6,
      x: '25 Minute Ago',
      y: 22
    },
  ];


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

