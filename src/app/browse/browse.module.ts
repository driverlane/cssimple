import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

import { BrowseComponent } from './browse/browse.component';
import { BrowseRoutingModule } from './browse-routing.module';

@NgModule({
  imports: [CommonModule, CoreModule, BrowseRoutingModule],
  declarations: [BrowseComponent]
})
export class BrowseModule { }
