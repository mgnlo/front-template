import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '@api/models/base.model';
import { RestStatus } from '@common/enums/rest-enum';
import { ApiLogicError } from './../error/api-logic-error';
import { LoadingService } from './loading.service';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, timeout, switchMap, finalize } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  _jwtToken: string = null

  public set jwtToken(jwt: string) {
    this._jwtToken = jwt;
  }

  private httpOptions = {
    headers: {
      'Content-type': 'application/json; charset=UTF-8;',
      'Access-Control-Allow-Origin': '*',
      //   Authorization: '',
    },
  };
  // private prefixUrl = this.configService.getConfig().SERVER_URL + this.configService.getConfig().API_URL;
  private prefixUrl = "http://console-api-webcomm-c360.apps.ocp.webcomm.com.tw/api/";
  

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private configService: ConfigService,
    private storageService: StorageService
  ) { }

  private doSend<T>(
    method: 'post' | 'get' | 'put' | 'delete' | 'upload',
    url: string,
    requestObj?: any,
    rqParams?: { [key: string]: any }): Observable<ResponseModel<T>> {

    let observable: Observable<ResponseModel<T>>;

    const resultUrl = this.prefixUrl + url;
    // const requestModel = { requestObj };

    if (this._jwtToken) {
      this.httpOptions.headers["Authorization"] = `Bearer ${this._jwtToken}`;
    }

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
      case 'upload':
        observable = this.http.post<ResponseModel<T>>(resultUrl, requestObj);
        break;
    }

    return observable.pipe(
      timeout(30000),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.status === 403) {
          // JWT 失效主機發送 403 錯誤，這邊需要導頁回兆豐登入頁，待補(需要確認導頁網址與相關參數)
          this.storageService.removeSessionVal("jwtToken");
        }

        return throwError(errorMessage);
      }),
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

  doUpload<T>(url: string, requestObj: FormData): Observable<ResponseModel<T>> {
    return this.doSend('upload', url, requestObj);
  }

  doGetDownload(url: string, rqParams?: { [key: string]: any }) {
    this.loadingService.open();
    if (this._jwtToken) {
      this.httpOptions.headers["Authorization"] = `Bearer ${this._jwtToken}`;
    }

    const resultUrl = this.prefixUrl + url;
    this.http.get(resultUrl, {
      // params: rqParams,
      responseType: 'blob' as 'json',
      observe: 'response',
      ...this.httpOptions
    }).pipe(
      timeout(30000),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.message);
      }),
      tap((res: any) => {
        if (res && res.status?.toString() !== RestStatus.SUCCESS) {
          throw new ApiLogicError(res.statusText, res.status?.toString());
        }

        if (res.body.type === 'application/json') { // 有邏輯錯誤 => 回傳json => 拋出logic error
          throw new ApiLogicError('不可為json', res.status?.toString());
        }

        const contentDispositionHeader = res.headers.get('Content-Disposition');
        let fileName = rqParams?.fileName + rqParams?.uploadType; // 預設的文件名

        if (contentDispositionHeader) {
          const matches = contentDispositionHeader.match(/filename\*?=['"]?(?:UTF-8['"])?([^;\r\n"']*)['"]?;/);
          if (matches && matches.length > 1) {
            fileName = decodeURIComponent(matches[1]);
          }
        }

        const blob = new Blob([res.body], { type: 'application/octet-stream' });

        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      }),
      finalize(() => this.loadingService.close())
    ).subscribe()
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
