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
  mergeArrays: any = [];
  orgTree: any = [];
  getById: any;
  noContentFound: string;
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
  // tree = [{
  //   code: 'F100',
  //   name: 'My parent departmen',
  //   children: [
  //     {
  //       code: 'G100',
  //       name: 'My dept',
  //       children: [
  //         {
  //           code: 'H100',
  //           name: 'My child dept',
  //           children: [{name: 'tharun'}]
  //         },
  //         {
  //           code: 'H101',
  //           name: 'My child dept',
  //           children: [{name: 'tharun'}]
  //         }
  //
  //       ]
  //     },
  //     {
  //       code: 'G101',
  //       name: 'My department',
  //       children: [{name: 'arun'}]
  //     }
  //
  //   ]
  // }];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private strategyService: StrategyService) {
    this.showTab('tabOne', 0);
  }

  ngOnInit() {
    this.getOrganizationTree();
    this.activatedRoute.queryParams.subscribe(params => {
      this.orgId = params['id'];
      if (!!this.orgId) {
        this.getOrganizationById(this.orgId);
      }
    });
  }

  getOrganizationById(id) {
    this.strategyService.getOrganizationById(id).subscribe((organizationData: any) => {
      if (!!organizationData) {
        this.organizationData = organizationData;
      }

    });
  }

  getOrganizationTree() {
    const self = this;
    this.strategyService.getOrganizationTree().subscribe((orgTree: any) => {
      if (!!orgTree) {
        this.orgTree.push(orgTree);
        this.orgTree.forEach(function (val) {
          val.children.forEach(function (children, i) {
            if (children.children.length) {
              self.mergeArrays.push(children.children);
              if (self.mergeArrays[0][0].id) {
                self.getById = self.mergeArrays[0][0].id;
                // self.getSubUnitById(self.getById);
              } else {
                self.noContentFound = 'Please Add an Organization';
              }
            }
          });
        });
      }
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

  getSubUnitById(id: any) {
    this.strategyService.getSubUnitById(id).subscribe((data: any) => {
      this.organizationData = data;
    });
  }

  editOrganization() {
    this.router.navigate(['/strategy/corporateStructure'], {queryParams: {id: this.organizationData.id}});
  }

  addOrganization() {
    this.router.navigate(['/strategy/corporateStructure'], {queryParams: {id: null}});
  }


}
