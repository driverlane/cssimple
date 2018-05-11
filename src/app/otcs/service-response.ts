import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

export class ServiceResponse {

  success = true;
  statusCode = 200;
  message?: string;
  result?: any;
  error?: Error;

  constructor(values: any = {}, success: boolean = true, htmlResponse: boolean = false) {

    if (!success) {
      this.success = false;
      this.statusCode = 400;
    }
    if (values instanceof HttpResponse) {
      this.success = values.ok || this.success;
      this.statusCode = values.status || this.statusCode;
      this.message = values.statusText;
      this.result = values.body || {};
    }
    else if (values instanceof HttpErrorResponse) {
      this.success = false;
      this.statusCode = values.status || this.statusCode;
      this.message = values.message;
      this.error = values.error;
    }
    else if (typeof values === 'string') {
      this.message = values;
    }
    else {
      (<any>Object).assign(this, values);
    }

  }

}