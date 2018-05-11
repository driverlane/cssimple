import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from '../toaster.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() piece: Toast
  @Output() removed: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.piece) {
      if (this.piece.expiry) {
        setTimeout(() => {
          this.removed.emit();
        }, this.piece.expiry);
      }
      this.piece.message = this.piece.message.startsWith('Error: ') ? this.piece.message.substr(7) : this.piece.message;
    }
  }

  removePiece() {
    this.removed.emit();
  }

}
