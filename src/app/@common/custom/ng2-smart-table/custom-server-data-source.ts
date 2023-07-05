import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import { Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServerSourceInitConfig } from './custom-server-data-source-config';

export class CustomServerDataSource extends ServerDataSource {

  private initConf: ServerSourceInitConfig;
  private apiStatusSubject: Subject<'init' | 'loading' | 'finish'> = new Subject();

  constructor(protected http: HttpClient, conf: ServerSourceConf | {} = {}, initConf?: ServerSourceInitConfig) {

    super(http, conf);
    this.initConf = initConf;
  }

  protected requestElements(): Observable<any> {

    if (this.initConf) {
      /** setFilter would cause setPage(1) in super class, so setFilter first */
      if (this.initConf.filters) {
        const andOperator = this.initConf.andOperator ? this.initConf.andOperator : true;
        this.setFilter(this.initConf.filters, andOperator, false);
      }

      if (this.initConf.sort) {
        this.setSort(this.initConf.sort, false);
      }

      if (this.initConf.page) {
        const perPage = this.initConf.perPage ? this.initConf.perPage : 10;
        this.setPaging(this.initConf.page, perPage, false);
      }
      this.initConf = undefined;
    } else {
      this.apiStatusSubject.next('loading');
    }
    const httpParams = this.createRequesParams();

    return this.http.get(this.conf.endPoint, { params: httpParams, observe: 'response' })
    .pipe(
      catchError(err => {
        this.apiStatusSubject.next('finish');
        throw err;
      }),
      tap(() => this.apiStatusSubject.next('finish')),
    );
  }

  apiStatus(): Observable<'init' | 'loading' | 'finish'> {
    return this.apiStatusSubject.asObservable();
  }
}
