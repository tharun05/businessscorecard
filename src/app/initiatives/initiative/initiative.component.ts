import {Component, OnInit} from '@angular/core';
import {InitiativeService} from '../initiative.service';
import {StrategyService} from '../../strategy/strategy.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {BscService} from '../../bsc/bsc.service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Options} from 'ng5-slider';


@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit {
  codeAndName: any;
  orgName: any;
  codeName: any;
  balanceScoreCardData: any;
  minDate: Date;
  maxDate: Date;
  colorTheme = 'theme-blue';
  bsConfig: Partial<BsDatepickerConfig>;
  marked: false;

  currencyUnit = [
    {id: 1, type: 'USD'},
    {id: 1, type: 'GBP'},
    {id: 1, type: 'INR'},
  ];

  reportingFrequency = [
    {id: 1, frequency: 'WEEKLY'},
    {id: 2, frequency: 'DAILY'},
    {id: 3, frequency: 'YEARLY'},
    {id: 3, frequency: 'MONTHLY'},
    {id: 3, frequency: 'QUATERLY'},
    {id: 3, frequency: 'HOURLY'},
  ];

  options: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 10},
      {value: 20},
      {value: 30},
      {value: 40},
      {value: 50},
      {value: 60},
      {value: 70},
      {value: 80},
      {value: 90},
      {value: 100}
    ]
  };

  constructor(private initiativeService: InitiativeService,
              private formBuilder: FormBuilder,
              private bscService: BscService,
              private strategyService: StrategyService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsConfig = Object.assign({}, {containerClass: this.colorTheme});
  }

  initiativeForm = this.formBuilder.group({
    orgCode: [''],
    orgName: [''],
    scCode: [''],
    scName: [''],
    code: [''],
    name: [''],
    description: [''],
    durationInHours: [''],
    durationInDays: [''],
    reportingFrequency: [''],
    budget: [''],
    currencyType: [''],
    plannedMajorExpenditure: [''],
    owner: [''],
    attachmentUrls: [''],
    analysis: [''],
    recommendations: [''],
    startDate: [''],
    endDate: [''],
    status: [''],
    percentComplete: [''],
    completed: [''],
    completionDate: ['']
  });

  ngOnInit() {
    this.getOrgUnitCode();
    this.getBalanceScoreCard();
  }

  getOrgUnitCode() {
    this.strategyService.getCodeAndName().subscribe((codes) => {
      this.codeAndName = codes;
    });
  }

  getBalanceScoreCard() {
    this.bscService.getBalanceScoreCard().subscribe((data: any) => {
      this.balanceScoreCardData = data;
    });
  }

  getScorecardName() {
    this.balanceScoreCardData.forEach((val, key) => {
      if (this.initiativeForm.controls.scCode.value === val.code) {
        this.codeName = val.name.toUpperCase();
        this.initiativeForm.controls.scName.setValue(this.codeName);
      }
    });
  }

  getCodeNameForPestal() {
    this.codeAndName.forEach((val, key) => {
      if (this.initiativeForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.initiativeForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getDateFormat(fullDate: any) {
    const date = new Date(fullDate);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  saveInitiative() {
    console.log(this.initiativeForm.value);
    const reqObj = this.initiativeForm.value;
    reqObj.completionDate = this.getDateFormat(reqObj.completionDate);
    reqObj.endDate = this.getDateFormat(reqObj.endDate);
    reqObj.startDate = this.getDateFormat(reqObj.startDate);
    console.log(reqObj);
    this.initiativeService.saveInitiative(reqObj).subscribe((data: any) => {
      console.log(data);
    });

  }

  isCompleted(e) {
    this.marked = e.target.checked;
    this.initiativeForm.controls.completed.setValue(this.marked);
  }

  percentCompleted(event: any) {
    this.initiativeForm.controls.percentComplete.setValue(event);
  }
}
