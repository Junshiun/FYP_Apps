import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

import * as firebase from 'firebase/app';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.css'],
  providers: [AngularFireDatabase]
})

export class NewChartComponent implements OnInit {
  Linechart: Chart;

  dataArray: any[] = [];
  xArray: any[] = [];
  wholedate: string[] = ['order'];
  monthsArray: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  date: string;
  month: string;
  year: string;

  constructor(public db: AngularFireDatabase) {
    const leadsRef =  firebase.database().ref('Data/2020/3/29/Area_01/Node_01/');
    // tslint:disable-next-line: only-arrow-functions
    leadsRef.on('value', (snapshot) => {
      this.dataArray.splice(0, this.dataArray.length);
      this.xArray.splice(0, this.dataArray.length);
        // tslint:disable-next-line: only-arrow-functions
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const childData02 = childSnapshot.key;
        this.dataArray.push(childData);
        this.xArray.push(childData02);
      });
      this.mychart(this.dataArray, this.xArray);
    });
  }

  ngOnInit() {
    /*this.Upload();*/
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.wholedate.splice(0, this.wholedate.length);
    this.wholedate = (`${event.value}`).split(' ', 4);
    console.log(this.wholedate);
    this.date = this.wholedate[2];
    this.month = this.wholedate[1];
    this.month = (this.monthsArray.indexOf(this.month) + 1).toString();
    this.year = this.wholedate[3];
    console.log(this.date + '/' + this.month + '/' + this.year);
  }

  Upload() {
    for (let i = 0; i <= 30; i++) {
      firebase.database().ref('Data/2020/3/29/Area_01/Node_01/' + i).set(1.92 + (i / 30));
    }
  }

  mychart(key, axis) {
    this.Linechart = new Chart('linechart', {
      type: 'line',
      plugins: [ChartAnnotation],
      data: {
        labels: axis,
        datasets: [{
            data: key,
            label: 'Concentration level',
            borderColor: '#3e95cd',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chlorine Gas Concentration (ppm)'
        },
        plugins: {
          annotation: {
              annotations: [
                  {
                    type: 'line',
                    id: 'hLine',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: 1.88,  // data-value at which the line is drawn
                    borderWidth: 4,
                    borderColor: '#3e95cd',
                  }
              ]
          }
        },
      }
    });
  }
}
