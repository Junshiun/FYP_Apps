import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewChartComponent } from './new-chart/new-chart.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  {path: '', component: ScheduleComponent},
  {path: 'Chart', component: ChartComponent},
  {path: 'Schedule', component: ScheduleComponent},
  {path: 'Daily', component: NewChartComponent},
  {path: 'Compare', component: CompareComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
