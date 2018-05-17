import { Injectable } from '@angular/core';
import { RestService } from '../otcs/rest.service';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  cache: any;
  cacheName = 'otcs-simple-cache';

  private _accessed: BehaviorSubject<any[]> = new BehaviorSubject(null);
  accessed: Observable<any[]> = this._accessed.asObservable();
  private _favourites: BehaviorSubject<any[]> = new BehaviorSubject(null);
  favourites: Observable<any[]> = this._favourites.asObservable();
  private _tasks: BehaviorSubject<any[]> = new BehaviorSubject(null);
  tasks: Observable<any[]> = this._tasks.asObservable();
  private _initiatedJobs: BehaviorSubject<any[]> = new BehaviorSubject(null);
  initiatedJobs: Observable<any[]> = this._initiatedJobs.asObservable();
  private _managedJobs: BehaviorSubject<any[]> = new BehaviorSubject(null);
  managedJobs: Observable<any[]> = this._managedJobs.asObservable();

  constructor(private otcs: RestService) {
    this.otcs.urlRoot = environment.cgiPath;
    this.cache = JSON.parse(localStorage.getItem(this.cacheName)) || {};
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

  refreshedAccessed() {
    if (this.cache.accessed) {
      this._accessed.next(this.cache.accessed);
    }
    this.otcs.accessedGet(this.ticket())
      .then(response => {
        this.cache.accessed = response.result.map(a => a.data.properties);
        this._accessed.next(this.cache.accessed);
        localStorage.setItem(this.cacheName, JSON.stringify(this.cache));
      })
      .catch(error => console.error(error));
  }

  refreshFavourites() {
    if (this.cache.favourites) {
      this._favourites.next(this.cache.favourites);
    }
    this.otcs.favouritesGet(this.ticket())
      .then(response => {
        this.cache.favourites = response.result.map(a => a.data.properties);
        this._favourites.next(this.cache.favourites);
        localStorage.setItem(this.cacheName, JSON.stringify(this.cache));
      })
      .catch(error => console.error(error));
  }

  refreshInitiatedJobs() {
    if (this.cache.initiatedJobs) {
      this._initiatedJobs.next(this.cache.initiatedJobs);
    }
    /*this.otcs.initiatedJobsGet(this.ticket())
      .then(response => {
        this.cache.initiatedJobs = response.result.map(a => a.data.properties);
        this._initiatedJobs.next(this.cache.initiatedJobs);
        localStorage.setItem(this.cacheName, JSON.stringify(this.cache));
      })
      .catch(error => console.error(error));*/
  }

  refreshManagedJobs() {
    if (this.cache.managedJobs) {
      this._managedJobs.next(this.cache.managedJobs);
    }
    /*this.otcs.managedJobsGet(this.ticket())
      .then(response => {
        this.cache.managedJobs = response.result.map(a => a.data.properties);
        this._managedJobs.next(this.cache.managedJobs);
        localStorage.setItem(this.cacheName, JSON.stringify(this.cache));
      })
      .catch(error => console.error(error));*/
  }

  refreshTasks() {
    if (this.cache.tasks) {
      this._tasks.next(this.cache.tasks);
    }
    this.otcs.assignmentsGet(this.ticket())
      .then(response => {
        this.cache.tasks = response.result.map(a => a.data.assignments);
        this._tasks.next(this.cache.tasks);
        localStorage.setItem(this.cacheName, JSON.stringify(this.cache));
      })
      .catch(error => console.error(error));
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
