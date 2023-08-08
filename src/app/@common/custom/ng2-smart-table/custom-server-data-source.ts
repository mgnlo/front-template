import { HttpClient } from '@angular/common/http';
import { LoadingService } from '@api/services/loading.service';
import { ServerDataSource } from 'ng2-smart-table';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServerSourceInitConfig } from './custom-server-data-source-config';

export class CustomServerDataSource extends ServerDataSource {

  private initConf: ServerSourceInitConfig;
  private apiStatusSubject: BehaviorSubject<'init' | 'loading' | 'finish' | 'error'> = new BehaviorSubject('init');

  constructor(protected http: HttpClient, conf: ServerSourceConf | {} = {}, initConf?: ServerSourceInitConfig, loadingService?: LoadingService) {
    super(http, conf);
    this.initConf = initConf;
  }

  protected requestElements(): Observable<any> {

    const httpParams = this.createRequesParams();

    if (this.initConf) {
      if (!!this.initConf.filters && this.initConf.filters.length > 0) {
        const andOperator = this.initConf.andOperator ? this.initConf.andOperator : true;
        this.setFilter(this.initConf.filters, andOperator, false);
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
