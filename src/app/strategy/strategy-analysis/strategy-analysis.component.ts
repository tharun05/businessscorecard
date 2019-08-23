import {Component, OnInit} from '@angular/core';
import {StrategyService} from '../strategy.service';
import {FormBuilder, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {StrategyAnalysisService} from './strategy-analysis.service';
import {ToastrService} from 'ngx-toastr';

window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-strategy-analysis',
  templateUrl: './strategy-analysis.component.html',
  styleUrls: ['./strategy-analysis.component.scss']
})
export class StrategyAnalysisComponent implements OnInit {
  codeAndName: any;
  orgName: any;
  selectedIndex: number = 0;
  reqObj: any;
  strength: any;
  strengths: any;
  weaknesses: any;
  weaknessess: any;
  opportunities: any;
  opportunitiess: any;
  threats: any;
  threatss: any;
  swotTypes: any = 'Strengths';
  type: any;
  isEditMode = true;
  index: any;

  years = [{id: 1, name: '2016'},
    {id: 1, name: '2017'},
    {id: 1, name: '2018'},
    {id: 1, name: '2019'}];

  swot = [
    {id: 1, name: 'Strengths', active: true},
    {id: 2, name: 'Weaknesses', active: true},
    {id: 3, name: 'Opportunities', active: true},
    {id: 4, name: 'Threats', active: true}
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


  constructor(private formBuilder: FormBuilder,
              private strategyService: StrategyService,
              private strategyAnalysisService: StrategyAnalysisService,
              private toastrService: ToastrService) {

    $(function () {
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
    details: ['test'],
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
    this.codeAndName.forEach((val, key) => {
      if (this.strategyAnalysisFrom.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.strategyAnalysisFrom.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getCodeNameForPestal() {
    this.codeAndName.forEach((val, key) => {
      if (this.pestalAnalysisFrom.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.pestalAnalysisFrom.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getCodeNameForPortersFiveForce(code: any) {
    this.codeAndName.forEach((val, key) => {
      if (this.portersFiveForceAnalysisFrom.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.portersFiveForceAnalysisFrom.controls.orgName.setValue(this.orgName);
      }
    });
  }


  getCodeNameForFiveCorner(code: any) {
    this.codeAndName.forEach((val, key) => {
      if (this.fourCornerAnalysisFrom.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.fourCornerAnalysisFrom.controls.orgName.setValue(this.orgName);
      }
    });
  }

  swatAnalysis(type: any) {
    this.strategyAnalysisFrom.controls.type.setValue(type);
  }


  saveStrategiySwotAnalysis(type: any) {
    this.strategyAnalysisService.strategyAnalysis.orgCode = this.strategyAnalysisFrom.value.orgCode;
    this.strategyAnalysisService.strategyAnalysis.description = this.strategyAnalysisFrom.value.description;
    this.strategyAnalysisService.strategyAnalysis.orgName = this.strategyAnalysisFrom.value.orgName;
    this.strategyAnalysisService.strategyAnalysis.type = type;
    this.strategyAnalysisService.strategyAnalysis.year = this.strategyAnalysisFrom.value.year;
    this.strategyAnalysisService.strategyAnalysis.version = this.strategyAnalysisFrom.value.version;
    this.strategyService.saveSwotAnalysis(this.strategyAnalysisService.strategyAnalysis).subscribe((data: any) => {
      console.log(data);
    });
  }

  getStrategyAnalysis(event: any, type: any) {
    this.reqObj = this.strategyAnalysisFrom.value;
    this.strategyService.getStretegyAnalysis(this.reqObj.orgCode, this.reqObj.year, this.reqObj.version, type)
      .subscribe((data: any) => {

        this.strategyAnalysisService.strategyAnalysis = Object.assign({}, data);
        this.strategyAnalysisService.strategyAnalysis.details.forEach((key, i) => {
          const strategyDetails = this.strategyAnalysisService.strategyAnalysis;
          switch (this.strategyAnalysisService.strategyAnalysis.details[i].title) {
            case 'Strengths':
              this.strength = strategyDetails.details[i].criterias.toString();
              break;
            case 'Weaknesses':
              this.weaknesses = strategyDetails.details[i].criterias.toString();
              break;
            case 'Opportunities':
              this.opportunities = strategyDetails.details[i].criterias.toString();
              break;
            case 'Threats':
              this.threats = strategyDetails.details[i].criterias.toString();
              break;
          }
        });
        // this.activateClass(0, 'STRENGTHS');

      });
  }

  updateSwotAnalysis() {
    switch (this.swotTypes) {
      case 'Strengths':
        const strengthCriterias = this.strategyAnalysisFrom.controls.details.value.split(',');
        strengthCriterias.forEach((key, i) => {
          const isAvailable = this.strategyAnalysisService.strategyAnalysis.details[0].criterias.indexOf(key.trim());
          if (isAvailable === -1) {
            this.strategyAnalysisService.strategyAnalysis.details[0].criterias.push(key);
            this.strength = this.strategyAnalysisService.strategyAnalysis.details[0].criterias.toString();
          }
        });
        break;
      case 'Weaknesses':
        const isAvailable = this.strategyAnalysisService.strategyAnalysis.details[1].criterias.indexOf(this.strategyAnalysisFrom.value.details);
        // this.weaknesses = this.strategyAnalysisService.strategyAnalysis.details[i].criterias.toString();
        break;
      case 'Opportunities':
        // this.opportunities = this.strategyAnalysisService.strategyAnalysis.details[i].criterias.toString();
        break;
      case 'Threats':
        // this.threats = this.strategyAnalysisService.strategyAnalysis.details[i].criterias.toString();
        break;
    }
    // });
  }

  isEdit(type: string) {
    // this.activateClass(0, type);
    this.strategyAnalysisFrom.value.details = null;
  }

  activateClass(index: any, name: string) {
    this.swotTypes = name;
    this.selectedIndex = index;
    this.strategyAnalysisService.strategyAnalysis.details.forEach((key, i) => {
      if (key.title.toUpperCase() === this.swotTypes.toUpperCase()) {
        switch (this.strategyAnalysisService.strategyAnalysis.details[i].title) {
          case 'Strengths':
            this.strength = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.strategyAnalysisFrom.controls.details.setValue(this.strength);
            break;
          case 'Weaknesses':
            this.weaknesses = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.strategyAnalysisFrom.controls.details.setValue(this.weaknesses);
            break;
          case 'Opportunities':
            this.opportunities = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.strategyAnalysisFrom.controls.details.setValue(this.opportunities);
            break;
          case 'Threats':
            this.threats = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.strategyAnalysisFrom.controls.details.setValue(this.threats);
            break;
        }
      }
    });
  }

  onItemAdded(event?: any) {
    this.strategyAnalysisService.strategyAnalysis.details.forEach((key, i) => {
      if (key.title.toUpperCase() === this.swotTypes.toUpperCase()) {
        switch (this.strategyAnalysisService.strategyAnalysis.details[i].title) {
          case 'Strengths':
            this.strength = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.strengths = this.strength.push(event.value);

            break;
          case 'Weaknesses':
            this.weaknesses = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.weaknessess = this.weaknesses.push(event.value);
            break;
          case 'Opportunities':
            this.opportunities = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.opportunitiess = this.opportunities.push(event.value);
            break;
          case 'Threats':
            this.threats = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.threatss = this.threats.push(event.value);
            break;
        }

      }
    });
  }

  onItemRemoved(event: any) {
    this.strategyAnalysisService.strategyAnalysis.details.forEach((key, i) => {
      if (key.title.toUpperCase() === this.swotTypes.toUpperCase()) {
        switch (this.strategyAnalysisService.strategyAnalysis.details[i].title) {
          case 'Strengths':
            this.strength = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.index = this.strength.indexOf(event.value);
            if (this.index !== -1) {
              this.strength.splice(this.index, 1);
            }
            break;
          case 'Weaknesses':
            this.weaknesses = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.index = this.weaknesses.indexOf(event.value);
            if (this.index !== -1) {
              this.weaknesses.splice(this.index, 1);
            }
            break;
          case 'Opportunities':
            this.opportunities = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.index = this.opportunities.indexOf(event.value);
            if (this.index !== -1) {
              this.opportunities.splice(this.index, 1);
            }
            break;
          case 'Threats':
            this.threats = this.strategyAnalysisService.strategyAnalysis.details[i].criterias;
            this.index = this.threats.indexOf(event.value);
            if (this.index !== -1) {
              this.threats.splice(this.index, 1);
            }
            break;
        }
      }
    });
  }
}
