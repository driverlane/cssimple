import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-pagination',
  templateUrl: './browse-pagination.component.html',
  styleUrls: ['./browse-pagination.component.css']
})
export class BrowsePaginationComponent implements OnInit {

  @Input() pages = 1;
  @Input() currentPage = 1;

  constructor() { }

  ngOnInit() {
  }

}
