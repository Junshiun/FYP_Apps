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

  // tslint:disable-next-line: max-line-length
  dataArray: any[] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  SumData = 0;
  SumDataArray: any[] = [];
  AverageDataArray: any[] = [];

  From: string;

  constructor(public db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.ChartDataDate();
  }

  ChartDataDate() {
    const startdate = new Date('3/29/2020');
    const enddate = new Date('3/31/2020');
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

      this.ChartDataNode(this.date);
    }
  }

  ChartDataNode(date: any) {
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
        this.Calculation(date);
      });
    }
  }

  Calculation(date: any) {
    console.log(this.dataArray[date]);
    this.SumDataArray[date] = this.dataArray[date].reduce((a, b) => (a + b), 0);
    console.log(this.SumDataArray[date]);
    this.AverageDataArray[date] = (this.SumDataArray[date] / this.dataArray[date].length);
    console.log(this.AverageDataArray[date]);
  }

  CalendarEvent(datepicker: any, type: string, event: MatDatepickerInputEvent<Date>) {
    for ( let i = datepicker; i < datepicker + 1 ; i++ ) {
      this.wholedate.splice(0, this.wholedate.length);
      this.wholedate = (`${event.value}`).split(' ', 4);
      console.log(this.wholedate);
      this.date[i] = this.wholedate[2];
      this.month[i] = this.wholedate[1];
      this.month[i] = (this.monthsArray.indexOf(this.month[i]) + 1).toString();
      this.year[i] = this.wholedate[3];
      console.log(this.date[i] + this.month[i] + this.year[i]);
      console.log(this.date[1] + this.month[1] + this.year[1]);
    }
  }


  mychart(key) {
    if (this.Linechart) {
      this.Linechart.destroy();
    }
    this.Linechart = new Chart('linechart', {
      type: 'line',
      plugins: [ChartAnnotation],
      data: {
        datasets: [
          {
            label: 'Node 1',
            data: [{x: 10, y: 11}, {x: 3, y: 3}],
            showLine: true,
            fill: false,
            borderColor: 'rgba(0, 200, 0, 1)',
            lineTension: 0
          },
          {
            label: 'Node 2',
            data: key,
            showLine: true,
            fill: false,
            borderColor: 'rgba(46, 134, 178)',
            lineTension: 0
          },
          {
            label: 'Node 3',
            data: key,
            showLine: true,
            fill: false,
            borderColor: 'rgba(206, 17, 17)',
            lineTension: 0
          },
        ]
      },
      options: {
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
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
