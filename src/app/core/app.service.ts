import { Injectable } from '@angular/core';
import { RestService } from '../otcs/rest.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private otcs: RestService) {
    this.otcs.urlRoot = environment.cgiPath;
  }

  getAncestors(id: string) {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.ancestorsGet(id, ticket)
        .then(response => resolve(response.result))
        .catch(error => reject(error));
    });
  }

  getChildren(id: string, pageNumber: number, pageCount: number) {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.nodesGet(id, pageNumber, pageCount, ticket, ['data'], ['member'])
        .then(response => resolve(response.result))
        .catch(error => reject(error));
    });
  }

  getNode(id: string) {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.nodeGet(id, ticket, ['data'], ['member'])
        .then(response => resolve(response.result))
        .catch(error => reject(error));
    });
  }

  private ticket(): string {
    let response = '';
    const name = 'LLCookie=';
    decodeURIComponent(document.cookie).split(';').forEach(cookie => {
      if (cookie.startsWith(name)) {
        response = cookie.substr(name.length);
      }
    });
    return response;
  }
}
