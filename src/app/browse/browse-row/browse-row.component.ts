import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-browse-row',
  templateUrl: './browse-row.component.html',
  styleUrls: ['./browse-row.component.css']
})
export class BrowseRowComponent {

  @Input() node: any;

  constructor() { }

}
