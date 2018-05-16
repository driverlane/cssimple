import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarSlim = false;

  constructor() {
    const config = (JSON.parse(localStorage.getItem('otcs-simple')) || {});
    if (config.sidebarSlim) {
      this.sidebarSlim = config.sidebarSlim;
    }
  }

  ngOnInit() {
  }

  toggleNav() {
    this.sidebarSlim = !this.sidebarSlim;
    const config = (JSON.parse(localStorage.getItem('otcs-simple')) || {});
    config.sidebarSlim = this.sidebarSlim;
    localStorage.setItem('otcs-simple', JSON.stringify(config));
  }

}
