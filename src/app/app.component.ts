import { Component, OnInit } from '@angular/core';
import 'firebase/database';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'myfile';

  constructor(private router: Router) {
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  refresh() {
    location.reload();
  }
}
