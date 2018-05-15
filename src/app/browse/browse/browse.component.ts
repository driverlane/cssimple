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
  itemsPerPage = 10;

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
    if (config.itemsPerPage) {
      this.itemsPerPage = config.itemsPerPage;
    }
  }

  changePage(pageNumber: number) {
    console.log('changing page');
    this.currentPage = pageNumber;
    this.app.getChildren(this.id, this.currentPage, this.itemsPerPage)
      .then(response => {
        this.node.children = response;
        this.pages = Math.ceil(this.node.children.length / this.itemsPerPage);
      })
      .catch(error => {
        this.toaster.showToast(error);
        this.loading = false;
      });
  }

  itemsPerPageChanged(items: number) {
    console.log('changed ' + items);
    if (this.itemsPerPage !== items) {
      this.itemsPerPage = items;
      this.changePage(1);
      const config = (JSON.parse(localStorage.getItem('otcs-simple')) || {});
      config.itemsPerPage = items;
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
          return this.app.getChildren(this.id, this.currentPage, this.itemsPerPage);
        })
        .then(response => {
          this.node.children = response;
          this.pages = Math.ceil(this.node.children.length / this.itemsPerPage);
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
