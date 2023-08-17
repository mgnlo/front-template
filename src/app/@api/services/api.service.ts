import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '@api/models/base.model';
import { RestStatus } from '@common/enums/rest-enum';
import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { ApiLogicError } from './../error/api-logic-error';
import { LoadingService } from './loading.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpOptions = {
    headers: {
      'Content-type': 'application/json; charset=UTF-8;',
      'Access-Control-Allow-Origin': '*',
      //   Authorization: '',
    },
  };
  private prefixUrl = this.configService.getConfig().SERVER_URL + this.configService.getConfig().API_URL;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private configService: ConfigService
  ) { }

  private doSend<T>(
    method: 'post' | 'get' | 'put' | 'delete',
    url: string,
    requestObj?: any,
    rqParams?: { [key: string]: any }): Observable<ResponseModel<T>> {

    let observable: Observable<ResponseModel<T>>;
    const resultUrl = this.prefixUrl + url;
    // const requestModel = { requestObj };

    switch (method) {
      case 'post':
        observable = this.http.post<ResponseModel<T>>(resultUrl, requestObj, this.httpOptions);
        break;
      case 'get':
        observable = this.http.get<ResponseModel<T>>(resultUrl, { params: rqParams, ...this.httpOptions });
        break;
      case 'put':
        observable = this.http.put<ResponseModel<T>>(resultUrl, requestObj, this.httpOptions);
        break;
      case 'delete':
        observable = this.http.delete<ResponseModel<T>>(resultUrl, { params: rqParams, ...this.httpOptions });
        break;
    }

    return observable.pipe(
      timeout(30000),
      tap(res => {
        if (res && res.code !== RestStatus.SUCCESS) {
          throw new ApiLogicError(res.message, res.code);
        }
      }),
    );
  }

  doPost<T>(url: string, requestObj: T): Observable<ResponseModel<T>> {
    return this.doSend('post', url, requestObj);
  }

  doGet<T>(url: string, rqParams?: { [key: string]: any }): Observable<ResponseModel<T>> {
    return this.doSend('get', url, null, rqParams);
  }

  doPut<T>(url: string, requestObj: any): Observable<ResponseModel<T>> {
    return this.doSend('put', url, requestObj);
  }

  doDelete<T>(url: string, rqParams?: { [key: string]: any }): Observable<ResponseModel<T>> {
    return this.doSend('delete', url, null, rqParams);
  }

  download(url: string, requestObj: any): void {
    this.loadingService.open();
    this.http.post<Blob>(
      this.prefixUrl + url,
      requestObj,
      { observe: 'response', responseType: 'blob' as 'json', ...this.httpOptions })
      .pipe(
        tap(res => {

          if (res.body.type === 'application/json') { // 有邏輯錯誤 => 回傳json => 拋出logic error

            res.body.text().then(text => {
              const resModel = JSON.parse(text) as ResponseModel<any>;
              throw new ApiLogicError(resModel.message, resModel.code);
            });

          } else {

            let fileName: string;
            const contentDispostion = res.headers.get('Content-Disposition');
            if (!contentDispostion) fileName = 'file';
            else {
              contentDispostion.split(';').forEach(p => {
                const key = 'filename=';
                const match = p.match(key);
                if (match) {
                  fileName = decodeURIComponent(p.substring(match.index + key.length));
                }
              });
            }
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(res.body);
            downloadLink.download = fileName || 'file';
            downloadLink.click();
            this.loadingService.close();
          }
        }),
      ).subscribe();
  }
}
