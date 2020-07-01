import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewChartComponent } from './new-chart/new-chart.component';
import { CompareComponent } from './compare/compare.component';
import { DateComponent } from './date/date.component';

const routes: Routes = [
  {path: '', component: ScheduleComponent},
  {path: 'Chart', component: ChartComponent},
  {path: 'Schedule', component: ScheduleComponent},
  {path: 'Realtime', component: NewChartComponent},
  {path: 'Compare', component: CompareComponent},
  {path: 'Date', component: DateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
