import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(
  ) { }

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

}
