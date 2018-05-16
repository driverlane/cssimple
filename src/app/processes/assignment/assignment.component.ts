import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  loading = true;

  workflowId: number;
  subworkflowId: number;
  taskId: number;
  assignment: any;

  constructor(private app: AppService, private route: ActivatedRoute, private toaster: ToasterService) { }

  ngOnInit() {
    this.workflowId = parseInt(this.route.snapshot.paramMap.get('workflowId'), 10);
    this.subworkflowId = parseInt(this.route.snapshot.paramMap.get('subworkflowId'), 10);
    this.taskId = parseInt(this.route.snapshot.paramMap.get('taskId'), 10);
    // todo: work out what API call needed
    this.assignment = {};
    this.loading = false;
  }

}
