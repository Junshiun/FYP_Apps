import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewChartComponent } from './new-chart/new-chart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Chart', component: ChartComponent},
  {path: 'Schedule', component: ScheduleComponent},
  {path: 'newChart', component: NewChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
