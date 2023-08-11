import { Component, OnInit, ViewChild } from "@angular/core"
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NbTagComponent, NbTagInputAddEvent } from "@nebular/theme";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-page-element2",
  templateUrl: "./element2.component.html",
  styleUrls: ["./element2.component.scss"]
})

export class Element2Component implements OnInit {  

  showPassword = false;
  selected = '1';
  options: string[];
  dates: { value: string;}[] = [];
  weeks = ['一','二','三','四','五','六','日'];
  hours: { value: string;}[] = [];
  minutes: { value: string;}[] = [];
  filteredOptions$: Observable<string[]>;
  tags: Set<string> = new Set();
  selectedValue: string;
  selectedValue2: string;

  @ViewChild('autoInput') txnInput: { nativeElement: { value: string; }; };

  public editor = ClassicEditor;

  public ngOnInit(): void {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
  }

  constructor() {
    for (let i = 1; i <= 31; i++) {
      const value = (i < 10 ? '0' : '') + i;
      this.dates.push({ value: value });
    }
    for (let i = 0; i < 24; i++) {
      const value = (i < 10 ? '0' : '') + i;
      this.hours.push({ value: value });
    }
    for (let i = 0; i < 60; i++) {
      const value = (i < 10 ? '0' : '') + i;
      this.minutes.push({ value: value });
    }
  }

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
    this.tags.add($event);
  }
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }
  removeTag(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
  }
  addTag({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.tags.add(value)
    }
    input.nativeElement.value = '';
  }
  onRadioChange(value: string) {
    this.selectedValue = value;
  }
  onRadioChange2(value: string) {
    this.selectedValue2 = value;
  }
}
