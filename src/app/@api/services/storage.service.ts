import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
}
