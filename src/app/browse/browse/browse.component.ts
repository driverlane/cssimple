import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd } from '@angular/router';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnDestroy, OnInit {

  loading = true;
  id: any;
  node: any;

  pages = 1;
  currentPage = 1;
  pageSize = 10;

  routeEvents: Subscription;

  constructor(private app: AppService, private route: ActivatedRoute, private router: Router, private toaster: ToasterService) { }

  ngOnDestroy() {
    this.routeEvents.unsubscribe();
  }

  ngOnInit() {
    const config = (JSON.parse(localStorage.getItem('otcs-simple')) || {});
    if (config.pageSize) {
      this.pageSize = config.pageSize;
    }
    this.getNode();
    this.routeEvents = this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.loading = true;
        this.currentPage = 1;
        this.getNode();
      }
    });
  }

  changePage(pageNumber: number) {
    this.loading = true;
    this.app.getChildren(this.id, pageNumber, this.pageSize)
      .then(response => {
        this.node.children = response;
        this.currentPage = pageNumber;
        this.loading = false;
      })
      .catch(error => {
        this.toaster.showToast(error);
        this.loading = false;
      });
  }

  pageSizeChanged(items: number) {
    if (this.pageSize !== items) {
      this.pageSize = items;
      this.pages = Math.ceil(this.node.container_size / this.pageSize);
      this.changePage(1);
      const config = (JSON.parse(localStorage.getItem('otcs-simple')) || {});
      config.pageSize = items;
      localStorage.setItem('otcs-simple', JSON.stringify(config));
    }
  }

  private getNode() {
    let id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      id = environment.start.toString();
    }
    if (!this.id || id !== this.id) {
      this.id = parseInt(id, 10);
      let result: any, pages:number;
      this.app.getNode(this.id)
        .then(response => {
          result = response;
          pages = Math.ceil(result.container_size / this.pageSize);
          return this.app.getChildren(this.id, this.currentPage, this.pageSize);
        })
        .then(response => {
          result.children = response;
          return this.app.getAncestors(this.id);
        })
        .then(response => {
          result.ancestors = (<any[]>response).filter(a => a && a.id !== this.id);
          this.node = result;
          this.pages = pages;
          this.loading = false;
        })
        .catch(error => {
          this.toaster.showToast(error);
          this.loading = false;
        });
    }
    else {
      this.loading = false;
    }
  }

}
