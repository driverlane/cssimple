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

  constructor(private app: AppService, private route: ActivatedRoute, private router: Router, private toaster: ToasterService) { }

  ngOnInit() {
    this.getNode(this.route.snapshot);
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.getNode(event.snapshot);
      }
    });
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
          return this.app.getChildren(this.id);
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
