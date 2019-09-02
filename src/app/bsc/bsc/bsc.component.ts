import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BscService} from '../bsc.service';
import {StrategyService} from '../../strategy/strategy.service';
import {AppService} from '../../shared/app.service';
import {EmitterService} from '../../shared/emitter.service';

@Component({
  selector: 'app-bsc',
  templateUrl: './bsc.component.html',
  styleUrls: ['./bsc.component.scss']
})
export class BscComponent implements OnInit {
  codeAndName: any;
  orgName: any;
  perspectiveType = 'radioOpt1';
  bscId: any;

  constructor(private formBuilder: FormBuilder,
              private bscService: BscService,
              private strategyService: StrategyService,
              private toastrService: ToastrService,
              private router: Router,
              private appService: AppService,
              private emitterService: EmitterService) {
  }

  bscForm = this.formBuilder.group({
    orgCode: [''],
    orgName: [''],
    code: [''],
    name: [''],
    discription: [''],
    tag: [''],
    defaultPerspectives: [''],
  });

  projType = [
    {id: 1, name: 'New Project With 4 Perspective', type: 'radio', option: 'radioOpt1'},
    {id: 2, name: 'Empty Project', type: 'radio', option: 'radioOpt2'},
    {id: 3, name: 'Strategy Wizard', type: 'radio', option: 'radioOpt3'},
  ];

  getOrgUnitCode() {
    this.strategyService.getCodeAndName().subscribe((codes) => {
      this.codeAndName = codes;
    });
  }

  getCodeNameForPestal() {
    this.codeAndName.forEach((val, key) => {
      if (this.bscForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.bscForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  ngOnInit() {
    this.getOrgUnitCode();
  }

  saveBalanceScoreCard() {
    if (!!this.bscId) {
      this.bscService.UpdateBalanceScoreCard(this.bscId).subscribe((data: any) => {
        this.toastrService.success('Updated Successfully');
      });
    } else {
      this.bscService.saveBalanceScoreCard(this.bscForm.value).subscribe((data: any) => {
        this.toastrService.success('Added Successfully');
        this.bscId = data.id;
        const event = {
          target: {value: 'radioOpt1'}
          // this.projectType(event);
        };
      });
    }
  }

  projectType(event: any) {
    switch (event) {
      case 'radioOpt1':
        this.router.navigate(['/bsc/perspective'], {queryParams: {defaultProjType: true}});
        this.emitterService.broadcastemptyProj(true);
        break;
      case 'radioOpt2':
        this.emitterService.broadcastemptyProj(true);
        this.appService.navigate('/bsc/perspective', null);
        break;
      case 'radioOpt3':
        console.log('3');
        break;
      default:
        console.log('4');
    }
  }
}
