import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

import * as firebase from 'firebase/app';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [AngularFireDatabase]
})

export class DateComponent implements OnInit {

  Linechart02: Chart;

  dataArray: any[] = [[{}], [{}], [{}]];
  dataArray02: any[] = [[{}], [{}], [{}]];
  wholedate: string[] = ['order'];
  monthsArray: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  date: string;
  month: string;
  year: string;

  ReadThis: any;

  condition: true;

  NodeArray1: any[] = [1, 2];
  NodeArray2: any[] = [3, 4];
  NodeArray: any[] = [this.NodeArray2, this.NodeArray1];

  MinDate: Date;

  constructor(public db: AngularFireDatabase) {
    this.MinDate = new Date('3/1/2020');
  }

  ngOnInit() {
  }

  OnCheck() {
    this.checkforupdate02();
  }

  CalendarEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.wholedate.splice(0, this.wholedate.length);
    this.wholedate = (`${event.value}`).split(' ', 4);
    console.log(this.wholedate);
    this.date = this.wholedate[2];
    if (this.date.charAt(0) === '0') {
      this.date = this.date.slice(1);
    }
    this.month = this.wholedate[1];
    this.month = (this.monthsArray.indexOf(this.month) + 1).toString();
    this.year = this.wholedate[3];
    console.log(this.date + '/' + this.month + '/' + this.year);
  }
  checkforupdate02() {
    for (let i = 0; i < 3; i++) {
      this.ReadThis = ('Data/' + this.year + '/' + this.month + '/' + this.date + '/Node_' + (i + 1));
      const leadsRef =  firebase.database().ref(this.ReadThis);
      // tslint:disable-next-line: only-arrow-functions
      leadsRef.on('value', (snapshot) => {
        this.dataArray02[i].splice(0, this.dataArray02[i].length);
          // tslint:disable-next-line: only-arrow-functions
        snapshot.forEach((childSnapshot) => {
          let childData = childSnapshot.val();
          if (childData === -1) {
            childData = 'null';
          }
          const childData02 = childSnapshot.key;
          this.dataArray02[i].push({x: childData02, y: childData});
        });
        this.mychart(this.dataArray02);
      });
    }
  }

  mychart(key) {
    if (this.Linechart02) {
      this.Linechart02.destroy();
    }
    this.Linechart02 = new Chart('linechart02', {
      type: 'scatter',
      plugins: [ChartAnnotation],
      data: {
        datasets: [
          {
            label: 'Node 1',
            data: key[0],
            showLine: true,
            fill: false,
            borderColor: 'rgba(0, 200, 0, 1)',
            borderWidth: 0.5,
            pointRadius: 0,
            lineTension: 0
          },
          {
            label: 'Node 2',
            data: key[1],
            showLine: true,
            fill: false,
            borderColor: 'rgba(46, 134, 178)',
            borderWidth: 0.5,
            pointRadius: 0,
            lineTension: 0
          },
          {
            label: 'Node 3',
            data: key[2],
            showLine: true,
            fill: false,
            borderColor: 'rgba(206, 17, 17)',
            borderWidth: 0.5,
            pointRadius: 0,
            lineTension: 0
          },
        ]
      },
      options: {
        annotation: {
            annotations: [
                {
                  type: 'line',
                  mode: 'horizontal',
                  scaleID: 'y-axis-1',
                  value: 1,  // data-value at which the line is drawn
                  borderWidth: 2,
                  borderColor: 'red',
                }
            ]
        },
        /*
        tooltips: {
          mode: 'index',
          intersect: false,
        },*/
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Concentration of Cl2 gas (ppm)'
            },
            ticks: {
              beginAtZero: false
            }
          }],
          xAxes: [{
            type: 'time',
            time: {
              parser: 'HH:mm:ss',
              tooltipFormat: 'HH:mm',
              unit: 'second',
              stepSize: 1800,
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Time'
            }
         }],
        },
      } as ChartOptions
    });
  }

}
