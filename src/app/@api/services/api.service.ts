import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '@api/models/base.model';
import { RestStatus } from '@common/enums/rest-enum';
import { ApiLogicError } from './../error/api-logic-error';
import { LoadingService } from './loading.service';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, timeout, finalize } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { DialogService } from './dialog.service';

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

  private prefixUrl = this.configService.getConfig().SERVER_URL + this.configService.getConfig().API_URL;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private configService: ConfigService,
    private dialogService: DialogService,
    private storageService: StorageService
  ) { }

  private doSend<T>(
    method: 'post' | 'get' | 'put' | 'delete' | 'upload',
    url: string,
    requestObj?: any,
    rqParams?: { [key: string]: any },
    prefixUrl?: string,
    observe?: string,
  ): Observable<ResponseModel<T>> {

    let observable: Observable<ResponseModel<T>>;

    prefixUrl = !prefixUrl ? this.prefixUrl : prefixUrl;
    const resultUrl = prefixUrl + url;
    // const requestModel = { requestObj };

    if (this._jwtToken) {
      this.httpOptions.headers["Authorization"] = `Bearer ${this._jwtToken}`;
    }

    // console.log('this.httpOptionsthis',JSON.stringify(this.httpOptions));

    switch (method) {
      case 'post':
        observable = this.http.post<ResponseModel<T>>(resultUrl, requestObj, this.httpOptions);
        break;
      case 'get':
        let httpOptions0 = { params: rqParams, ...this.httpOptions }
        let httpOptions1 = { params: rqParams, ...this.httpOptions, observe: 'response'}
        observable = this.http.get<ResponseModel<T>>(resultUrl, observe ? httpOptions1 : httpOptions0);
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
        if (res && (res.code || res['body']['code']) !== RestStatus.SUCCESS) {
          throw new ApiLogicError(res.message, res.code);
        }
      }),
    );
  }

  doPost<T>(url: string, requestObj: T): Observable<ResponseModel<T>> {
    return this.doSend('post', url, requestObj);
  }

  doGet<T>(url: string, rqParams?: { [key: string]: any }, prefixUrl?: string, observe?: string): Observable<ResponseModel<T>> {
    return this.doSend('get', url, null, rqParams, prefixUrl, observe);
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
    this.http.get<Blob>(resultUrl, {
      // params: rqParams,
      responseType: 'blob' as 'json',
      observe: 'response',
      ...this.httpOptions
    }).pipe(
      timeout(30000),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          // JWT 失效主機發送 403 錯誤，這邊需要導頁回兆豐登入頁，待補(需要確認導頁網址與相關參數)
          this.storageService.removeSessionVal("jwtToken");
        }

        return throwError(err.message);
      }),
      tap((res: HttpResponse<Blob>) => {
        // console.info('res',res)
        if (res && res.status?.toString() !== RestStatus.SUCCESS) {
          this.dialogService.alertAndBackToList(false, '檔案下載失敗');
          throw new ApiLogicError(res.statusText, res.status?.toString());
        }

        if (res.body.type === 'application/json') { // 有邏輯錯誤 => 回傳json => 拋出logic error
          this.dialogService.alertAndBackToList(false, '檔案下載失敗');
          throw new ApiLogicError('不可為json', res.status?.toString());
        }

        const contentDispositionHeader = res.headers.get('Content-Disposition');
        if (rqParams?.uploadType && rqParams.uploadType.charAt(0) !== '.') {
          rqParams.uploadType = '.' + rqParams.uploadType;
        }
        let fileName = rqParams?.fileName + rqParams?.uploadType; // 預設的文件名

        if (contentDispositionHeader) {
          const matches = contentDispositionHeader.match(/filename\*?=['"]?(?:UTF-8['"])?([^;\r\n"']*)['"]?;/);
          if (matches && matches.length > 1) fileName = decodeURIComponent(matches[1]);
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
}
