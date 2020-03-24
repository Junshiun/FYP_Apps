import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import 'firebase/database';

import { environment } from '../environments/environment';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import 'chartjs-plugin-annotation';
import { ScheduleComponent } from './schedule/schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatButtonToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HomeComponent,
    ScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
