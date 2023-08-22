import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '@api/services/api.service';
import { CommonUtil } from '@common/utils/common-util';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() title: string;
  @Input() form: FormGroup;
  @Input() ctlName: string;
  @Input() placeholder?: string = '請上傳檔案';
  @Input() passFileArrayStr: string = '.csv,,,,'

  @Output() emitter = new EventEmitter();

  firstErr: string;
  ctl: FormControl;

  selectedFile: File;
  uploadResponse = { status: '', message: '', fileId: '' };

  constructor(private service: ApiService) { }

  ngOnInit(): void { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.service.doPost('http://your-backend-api/upload', formData).subscribe(
      (response) => {
        //this.uploadResponse = response;
        this.emitter.emit(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get required(){
    if(this.ctl?.validator) {
      return this.ctl.validator({} as AbstractControl)?.required !== undefined ? true : false;
    } else {
      return false;
    }
  }

  ngDoCheck(): void {
    // console.info(this.ctl.errors)
    if(!!this.ctl?.errors){
      //只取第一個錯誤訊息
      this.firstErr = Object.values(this.ctl.errors).map(val => val as string)[0];
    }
  }

  hasError(){
    return (this.ctl?.dirty || this.ctl?.touched) && this.ctl?.errors;
  }

  //#region 刪除最後一個特定字元(含重複)
  removeLastCharIfEquals(inputString: string, targetChar: string) {
    return CommonUtil.removeLastCharIfEquals(inputString, targetChar);
  }
  //#endregion

}
