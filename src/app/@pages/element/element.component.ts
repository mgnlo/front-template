import { Component, OnInit, ViewChild } from "@angular/core"
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-page-element",
  templateUrl: "./element.component.html",
  styleUrls: ["./element.component.scss"]
})
export class ElementComponent implements OnInit {

  isOpen = true;
  isOpen2 = true;

  @ViewChild('autoInput') txnInput: { nativeElement: { value: string; }; };
  options: string[];
  filteredOptions$: Observable<string[]>;
  public ngOnInit(): void {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
  }

  adapter = new DemoFilePickerAdapter(this.http);
  constructor(private http: HttpClient) { }
  
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
}
