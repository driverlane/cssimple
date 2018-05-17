import { Component, OnInit } from '@angular/core';

import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-processes-home',
  templateUrl: './processes-home.component.html',
  styleUrls: ['./processes-home.component.scss']
})
export class ProcessesHomeComponent implements OnInit {

  tasks: any[];
  tasksConfig: any = {
    isRaised: true,
    title: 'My tasks',
    headerIcon: 'fa-tasks',
    headerStyle: 'is-link',
    noItemsMessage: 'No tasks available'
  };

  initiated: any[];
  initiatedConfig: any = {
    isRaised: true,
    title: 'Initiated jobs',
    headerIcon: 'fa-map',
    headerStyle: 'is-success',
    noItemsMessage: 'No initiated jobs available'
  };

  managed: any[];
  managedConfig: any = {
    isRaised: true,
    title: 'Managed jobs',
    headerIcon: 'fa-map',
    headerStyle: 'is-warning',
    noItemsMessage: 'No managed jobs available'
  };

  constructor(private app: AppService, private toaster: ToasterService) { }

  ngOnInit() {
    this.app.tasks.subscribe(a => this.tasks = a);
    this.app.refreshTasks();
    this.app.initiatedJobs.subscribe(a => this.initiated = a);
    this.app.refreshInitiatedJobs();
    this.app.managedJobs.subscribe(a => this.managed = a);
    this.app.refreshManagedJobs();
  }

}
