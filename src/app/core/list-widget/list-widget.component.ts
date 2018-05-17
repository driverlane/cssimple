import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AppService } from '../app.service';

@Component({
  selector: 'app-list-widget',
  templateUrl: './list-widget.component.html',
  styleUrls: ['./list-widget.component.css']
})
export class ListWidgetComponent implements OnChanges {

  @Input() config: any;
  @Input() items: any[];

  loading = true;

  constructor(private app: AppService, private router: Router, ) {
    setTimeout(() => {
      this.loading = false;
    }, environment.widgetTimeout);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.loading = this.items ? false : true;
    }
  }

  openLink(node: any) {
    const url = this.app.getNodeLink(node);
    this.router.navigate(url);
  }

}
