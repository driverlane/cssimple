import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

import { ProcessesRoutingModule } from './processes-routing.module';
import { ProcessesHomeComponent } from './processes-home/processes-home.component';
import { AssignmentComponent } from './assignment/assignment.component';

@NgModule({
  imports: [CommonModule, CoreModule, ProcessesRoutingModule],
  declarations: [ProcessesHomeComponent, AssignmentComponent]
})
export class ProcessesModule { }
