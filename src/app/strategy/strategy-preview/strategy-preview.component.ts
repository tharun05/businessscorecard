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
  orgTree: any = [];

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
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.orgId = params['id'];
      this.getOrganizationById(this.orgId);
    });
    this.getOrganizationTree();
  }

  getOrganizationById(id) {
    this.strategyService.getOrganizationById(id).subscribe((organizationData: any) => {
      if (!!organizationData) {
        this.organizationData = organizationData;
        console.log(this.organizationData);
      }
    });
  }

  getOrganizationTree() {
    this.strategyService.getOrganizationTree().subscribe((orgTree: any) => {
      if (!!orgTree) {
        this.orgTree.push(orgTree);
      }
      console.log(this.orgTree);

    });
  }


  getSubUnitById(id: any) {
    console.log(id);
  }
}
