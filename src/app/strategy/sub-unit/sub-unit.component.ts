import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-unit',
  templateUrl: './sub-unit.component.html',
  styleUrls: ['./sub-unit.component.scss']
})
export class SubUnitComponent implements OnInit {

  @Input() Subunit: any;
  isStepOne: boolean;
  isStepTwo: boolean;
  isStepThree: boolean;
  selectedIndex = true;
  missionVisionValues = [{
    slug: 'Mission',
    title: 'Mission',
    content: 'Your Dashboard',
    tab: 'tabOne'
  }, {
    slug: 'Vision',
    title: 'Vision',
    content: 'Dynamic content 1',
    tab: 'tabTwo'
  }, {
    slug: 'Values',
    title: 'Values',
    content: 'Dynamic content 2',
    tab: 'tabThree'
  }];
  constructor() {
    this.showTab('tabOne', 0);

  }

  ngOnInit() {
    console.log(this.Subunit);
  }
  showTab(tab, index) {
    switch (tab) {
      case 'tabOne':
        this.isStepOne = true;
        this.isStepTwo = false;
        this.isStepThree = false;
        break;
      case 'tabTwo':
        this.isStepOne = false;
        this.isStepTwo = true;
        this.isStepThree = false;
        break;
      case 'tabThree':
        this.isStepOne = false;
        this.isStepTwo = false;
        this.isStepThree = true;
        break;
      default:
        this.isStepOne = true;
        this.isStepTwo = false;
        this.isStepThree = false;
        break;
    }
    this.selectedIndex = index;
  }
}
