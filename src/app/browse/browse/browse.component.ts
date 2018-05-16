import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd } from '@angular/router';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
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
    this.getNode();
    this.routeEvents = this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.currentPage = 1;
        this.getNode();
      }
    });
    const config = (JSON.parse(localStorage.getItem('otcs-simple')) || {});
    if (config.pageSize) {
      this.pageSize = config.pageSize;
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.app.getChildren(this.id, this.currentPage, this.pageSize)
      .then(response => this.node.children = response)
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
      this.app.getNode(this.id)
        .then(response => {
          this.node = response;
          this.pages = Math.ceil(this.node.container_size / this.pageSize);
          return this.app.getChildren(this.id, this.currentPage, this.pageSize);
        })
        .then(response => {
          this.node.children = response;
          return this.app.getAncestors(this.id);
        })
        .then(response => {
          this.node.ancestors = (<any[]>response).filter(a => a && a.id !== this.id);
          this.loading = false;
          console.log(this.node);
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
