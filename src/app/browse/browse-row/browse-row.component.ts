import { Component, Input } from '@angular/core';
import { AppService } from '../../core/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-row',
  templateUrl: './browse-row.component.html',
  styleUrls: ['./browse-row.component.css']
})
export class BrowseRowComponent {

  @Input() node: any;

  constructor(private app: AppService, private router: Router) { }

  openLink(node: any) {
    const url = this.app.getNodeLink(node);
    this.router.navigate(url);
  }

}
