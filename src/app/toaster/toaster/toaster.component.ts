import { Component, OnInit } from '@angular/core';
import { Toast, ToasterService } from '../toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  toast: Array<Toast> = [];

  constructor(private toaster: ToasterService) { }

  ngOnInit() {
    this.toaster.toast.subscribe(toast => {
      if (toast) {
        this.toast.push(toast);
      }
    });
  }

  removePiece(index: number) {
    this.toast.splice(index, 1);
  }

}
