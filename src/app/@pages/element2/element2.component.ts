import { Component, OnInit, ViewChild } from "@angular/core"
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-page-element2",
  templateUrl: "./element2.component.html",
  styleUrls: ["./element2.component.scss"]
})
export class Element2Component implements OnInit {  
  public editor = ClassicEditor;
  @ViewChild('autoInput') txnInput: { nativeElement: { value: string; }; };
  options: string[];
  filteredOptions$: Observable<string[]>;
  public ngOnInit(): void {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
  }

  adapter = new DemoFilePickerAdapter(this.http);
  constructor(private http: HttpClient) { }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map((filterString: any) => this.filter(filterString)),
    );
  }
  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.txnInput.nativeElement.value);
  }
  onSelectionChange($event: any) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

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

