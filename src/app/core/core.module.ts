import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NodeIconPipe } from './pipes.pipe';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule
  ],
  declarations: [
    HeaderComponent, FooterComponent, NodeIconPipe
  ],
  exports: [
    HeaderComponent, FooterComponent, NodeIconPipe, ReactiveFormsModule, RouterModule
  ]
})
export class CoreModule { }
