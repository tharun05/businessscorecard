import {Component, OnInit} from '@angular/core';
import {ApexService} from '../shared/apex.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apexService: ApexService) {

  }

  ngOnInit() {
  }

  // routeToStrategy() {
  //   this.apexService.sessionUserEmit(true);
  // }

}
