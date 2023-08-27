import { Injectable } from '@angular/core';
import { ResponseModel } from '@api/models/base.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FileReq, FileResp } from '@api/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  readonly fileFunc = 'file';
  readonly fileUploadFunc = `${this.fileFunc}/upload`;
  readonly fileDownloadFunc = `${this.fileFunc}/download/`;

  constructor(private service: ApiService) { }

  uploadFileService(data: any): Observable<ResponseModel<FileResp>> {
    return this.service.doUpload(this.fileUploadFunc, data);
  }

  downloadFileService(data: FileReq): Observable<ResponseModel<FileResp>> {
    return this.service.doGet(this.fileDownloadFunc , data);
  }

}
