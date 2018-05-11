import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ToasterComponent, ToastComponent],
  exports: [ToasterComponent]
})
export class ToasterModule { }
