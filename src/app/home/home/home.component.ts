import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  assignments: any[];
  assignmentsConfig: any = {
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
    this.app.getFavourites()
      .then(response => {
        this.favourites = response;
      })
      .catch(error => {
        delete this.favourites;
        this.toaster.showToast(error);
      });

    this.app.getAssignments()
      .then(response => {
        this.assignments = response;
      })
      .catch(error => {
        delete this.assignments;
        this.toaster.showToast(error);
      });

    this.app.getRecentlyAccessed()
      .then(response => {
        this.recent = response;
      })
      .catch(error => {
        delete this.recent;
        this.toaster.showToast(error);
      });
  }

}
