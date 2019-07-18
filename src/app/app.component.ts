import {Component, OnInit, Inject} from '@angular/core';
import {ApexService} from './shared/apex.service';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';
import {Location} from '@angular/common';
import {WINDOW} from './shared/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader: any = false;
  maplocation = [
    '/',
    '/login',
    '/dashboard'
  ];
  path: any;

  constructor(private apexService: ApexService,
              private router: Router,
              private location: Location,
              @Inject(WINDOW) private window: Window) {
    this.onDetectRoute();
  }

  ngOnInit() {
  }

  onDetectRoute() {
    this.router.events.subscribe((event: any) => {
      if ((event instanceof NavigationStart)) {
        this.path = this.location.path();
        let count = this.maplocation.length;
        for (let i = 0; i < this.maplocation.length; i++) {
          if (event.url === this.maplocation[i]) {
            this.showHeader = false;
            i = count++;
          } else {
            this.showHeader = true;
          }
        }
      }
      window.scrollTo(0, 0);
    });
  }
}
