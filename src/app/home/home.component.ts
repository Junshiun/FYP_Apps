import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';

import { Observable } from 'rxjs';
import { Value } from '../Value/value';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  value: Observable<Value[]>;

  constructor(db: AngularFireDatabase, private router: Router) {
    this.value = db.list('values').valueChanges();
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
}
