import { Injectable } from '@angular/core';
import { ResponseModel } from '@api/models/base.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  readonly fileFunc = 'file';
  readonly fileUploadFunc = `${this.fileFunc}/upload`;
  readonly fileDownloadFunc = `${this.fileFunc}/downLoad`;

  constructor(private service: ApiService) { }

  uploadFileService(data: FormData): Observable<ResponseModel<any>> {
    return this.service.doPost(this.fileUploadFunc, data);
  }

  downloadFileService(id: string): Observable<ResponseModel<any>> {
    return this.service.doGet(this.fileDownloadFunc + id);
  }

}
