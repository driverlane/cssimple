import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-actions',
  templateUrl: './browse-actions.component.html',
  styleUrls: ['./browse-actions.component.css']
})
export class BrowseActionsComponent implements OnInit {

  @Input() node: any;

  view = false;
  viewTypes = [144]
  edit = false;
  editTypes = [144]
  emailLink = true;

  constructor() { }

  ngOnInit() {
    if (this.viewTypes.includes(this.node.type)) {
      this.view = true;
    }
  }

  addEmailLink() {
    event.stopPropagation();
    console.log(this.node);
  }

  editNode() {
    event.stopPropagation();
  }

  viewNode() {
    event.stopPropagation();
  }

}
