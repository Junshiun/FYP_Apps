import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';

import { Options, LabelType, ChangeContext, PointerType} from 'ng5-slider';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  constructor(db: AngularFireDatabase, private router: Router) {
  }

  value = 2;
  halo = 0;
  DayInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  PeakHourStartTimeArray: any[] = [];
  options: Options = {
    floor: 0,
    ceil: 24,
    scale: 1,
    step: 1,
    showTicks: true,

   translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ':00';
        case LabelType.High:
          return value + ':00';
        default:
          return '' + value;
      }
    }
  };

  ngOnInit() {
    this.GetValue_Firebase();
    this.myprint();
  }

  GetValue_Firebase() {
    this.PeakHourStartTimeArray.splice(0, this.PeakHourStartTimeArray.length);
    for (let i = 0; i < 7; i++) {
      firebase.database().ref('Schedule/Day/' + this.DayInWeek[i] + '/Peak_Hour/Start_Time').on('value', (snapshot) => {
        console.log(snapshot.val());
        this.PeakHourStartTimeArray.splice(i, 1, snapshot.val());
      });
    }
    /*
    this.DayInWeek.forEach(element => {
      firebase.database().ref('Schedule/Day/' + element + '/Peak_Hour/Start_Time').on('value', (snapshot) => {
        console.log(snapshot.val());
        this.PeakHourStartTimeArray.splice(this.PeakHourStartTimeArray.length, 0, snapshot.val());
      });
    });*/
  }

  Testing_01(time: string) {
    /*firebase.database().ref('Node_01/Start_Time').on('value', (snapshot) => {
      console.log(snapshot.val());
      console.log(snapshot.key);
    });*/
    firebase.database().ref('Node_01/End_Time').set(time);
  }

  OperatingTime_Day_Update(time: boolean, one: string) {
    console.log(time);
    console.log(one);
    if (time === true) {
      console.log(1);
    }
    // tslint:disable-next-line: one-line
    else {
    console.log(0);
    }
  }

  Day_PeakHour_Update(day: string, peak: ChangeContext) {
    console.log(day);
    console.log(peak.value);
    console.log(peak.highValue);
    firebase.database().ref('Schedule/Day/' + day + '/Peak_Hour/Start_Time').set(peak.value);
    firebase.database().ref('Schedule/Day/' + day + '/Peak_Hour/End_Time').set(peak.highValue);
  }

  myprint() {
    this.timeout();
    this.halo = this.PeakHourStartTimeArray[0];
    console.log(this.PeakHourStartTimeArray);
  }

  timeout() {
    // tslint:disable-next-line: only-arrow-functions
    setTimeout(function() {
    }, 2000);
  }
}
