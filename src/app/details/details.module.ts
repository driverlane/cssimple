import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [CommonModule, CoreModule, DetailsRoutingModule],
  declarations: [DetailsComponent]
})
export class DetailsModule { }
