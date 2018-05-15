import { Component, Input, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-browse-pagination',
  templateUrl: './browse-pagination.component.html',
  styleUrls: ['./browse-pagination.component.css']
})
export class BrowsePaginationComponent implements OnChanges {

  @Input() pages;
  @Input() currentPage = 1;
  @Input() itemsPerPage = 10;
  @Output() onItemsPerPageChanged = new EventEmitter<number>();
  @Output() onChangePage = new EventEmitter<number>();

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      items: new FormControl(this.itemsPerPage)
    });
    this.form.valueChanges.subscribe(value => {
      this.onItemsPerPageChanged.emit(value.items);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = new FormGroup({
      items: new FormControl(this.itemsPerPage)
    });
    this.form.valueChanges.subscribe(value => {
      this.onItemsPerPageChanged.emit(value.items);
    });
  }

  changePage(page: number) {
    this.onChangePage.emit(page);
  }

}
