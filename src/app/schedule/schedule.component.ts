import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';

import { Options, LabelType, ChangeContext } from 'ng5-slider';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  constructor(private router: Router, db: AngularFireDatabase) {
    this.GetValue_Firebase();
  }

  hide = [true, true, true, true, true, true, true];
  hide02 = [true, true, true, true, true, true, true];
  DayInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  OperationHourStartTimeArray: any[] = [];
  OperationHourEndTimeArray: any[] = [];
  PeakHourStartTimeArray: any[] = [];
  PeakHourEndTimeArray: any[] = [];
  values = 23;
  options: Options = {
    floor: 0,
    ceil: 24,
    scale: 1,
    step: 1,
    showTicks: true,
    showSelectionBar: true,
    getLegend: (value: number): string => {
      return value + '';
    },

   translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '';
        default:
          return '';
      }
    }
  };

  toggleDisplay(day: number) {
    this.hide[day] = !this.hide[day];
  }

  toggleDisplay02(day: number) {
    this.hide02[day] = !this.hide02[day];
  }

  ngOnInit() {
    this.myprint();
  }

  GetValue_Firebase() {
    this. OperationHourStartTimeArray.splice(0, this. OperationHourStartTimeArray.length);
    for (let i = 0; i < 7; i++) {
      firebase.database().ref('Schedule/Day/' + this.DayInWeek[i] + '/Operation_Hour/Start_Time').on('value', (snapshot) => {
        console.log(snapshot.val());
        this. OperationHourStartTimeArray.splice(i, 1, snapshot.val());
      });
    }

    this. OperationHourEndTimeArray.splice(0, this. OperationHourEndTimeArray.length);
    for (let i = 0; i < 7; i++) {
      firebase.database().ref('Schedule/Day/' + this.DayInWeek[i] + '/Operation_Hour/End_Time').on('value', (snapshot) => {
        console.log(snapshot.val());
        this. OperationHourEndTimeArray.splice(i, 1, snapshot.val());
      });
    }

    this.PeakHourStartTimeArray.splice(0, this.PeakHourStartTimeArray.length);
    for (let i = 0; i < 7; i++) {
      firebase.database().ref('Schedule/Day/' + this.DayInWeek[i] + '/Peak_Hour/Start_Time').on('value', (snapshot) => {
        console.log(snapshot.val());
        this.PeakHourStartTimeArray.splice(i, 1, snapshot.val());
      });
    }

    this.PeakHourEndTimeArray.splice(0, this.PeakHourEndTimeArray.length);
    for (let i = 0; i < 7; i++) {
      firebase.database().ref('Schedule/Day/' + this.DayInWeek[i] + '/Peak_Hour/End_Time').on('value', (snapshot) => {
        console.log(snapshot.val());
        this.PeakHourEndTimeArray.splice(i, 1, snapshot.val());
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

  Day_OperationHour_Update(day: string, peak: ChangeContext) {
    console.log(day);
    console.log(peak.value);
    console.log(peak.highValue);
    firebase.database().ref('Schedule/Day/' + day + '/Operation_Hour/Start_Time').set(peak.value);
    firebase.database().ref('Schedule/Day/' + day + '/Operation_Hour/End_Time').set(peak.highValue);
  }

  myprint() {
    this.timeout();
    console.log(this.PeakHourStartTimeArray);
  }

  timeout() {
    // tslint:disable-next-line: only-arrow-functions
    setTimeout(function() {
    }, 3000);
  }
}
