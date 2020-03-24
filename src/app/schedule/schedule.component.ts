import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { Value } from '../Value/value';

import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  value: Observable<Value[]>;
  ngModel: boolean;

  constructor(db: AngularFireDatabase, private router: Router) {
  }

  ngOnInit() {
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

}
