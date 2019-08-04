import {Component, OnInit} from '@angular/core';
import {ApexService} from '../../apex.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerSubsciption: any;
  showHeader: any;
  linkActiveIndex: any;
  headerLinks = [
    {
      id: 1,
      name: 'strategy',
      link: '/strategy/overview',
      children: [{id: 1, name: 'Overview', route: '/strategy/overview', class: 'active'},
        {id: 2, name: 'Corporate Structure', route: '/strategy/corporateStructure'},
        {id: 3, name: 'Strategry Analysis', route: '/strategy/strategyAnalysis'},
        {id: 3, name: 'Strategry Projection', route: '/strategy/strategyProjection'},
        {id: 4, name: 'Value Gap', route: '/strategy/valueGap'},
        {id: 5, name: 'Value Gap Closer', route: '/strategy/valueGapCloser'}]
    },
    {
      id: 2,
      name: 'strategyMap',
      link: '/strategy/overview',
      children: [{id: 1, name: 'Overview', route: '/strategy/overview', class: 'active'},
        {id: 2, name: 'Corporate Structure', route: '/strategy/corporateStructure'},
        {id: 3, name: 'Strategry Analysis', route: '/strategy/strategyAnalysis'},
        {id: 4, name: 'Value Gap', route: '/strategy/valuegap'},
        {id: 5, name: 'Value Gap Closer', route: '/strategy/valuegapCloser'}]
    }];

  constructor(private apexService: ApexService) {
  }

  ngOnInit() {
    this.headerSubsciption = this.apexService.sessionUserEvent().subscribe(data => {
      this.showHeader = data;
    });
  }

  activeLink(id: any, i) {
    this.linkActiveIndex = i;
    // this.headerLinks.forEach(function (elem) {
    //   elem.children.forEach(function (elem) {
    //     this.linkActive = elem.id;
    //   });
    // });
  }
}
