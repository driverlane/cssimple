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

  getAssignments(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.assignmentsGet(ticket)
        .then(response => resolve(response.result.map(a => a.data.assignments)))
        .catch(error => reject(error));
    });
  }

  getAncestors(id: string | number) {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.ancestorsGet(id.toString(), ticket)
        .then(response => resolve(response.result))
        .catch(error => reject(error));
    });
  }

  getChildren(id: string | number, pageNumber: number, pageCount: number) {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.nodesGet(id.toString(), pageNumber, pageCount, ticket, ['data'], ['member'])
        .then(response => resolve(response.result))
        .catch(error => reject(error));
    });
  }

  getFavourites(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.favouritesGet(ticket)
        .then(response => resolve(response.result.map(a => a.data.properties)))
        .catch(error => reject(error));
    });
  }

  getNode(id: string | number): any {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.nodeGet(id.toString(), ticket, ['data'], ['member'])
        .then(response => resolve(response.result))
        .catch(error => reject(error));
    });
  }

  getNodeLink(node: any): any[] {
    if (node.type === 153) {
      return ['processes', 'assignment', node.workflow_id, node.workflow_subworkflow_id, node.workflow_subworkflow_task_id];
    }
    if (node.id && node.container === true) {
      return ['browse', node.id];
    }
    if (node.id && node.container === false) {
      return ['details', node.id];
    }

    console.log(`Unhandled link ${node.type} ${node.type_name} ${node.id}`);
    console.log(node);
    return [];
  }

  getRecentlyAccessed(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const ticket = this.ticket();
      this.otcs.accessedGet(ticket)
        .then(response => resolve(response.result.map(a => a.data.properties)))
        .catch(error => reject(error));
    });
  }

  private ticket(): string {
    let response = '';
    const name = 'LLCookie=';
    decodeURIComponent(document.cookie).split(';').forEach(cookie => {
      cookie = cookie.trim();
      if (cookie.startsWith(name)) {
        response = cookie.substr(name.length);
      }
    });
    return response;
  }
}
