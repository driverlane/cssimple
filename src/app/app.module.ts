import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { OtcsModule } from './otcs/otcs.module';
import { ToasterModule } from './toaster/toaster.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, CoreModule, OtcsModule, ToasterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
