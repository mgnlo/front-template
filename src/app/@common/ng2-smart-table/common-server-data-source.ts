import { HttpClient } from '@angular/common/http';
import { CommonUtil } from '@common/utils/common-util';
import { environment } from 'environments/environment';
import { ServerDataSource } from 'ng2-smart-table';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class CommonConf {

  protected static readonly SORT_FIELD_KEY = 'sort';
  protected static readonly SORT_DIR_KEY = 'dir';
  protected static readonly PAGER_PAGE_KEY = 'page';
  protected static readonly PAGER_LIMIT_KEY = 'size';
  protected static readonly FILTER_FIELD_KEY = '#field#';
  protected static readonly TOTAL_KEY = 'result.totalElements';
  protected static readonly DATA_KEY = 'result.content';

  endPoint: string;
  sortFieldKey: string;
  sortDirKey: string;
  pagerPageKey: string;
  pagerLimitKey: string;
  filterFieldKey: string;
  totalKey: string;
  dataKey: string;

  constructor(
    { endPoint = '', sortFieldKey = '', sortDirKey = '',
      pagerPageKey = '', pagerLimitKey = '', filterFieldKey = '', totalKey = '', dataKey = '' } = {}) {

    this.endPoint = endPoint ? endPoint : '';
    this.sortFieldKey = sortFieldKey ? sortFieldKey : CommonConf.SORT_FIELD_KEY;
    this.sortDirKey = sortDirKey ? sortDirKey : CommonConf.SORT_DIR_KEY;
    this.pagerPageKey = pagerPageKey ? pagerPageKey : CommonConf.PAGER_PAGE_KEY;
    this.pagerLimitKey = pagerLimitKey ? pagerLimitKey : CommonConf.PAGER_LIMIT_KEY;
    this.filterFieldKey = filterFieldKey ? filterFieldKey : CommonConf.FILTER_FIELD_KEY;
    this.totalKey = totalKey ? totalKey : CommonConf.TOTAL_KEY;
    this.dataKey = dataKey ? dataKey : CommonConf.DATA_KEY;
  }
}

export class ServerSourceInitConfig {
  page?: number;
  perPage?: number;
  sorts?: { field: string, direction: 'asc' | 'desc', compare?: Function }[];
  filters?: { key: string, value: string | number | boolean }[];
  andOperator?: boolean;
}

export class CommonServerDataSource extends ServerDataSource {

  private initConf: ServerSourceInitConfig;
  private prefixUrl = environment.SERVER_URL + environment.API_URL;
  private apiStatusSubject: BehaviorSubject<'init' | 'loading' | 'finish' | 'error'> = new BehaviorSubject('init');

  constructor(protected http: HttpClient, conf: CommonConf | {} = {}, initConf?: ServerSourceInitConfig) {
    super(http, conf);
    this.initConf = initConf;
  }

  protected requestElements(): Observable<any> {
    const resultUrl = this.prefixUrl + this.conf.endPoint;
    let httpParams = this.createRequesParams();

    if (this.initConf) {
      if (!!this.initConf.filters && this.initConf.filters.length > 0) {
        this.initConf.filters.filter(filter => CommonUtil.isNotBlank(filter.value.toString()))
          .forEach(filter => { httpParams = httpParams.append(filter.key, filter.value) });
      }

      if (!!this.initConf.sorts) {
        this.setSort(this.initConf.sorts, false);
      }

      this.initConf = undefined;
    } else {
      this.apiStatusSubject.next('loading');
    }

    return this.http.get(resultUrl, { params: httpParams, observe: 'response' })
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
