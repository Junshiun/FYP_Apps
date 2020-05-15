import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

import * as firebase from 'firebase/app';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  providers: [AngularFireDatabase]
})
export class CompareComponent implements OnInit {

  Linechart: Chart;

  wholedate: string[] = ['order'];
  monthsArray: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  date: any;
  month: any;
  year: any;

  FromDate: any;
  FromMonth: any;
  FromYear: any;
  ToDate: any;
  ToMonth: any;
  ToYear: any;

  FromThisDate: string;
  ToThisDate: string;

  // tslint:disable-next-line: max-line-length
  dataArray: any[] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  SumData = 0;
  SumDataArray: any[] = [];
  AverageDataArray: any[] = [];
  MaxDataArray: any[] = [];

  From: string;

  // tslint:disable-next-line: max-line-length
  ChartDataAverage: any[] = [];
  ChartDataMax: any[] = [];

  MinDate: Date;
  MaxDate: Date;

  constructor(public db: AngularFireDatabase) {
    this.MinDate = new Date('3/1/2020');
  }

  ngOnInit() {
  }

  thisFunction() {
    this.ChartDataDate();
    this.PromiseFunction();
  }

  async PromiseFunction() {
    const firstpromise = await this.Promise01();
    const secondpromise = await this.Promise02();
  }

  Promise01() {
    return new Promise(resolve => {
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
        resolve();
        }, 3000);
    });
  }

  Promise02() {
    return new Promise(resolve => {
      console.log(this.ChartDataAverage);
      console.log(this.ChartDataMax);
      this.mychart(this.ChartDataAverage, this.ChartDataMax);
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
        resolve();
        }, 1000);
    });
  }

  ChartDataDate() {
    const startdate = new Date(this.FromThisDate);
    const enddate = new Date(this.ToThisDate);
    console.log(startdate);
    for (const i = startdate ; startdate <= enddate; i.setDate(startdate.getDate() + 1)) {
      console.log('round' + i);
      this.month = ((startdate.getMonth() + 1) >= 10) ? (startdate.getMonth() + 1) : (startdate.getMonth() + 1);
      this.date = ((startdate.getDate()) >= 10) ? (startdate.getDate()) : (startdate.getDate());
      this.year = startdate.getFullYear();
      /*
      const mm = ((startdate.getMonth() + 1) >= 10) ? (startdate.getMonth() + 1) : '0' + (startdate.getMonth() + 1);
      const dd = ((startdate.getDate()) >= 10) ? (startdate.getDate()) : '0' + (startdate.getDate());
      const yyyy = startdate.getFullYear();
      const date = dd + '/' + mm + '/' + yyyy;*/

      this.ChartDataNode(this.date, this.month, this.year);
    }
  }

  ChartDataNode(date: any, month: any, year: any) {
    this.dataArray[date].splice(0, this.dataArray[date].length);
    for (let i = 0; i < 3; i++) {
      this.From = ('Data/' + this.year + '/' + this.month + '/' + this.date + '/Node_' + (i + 1));
      const leadsRef =  firebase.database().ref(this.From);
      // tslint:disable-next-line: only-arrow-functions
      leadsRef.on('value', (snapshot) => {
          // tslint:disable-next-line: only-arrow-functions
        snapshot.forEach((childSnapshot) => {
          let childData = childSnapshot.val();
          if (childData === -1) {
            childData = 'null';
            return;
          }
          this.dataArray[date].push(childData);
        });
        this.Calculation(date, month, year);
      });
    }
  }

  Calculation(date: any, month: any, year: any) {
    this.SumDataArray[date] = this.dataArray[date].reduce((a, b) => (a + b), 0);
    this.AverageDataArray[date] = (this.SumDataArray[date] / this.dataArray[date].length).toFixed(2);
    this.MaxDataArray[date] = Math.max.apply(Math, this.dataArray[date]).toFixed(2);
    if (this.dataArray[date].length === 0) {
      this.MaxDataArray[date] = null;
    }
    this.ChartDataAverage[date] = {x: date, y: this.AverageDataArray[date]};
    this.ChartDataMax[date] = {x: date, y: this.MaxDataArray[date]};
  }

  CalendarEvent01(type: string, event: MatDatepickerInputEvent<Date>) {
    this.wholedate.splice(0, this.wholedate.length);
    this.wholedate = (`${event.value}`).split(' ', 4);
    console.log(this.wholedate);
    this.FromDate = this.wholedate[2];
    this.FromMonth = this.wholedate[1];
    this.FromMonth = (this.monthsArray.indexOf(this.FromMonth) + 1).toString();
    this.FromYear = this.wholedate[3];
    this.FromThisDate = this.FromMonth + '/' + this.FromDate + '/' + this.FromYear;
  }

  CalendarEvent02(type: string, event: MatDatepickerInputEvent<Date>) {
    this.wholedate.splice(0, this.wholedate.length);
    this.wholedate = (`${event.value}`).split(' ', 4);
    console.log(this.wholedate);
    this.ToDate = this.wholedate[2];
    this.ToMonth = this.wholedate[1];
    this.ToMonth = (this.monthsArray.indexOf(this.ToMonth) + 1).toString();
    this.ToYear = this.wholedate[3];
    this.ToThisDate = this.ToMonth + '/' + this.ToDate + '/' + this.ToYear;
  }

  mychart(key, key02) {
    if (this.Linechart) {
      this.Linechart.destroy();
    }
    this.Linechart = new Chart('linechart', {
      type: 'scatter',
      plugins: [ChartAnnotation],
      data: {
        datasets: [
          {
            label: 'Average',
            data: key,
            showLine: true,
            fill: false,
            borderColor: 'rgba(0, 200, 0, 1)',
            lineTension: 0
          },
          {
            label: 'Max',
            data: key02,
            showLine: true,
            fill: false,
            borderColor: 'rgba(46, 134, 178)',
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
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: false,
              stepSize: 1,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      }
    });
  }

}
