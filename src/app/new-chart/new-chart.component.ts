import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
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

  dataArray: any[] = [[{}], [{}], [{}]];
  dataArray02: any[] = [[{}], [{}], [{}]];
  wholedate: string[] = ['order'];
  monthsArray: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  date: string;
  month: string;
  year: string;

  Current: any;

  CurrentYear: any;
  CurrentMonth: any;
  CurrentDate: any;

  condition: true;

  NodeArray1: any[] = [1, 2];
  NodeArray2: any[] = [3, 4];
  NodeArray: any[] = [this.NodeArray2, this.NodeArray1];

  MinDate: Date;

  constructor(public db: AngularFireDatabase) {
    this.MinDate = new Date('3/1/2020');
    this.checkforupdate();
  }

  ngOnInit() {
    this.thisFunction();
    this.Upload();
  }

  /*
  test01() {
    console.log('Entered first function');
    return new Promise(resolve => {
      firebase.database().ref('Current_Time').on('value', (snapshot) => {
        this.CurrentYear = snapshot.val().Year;
        this.CurrentMonth = snapshot.val().Month;
        this.CurrentDate = snapshot.val().Date;
      });
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
      resolve('\t\t This is first promise');
      console.log('Returned first promise');
      }, 2000);
    });
  }

  test02() {
    console.log('Entered second function');
    console.log(this.CurrentYear);
    return new Promise(resolve => {
        // tslint:disable-next-line: only-arrow-functions
        setTimeout(function() {
        resolve('\t\t This is second promise');
        console.log('Returned second promise');
        }, 2000);
    });
  }

  async test03() {
    console.log('async function called');
    const firstpromise = await this.test01();
    console.log('After awaiting for 2 seconds,' + 'the promise returned from first function is:');
    console.log(firstpromise);
    const secondpromise = await this.test02();
    console.log('After awaiting for 4 seconds, the' + 'promise returned from second function is:');
    console.log(secondpromise);
  }*/

  checkforupdate() {
    for (let i = 0; i < 3; i++) {
      this.Current = ('Data/' + this.CurrentYear + '/' + this.CurrentMonth + '/' + this.CurrentDate + '/Node_' + (i + 1));
      const leadsRef =  firebase.database().ref(this.Current);
      // tslint:disable-next-line: only-arrow-functions
      leadsRef.on('value', (snapshot) => {
        this.dataArray[i].splice(0, this.dataArray[i].length);
          // tslint:disable-next-line: only-arrow-functions
        snapshot.forEach((childSnapshot) => {
          let childData = childSnapshot.val();
          if (childData === -1) {
            childData = 'null';
          }
          const childData02 = childSnapshot.key;
          this.dataArray[i].push({x: childData02, y: childData});
        });
        this.mychart(this.dataArray);
      });
    }
    console.log(this.dataArray);
  }

  checkforupdate02() {
    for (let i = 0; i < 3; i++) {
      this.Current = ('Data/' + this.year + '/' + this.month + '/' + this.date + '/Node_' + (i + 1));
      const leadsRef =  firebase.database().ref(this.Current);
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

  async thisFunction() {
    const firstpromise = await this.Promise01();
    const secondpromise = await this.Promise02();
    const thirdpromise = await this.Promise03(this.dataArray);
    const fourthpromise = await this.Promise04();
  }

  CalendarEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.wholedate.splice(0, this.wholedate.length);
    this.wholedate = (`${event.value}`).split(' ', 4);
    console.log(this.wholedate);
    this.date = this.wholedate[2];
    this.month = this.wholedate[1];
    this.month = (this.monthsArray.indexOf(this.month) + 1).toString();
    this.year = this.wholedate[3];
    console.log(this.date + '/' + this.month + '/' + this.year);
  }

  OnCheck() {
    this.checkforupdate02();
  }

  Upload() {
    for (let i = 0; i <= 30; i++) {
      firebase.database().ref('Data/2020/3/30/Node_1/' + i).set(1.91 + (0.04 * i));
      firebase.database().ref('Data/2020/3/30/Node_3/' + i).set(1.50 + (0.03 * i));
    }
  }

  Promise01() {
    return new Promise(resolve => {
      this.GetFromFirebase01();
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
        resolve();
        }, 2000);
    });
  }

  Promise02() {
    return new Promise(resolve => {
      this.GetFromFirebase02();
      console.log(this.dataArray);
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
        resolve(this.dataArray);
        }, 1000);
    });
  }

  Promise03(secondpromise) {
    return new Promise(resolve => {
      this.mychart(secondpromise);
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
        resolve();
        this.condition = true;
        }, 1000);
    });
  }

  Promise04() {
    return new Promise(resolve => {
      this.checkforupdate();
      // tslint:disable-next-line: only-arrow-functions
      resolve();
    });
  }

  GetFromFirebase01() {
    firebase.database().ref('Current_Time').on('value', (snapshot) => {
      this.CurrentYear = snapshot.val().Year;
      this.CurrentMonth = snapshot.val().Month;
      this.CurrentDate = snapshot.val().Date;
    });
  }

  GetFromFirebase02() {
    for ( let i = 0; i < 3; i++) {
      this.Current = ('Data/' + this.CurrentYear + '/' + this.CurrentMonth + '/' + this.CurrentDate + '/Node_' + (i + 1));
      const leadsRef =  firebase.database().ref(this.Current);
      // tslint:disable-next-line: only-arrow-functions
      leadsRef.on('value', (snapshot) => {
        this.dataArray[i].splice(0, this.dataArray[i].length);
          // tslint:disable-next-line: only-arrow-functions
        snapshot.forEach((childSnapshot) => {
          let childData = childSnapshot.val();
          if (childData === -1) {
            childData = 'null';
          }
          const childData02 = childSnapshot.key;
          this.dataArray[i].push({x: childData02, y: childData});
        });
        /*this.mychart(this.dataArray);*/
      });
    }
  }

  mychart(key) {
    if (this.Linechart) {
      this.Linechart.destroy();
    }
    this.Linechart = new Chart('linechart', {
      type: 'scatter',
      plugins: [ChartAnnotation],
      data: {
        datasets: [
          {
            label: 'Node 1',
            data: key[0].slice(-180),
            showLine: true,
            fill: false,
            borderColor: 'rgba(0, 200, 0, 1)',
            lineTension: 0
          },
          {
            label: 'Node 2',
            data: key[1].slice(-180),
            showLine: true,
            fill: false,
            borderColor: 'rgba(46, 134, 178)',
            lineTension: 0
          },
          {
            label: 'Node 3',
            data: key[2].slice(-180),
            showLine: true,
            fill: false,
            borderColor: 'rgba(206, 17, 17)',
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
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      } as ChartOptions
    });
  }

}
