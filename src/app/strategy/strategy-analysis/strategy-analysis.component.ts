import {FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {StrategyService} from '../strategy.service';
import * as $ from 'jquery';

window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-strategy-analysis',
  templateUrl: './strategy-analysis.component.html',
  styleUrls: ['./strategy-analysis.component.scss']
})
export class StrategyAnalysisComponent implements OnInit {
  codeAndName: any;
  orgName: any;
  selectedIndex: number = null;

  years = [{id: 1, name: '2016'},
    {id: 1, name: '2017'},
    {id: 1, name: '2018'},
    {id: 1, name: '2019'}];

  swot = [
    {id: 1, name: 'STRENGTH', active: true},
    {id: 2, name: 'WEAKNESS', active: true},
    {id: 3, name: 'OPPORTUNITIES', active: true},
    {id: 4, name: 'THREATS', active: true}
  ];

  pestalAnalysis = [
    {id: 1, name: 'Political Analysis'},
    {id: 2, name: 'Economic Analysis'},
    {id: 3, name: 'Social Analysis'},
    {id: 4, name: 'Technological Analysis'},
    {id: 5, name: 'Environmental Analysis'},
    {id: 6, name: 'Legal Analysis'}
  ];

  perterAnalysis = [
    {id: 1, name: 'Supplier Power'},
    {id: 2, name: 'Buyer Power'},
    {id: 3, name: 'Competitive Rivalry'},
    {id: 4, name: 'Threats Of Substitution'},
    {id: 5, name: 'Threats of New Entry'}
  ];


  fourCornerAnalysis = [
    {id: 1, name: 'Drivers'},
    {id: 2, name: 'Current Strategy'},
    {id: 3, name: 'Management Assumptions'},
    {id: 4, name: 'Capabilities'}
  ];


  constructor(private formBuilder: FormBuilder, private strategyService: StrategyService) {
    $(document).ready(function () {
      // Add minus icon for collapse element which is open by default
      $('.collapse.show').each(function () {
        $(this).prev('.criteriaTitle,.strategryAnalysisTitle').find('.fa').addClass('fa-angle-up').removeClass('fa-angle-down');
      });

      // Toggle plus minus icon on show hide of collapse element
      $('.collapse').on('show.bs.collapse', function () {
        $(this).prev('.criteriaTitle,.strategryAnalysisTitle').find('.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
      }).on('hide.bs.collapse', function () {
        $(this).prev('.criteriaTitle,.strategryAnalysisTitle').find('.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
      });
    });

  }

  strategyAnalysisFrom = this.formBuilder.group({
    orgCode: ['', [Validators.required]],
    orgName: ['', [Validators.required]],
    description: [''],
    version: [''],
    details: [''],
    additionalFields: [''],
    year: ['', [Validators.required]],
    type: ['']

  });

  pestalAnalysisFrom = this.formBuilder.group({
    orgCode: ['', [Validators.required]],
    orgName: ['', [Validators.required]],
    description: [''],
    version: [''],
    details: [''],
    additionalFields: [''],
    year: ['', [Validators.required]]

  });

  portersFiveForceAnalysisFrom = this.formBuilder.group({
    orgCode: ['', [Validators.required]],
    orgName: ['', [Validators.required]],
    description: [''],
    version: [''],
    details: [''],
    additionalFields: [''],
    year: ['', [Validators.required]]

  });


  fourCornerAnalysisFrom = this.formBuilder.group({
    orgCode: ['', [Validators.required]],
    orgName: ['', [Validators.required]],
    description: [''],
    version: [''],
    details: [''],
    additionalFields: [''],
    year: ['', [Validators.required]]

  });


  ngOnInit() {
    this.getOrgUnitCode();
  }

  getOrgUnitCode() {
    this.strategyService.getCodeAndName().subscribe((codes) => {
      this.codeAndName = codes;
    });
  }

  getCodeName(code: any) {
    const self = this;
    this.codeAndName.forEach(function (val, key) {
      if (self.strategyAnalysisFrom.controls.orgCode.value === val.code) {
        self.orgName = val.name.toUpperCase();
        self.strategyAnalysisFrom.controls.orgName.setValue(self.orgName);
      }
    });

  }

  getCodeNameForPestal(code: any) {
    const self = this;
    this.codeAndName.forEach(function (val, key) {
      if (self.pestalAnalysisFrom.controls.orgCode.value === val.code) {
        self.orgName = val.name.toUpperCase();
        self.pestalAnalysisFrom.controls.orgName.setValue(self.orgName);
      }
    });
  }

  getCodeNameForPortersFiveForce(code: any) {
    const self = this;
    this.codeAndName.forEach(function (val, key) {
      if (self.portersFiveForceAnalysisFrom.controls.orgCode.value === val.code) {
        self.orgName = val.name.toUpperCase();
        self.portersFiveForceAnalysisFrom.controls.orgName.setValue(self.orgName);
      }
    });
  }


  getCodeNameForFiveCorner(code: any) {
    const self = this;
    this.codeAndName.forEach(function (val, key) {
      if (self.fourCornerAnalysisFrom.controls.orgCode.value === val.code) {
        self.orgName = val.name.toUpperCase();
        self.fourCornerAnalysisFrom.controls.orgName.setValue(self.orgName);
      }
    });
  }

  swatAnalysis(type: any) {
    this.strategyAnalysisFrom.controls.type.setValue(type);
    console.log(this.strategyAnalysisFrom.value);
  }

  activateClass(index: any) {
    this.selectedIndex = index;
    console.log(this.selectedIndex = index)
  }
}
