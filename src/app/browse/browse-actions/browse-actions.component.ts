import { Component, Input, OnInit } from '@angular/core';
import { ToasterService, Toast } from '../../toaster/toaster.service';

@Component({
  selector: 'app-browse-actions',
  templateUrl: './browse-actions.component.html',
  styleUrls: ['./browse-actions.component.css']
})
export class BrowseActionsComponent implements OnInit {

  @Input() node: any;

  constructor(private toaster: ToasterService) { }

  ngOnInit() { }

  showMenu() {
    event.stopPropagation();
  }

  copyEmailLink() {
    event.stopPropagation();
    // todo: build the link address
    this.toaster.showToast(new Toast({message: 'Link copied to your clipboard', status: 'is-success', expiry: 1000 }));
  }

}
