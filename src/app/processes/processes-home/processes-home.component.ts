import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processes-home',
  templateUrl: './processes-home.component.html',
  styleUrls: ['./processes-home.component.scss']
})
export class ProcessesHomeComponent implements OnInit {

  assignments: any[];
  initiated: any[];
  managed: any[];

  constructor(private app: AppService, private router: Router, private toaster: ToasterService) { }

  ngOnInit() {
    this.app.getAssignments()
      .then(response => {
        this.assignments = response;
      })
      .catch(error => {
        delete this.assignments;
        this.toaster.showToast(error);
      });
  }

  openLink(node: any) {
    const url = this.app.getNodeLink(node);
    this.router.navigate(url);
  }

}
