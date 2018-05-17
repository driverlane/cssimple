import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: any[];
  tasksConfig: any = {
    isRaised: true,
    title: 'My tasks',
    headerIcon: 'fa-tasks',
    headerStyle: 'is-link',
    noItemsMessage: 'No tasks available'
  };

  favourites: any[];
  favouritesConfig: any = {
    isRaised: true,
    title: 'Favourites',
    headerIcon: 'fa-star',
    headerStyle: 'is-success',
    noItemsMessage: 'No favourites available'
  };

  recent: any[];
  recentConfig: any = {
    isRaised: true,
    title: 'Recent',
    headerIcon: 'fa-clock',
    headerStyle: 'is-warning',
    noItemsMessage: 'No recent items available'
  };

  constructor(private app: AppService, private toaster: ToasterService) { }

  ngOnInit() {
    this.app.favourites.subscribe(a => this.favourites = a);
    this.app.refreshFavourites();

    this.app.tasks.subscribe(a => this.tasks = a);
    this.app.refreshTasks();

    this.app.accessed.subscribe(a => this.recent = a);
    this.app.refreshedAccessed();
  }

}
