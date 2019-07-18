import {Component, OnInit} from '@angular/core';
import {ApexService} from '../shared/apex.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  footerLinks = [
    {id: 1, name: 'Objective Story'},
    {id: 2, name: 'Theme Story'},
    {id: 3, name: 'Initiative Status'},
    {id: 4, name: 'Dashboards'},
    {id: 5, name: 'Action items'},
    {id: 6, name: 'Progress reports'},
  ];
  strategyCards = [
    {id: 1, name: 'STRATEGY', link: '/strategy/overview'},
    {id: 2, name: 'STRATEGY MAP', link: '/strategy/strategyMap'},
    {id: 3, name: 'BSC', link: '/strategy/overview'},
    {id: 4, name: 'ALIGNMENT', link: '/strategy/overview'},
    {id: 5, name: 'INITIATIVES', link: '/strategy/overview'},
    {id: 6, name: 'ACTION ITEMS', link: '/strategy/overview'},
    {id: 6, name: 'STRATEGY REVIEWS', link: '/strategy/overview'},
    {id: 6, name: 'STRATEGY PLANNING', link: '/strategy/overview'},
    {id: 6, name: 'INDUSTRY KPIS', link: '/strategy/overview'}

  ];

  constructor(private apexService: ApexService) {

  }

  ngOnInit() {
  }
}
