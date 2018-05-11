import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class Toast {

  status = 'is-danger';
  message: string;
  error?: Error;
  close = true;
  expiry?: number;

  constructor(values: any = {}) {
    if (typeof values === 'string') {
      this.message = values;
    }
    else if (values instanceof Error) {
      this.message = values.message || values.toString();
      this.error = values;
    }
    else {
      (<any>Object).assign(this, values);
    }
  }

}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private _toast: BehaviorSubject<Toast> = new BehaviorSubject(null);
  public toast: Observable<Toast> = this._toast.asObservable();

  constructor() { }

  showToast(toast: Error | Toast | string) {
    const piece = new Toast(toast);
    this._toast.next(piece);
  }

}
