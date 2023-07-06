import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = new BehaviorSubject<boolean>(false)

  constructor() { }

  open(): void {
    this.loading.next(true);
  }

  close(): void {
    this.loading.next(false);
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
