import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NodeIconPipe } from './pipes.pipe';
import { ListWidgetComponent } from './list-widget/list-widget.component';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule
  ],
  declarations: [
    HeaderComponent, FooterComponent, NodeIconPipe, ListWidgetComponent
  ],
  exports: [
    HeaderComponent, FooterComponent, NodeIconPipe, ReactiveFormsModule, RouterModule, ListWidgetComponent
  ]
})
export class CoreModule { }
