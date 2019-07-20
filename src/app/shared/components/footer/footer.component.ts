import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerLinks = [
    {id: 1, name: 'Objective Story'},
    {id: 2, name: 'Theme Story'},
    {id: 3, name: 'Initiative Status'},
    {id: 4, name: 'Dashboards'},
    {id: 5, name: 'Action items'},
    {id: 6, name: 'Progress reports'},

  ];

  constructor() {
  }

  ngOnInit() {
  }

}
