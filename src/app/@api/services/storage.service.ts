import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  putSessionVal(key: string, value: any): void {
    if (key) {
      sessionStorage.setItem(key, value ? JSON.stringify(value) : value);
    }
  }

  getSessionVal(key: string): any {
    if (key) {
      return JSON.parse(sessionStorage.getItem(key));
    } else {
      return undefined;
    }
  }

  removeSessionVal(key: string): void {
    if (key) {
      sessionStorage.removeItem(key);
    }
  }

  putLocalVal(key: string, value: any): void {
    if (key) {
      localStorage.setItem(key, value ? JSON.stringify(value) : value);
    }
  }

  getLocalVal(key: string): any {
    if (key) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return undefined;
    }
  }

  removeLocalVal(key: string): void {
    if (key) {
      localStorage.removeItem(key);
    }
  }

  /** 取得session暫存的查詢條件 */
  getSessionFilter(sessionKey: string, form: FormGroup): BehaviorSubject<boolean> {
    let result$ = new BehaviorSubject(false);
    let storage = this.getSessionVal(sessionKey);
    if (!!storage?.filter) {
      Object.keys(storage.filter).filter(key => !!form.get(key) && !!storage.filter[key]).forEach(key => {
        if (key.includes('Date')) {
          form.get(key).setValue(new Date(storage.filter[key]));
        } else {
          form.get(key).setValue(storage.filter[key]);
        }
      })
      result$.next(true);
    }
    return result$;
  }

  /** 取得session暫存的table頁數 */
  getSessionPage(sessionKey: string, dataSource: LocalDataSource): BehaviorSubject<boolean> {
    let result$ = new BehaviorSubject(false);
    let storage = this.getSessionVal(sessionKey);
    if(!!dataSource && !!storage?.page){
      dataSource.setPage(storage.page);
      result$.next(true);
    }
    return result$;
  }
}
