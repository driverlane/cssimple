import { Component } from '@angular/core';
import { environment } from '../environments/environment'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
<div class="app-container">
  <div class="app-header">
    <app-header></app-header>
  </div>
  <div class="app-body">
    <app-toaster></app-toaster>
    <div class="sidebar-wrapper is-hidden-touch">
      <app-sidebar></app-sidebar>
    </div>
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
  </div>
  <div class="app-footer">
    <app-footer></app-footer>
  </div>
</div>`
})

export class AppComponent {

  constructor(private title: Title) {
    this.title.setTitle(environment.title);
  }

}
