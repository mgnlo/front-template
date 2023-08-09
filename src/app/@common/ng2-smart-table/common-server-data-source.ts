import { HttpClient } from '@angular/common/http';
import { CommonUtil } from '@common/utils/common-util';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class ServerSourceInitConfig {
  page?: number;
  perPage?: number;
  sort?: { field: string, direction: string, compare: any }[];
  filters?: { key: string, value: string | number | boolean }[];
  andOperator?: boolean;
}

export class CommonServerDataSource extends ServerDataSource {

  private initConf: ServerSourceInitConfig;
  private apiStatusSubject: BehaviorSubject<'init' | 'loading' | 'finish' | 'error'> = new BehaviorSubject('init');

  constructor(protected http: HttpClient, conf: ServerSourceConf | {} = {}, initConf?: ServerSourceInitConfig) {
    super(http, conf);
    this.initConf = initConf;
  }

  protected requestElements(): Observable<any> {

    let httpParams = this.createRequesParams();

    if (this.initConf) {
      if (!!this.initConf.filters && this.initConf.filters.length > 0) {
        this.initConf.filters.filter(filter => CommonUtil.isNotBlank(filter.value.toString()))
          .forEach(filter => { httpParams = httpParams.append(filter.key, filter.value) });
      }

      if (!!this.initConf.sort) {
        this.setSort(this.initConf.sort, false);
      }

      this.initConf = undefined;
    } else {
      this.apiStatusSubject.next('loading');
    }

    return this.http.get(this.conf.endPoint, { params: httpParams, observe: 'response' })
      .pipe(
        catchError(err => {
          this.apiStatusSubject.next('error');
          throw err;
        }),
        tap(() => this.apiStatusSubject.next('finish')),
      );
  }

  apiStatus(): Observable<'init' | 'loading' | 'finish' | 'error'> {
    return this.apiStatusSubject.asObservable();
  }
}
