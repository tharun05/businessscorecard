import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StrategyService} from '../strategy.service';

@Component({
  selector: 'app-strategy-preview',
  templateUrl: './strategy-preview.component.html',
  styleUrls: ['./strategy-preview.component.scss']
})
export class StrategyPreviewComponent implements OnInit {
  isStepOne: boolean;
  isStepTwo: boolean;
  isStepThree: boolean;
  selectedIndex = true;
  organizationData: any;
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
  orgId: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private strategyService: StrategyService) {
    this.showTab('tabOne', 0);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.orgId = params['id'];
      this.getOrganizationById(this.orgId);
    });
  }

  getOrganizationById(id) {
    this.strategyService.getOrganizationById(id).subscribe((organizationData: any) => {
      this.organizationData = organizationData;
      console.log(this.organizationData);
    });
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
