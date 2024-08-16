import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DramaTrackerComponent } from './drama-tracker/drama-tracker.component';

const routes: Routes = [
  { path: '', redirectTo: '/drama-tracker', pathMatch: 'full' }, // Default route
  { path: 'drama-tracker', component: DramaTrackerComponent },
  // Add other routes here if you have any
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
