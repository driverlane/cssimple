import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceResponse } from './service-response';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  urlRoot: string;

  constructor(private http: HttpClient) { }

  /* ----- nodes ----- */

  ancestorsGet(id: number | string, ticket: string, fields: Array<string> = [], expand: Array<string> = [],
    expand_fields: Array<string> = []): Promise<ServiceResponse> {
    return new Promise((resolve, reject) => {

      let url = this.urlRoot + '/api/v1/nodes/' + id.toString() + '/ancestors';
      url = this.addFields(url, fields);
      url = this.addExpand(url, expand);
      url = this.addExpandFields(url, expand_fields);

      const headers = new HttpHeaders().set('otcsticket', ticket);
      this.http.get(url, { headers: headers }).toPromise()
        .then(response => resolve(new ServiceResponse({ result: (<any>response).ancestors })))
        .catch(error => reject(new ServiceResponse(error, false)));
    });
  }

  nodeGet(id: number | string, ticket: string, fields: Array<string> = [], expand: Array<string> = [],
    expand_fields: Array<string> = []): Promise<ServiceResponse> {
    return new Promise((resolve, reject) => {

      let url = this.urlRoot + '/api/v1/nodes/' + id.toString();
      url = this.addFields(url, fields);
      url = this.addExpand(url, expand);
      url = this.addExpandFields(url, expand_fields);

      const headers = new HttpHeaders().set('otcsticket', ticket);
      this.http.get(url, { headers: headers }).toPromise()
        .then(response => {
          resolve(new ServiceResponse({ result: (<any>response).data }));
        })
        .catch(error => {
          reject(new ServiceResponse(error, false));
        });

    });
  }

  nodesGet(id: number | string, pageNumber: number, pageSize: number, ticket: string, fields: Array<string> = [], expand: Array<string> = [],
    expand_fields: Array<string> = []): Promise<ServiceResponse> {
    return new Promise((resolve, reject) => {

      let url = this.urlRoot + '/api/v1/nodes/' + id.toString() + '/nodes';
      if (pageNumber) {
        url += url.indexOf('?') < 0 ? '?page=' + pageNumber : '&page=' + pageNumber;
      }
      if (pageSize) {
        url += url.indexOf('?') < 0 ? '?limit=' + pageSize : '&limit=' + pageSize;
      }
      url = this.addFields(url, fields);
      url = this.addExpand(url, expand);
      url = this.addExpandFields(url, expand_fields);

      const headers = new HttpHeaders().set('otcsticket', ticket);
      this.http.get(url, { headers: headers }).toPromise()
        .then(response => {
          resolve(new ServiceResponse({ result: (<any>response).data }));
        })
        .catch(error => {
          reject(new ServiceResponse(error, false));
        });
    });
  }

  /* ----- url builder functions ----- */

  private addFields(url: string, fields: Array<string>): string {
    fields = fields || [];
    fields.forEach(field => {
      if (typeof field === 'string') {
        url += url.indexOf('?') < 0 ? '?fields=' + field : '&fields=' + field;
      }
    });
    return url;
  }

  private addExpand(url: string, expand: Array<string>): string {
    expand = expand || [];
    expand.forEach(type => {
      if (typeof type === 'string') {
        url += url.indexOf('?') < 0 ? '?expand=' + type : '&expand=' + type;
      }
    });
    return url;
  }

  private addExpandFields(url: string, expand_fields: Array<string>): string {
    expand_fields = expand_fields || [];
    expand_fields.forEach(field => {
      if (typeof field === 'string') {
        url += url.indexOf('?') < 0 ? '?expand_fields=' + field : '&expand_fields=' + field;
      }
    });
    return url;
  }

}
