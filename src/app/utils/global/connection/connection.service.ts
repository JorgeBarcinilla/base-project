import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private _onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    window.addEventListener('online', this.onlineHandler);
    window.addEventListener('offline', this.offlineHandler);
  }

  private onlineHandler = () => {
    this._onlineStatus.next(true);
  };

  private offlineHandler = () => {
    this._onlineStatus.next(false);
  };

  public changeOnlineStatus(): Observable<boolean> {
    return this._onlineStatus.asObservable();
  }
}
