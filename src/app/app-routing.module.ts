import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'browse', loadChildren: './browse/browse.module#BrowseModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsModule' },
  { path: 'processes', loadChildren: './processes/processes.module#ProcessesModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
