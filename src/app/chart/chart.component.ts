import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [AngularFireDatabase]
})

export class ChartComponent implements OnInit {

  Linechart: Chart;

  dataArray: any[] = [];
  xArray: any[] = [];

  constructor(public db: AngularFireDatabase) {
    const leadsRef =  firebase.database().ref('values');
    // tslint:disable-next-line: only-arrow-functions
    leadsRef.on('value', (snapshot) => {
      this.dataArray.splice(0, this.dataArray.length);
      this.xArray.splice(0, this.dataArray.length);
        // tslint:disable-next-line: only-arrow-functions
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val().value;
        const childData02 = childSnapshot.key;
        this.dataArray.push(childData);
        this.xArray.push(childData02);
      });
      this.mychart(this.dataArray, this.xArray);
    });
  }

  ngOnInit() {
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
                    value: 0.5,  // data-value at which the line is drawn
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
