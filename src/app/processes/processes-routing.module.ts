import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentComponent } from './assignment/assignment.component';
import { ProcessesHomeComponent } from './processes-home/processes-home.component';

const routes: Routes = [
  { path: '', component: ProcessesHomeComponent },
  { path: 'assignment/:workflowId/:subworkflowId/:taskId', component: AssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
