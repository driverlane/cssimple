import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd } from '@angular/router';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  loading = true;
  id: any;
  node: any;

  pages = 1;
  currentPage = 1
  pageSize = 10;

  constructor(private app: AppService, private route: ActivatedRoute, private router: Router, private toaster: ToasterService) { }

  ngOnInit() {
    this.getNode(this.route.snapshot);
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.currentPage = 1;
        this.getNode(event.snapshot);
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

  private getNode(route: ActivatedRouteSnapshot) {
    this.id = route.paramMap.get('id');
    if (!this.id) {
      this.id = environment.start;
    }
    if (this.id) {
      this.id = parseInt(this.id, 10);
      this.app.getNode(this.id)
        .then(response => {
          this.node = response;
          this.pages = Math.ceil(this.node.container_size / this.pageSize);
          return this.app.getChildren(this.id, this.currentPage, this.pageSize);
        })
        .then(response => {
          this.node.children = response;
          return this.app.getAncestors(this.id)
        })
        .then(response => {
          this.node.ancestors = (<any[]>response).filter(a => a.id !== this.id);
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
