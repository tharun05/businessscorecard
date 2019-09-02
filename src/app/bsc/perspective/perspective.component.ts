import {Component, OnInit} from '@angular/core';
import {StrategyService} from '../../strategy/strategy.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {BscService} from '../bsc.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitterService} from '../../shared/emitter.service';
import {ToastrService} from 'ngx-toastr';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.scss']
})
export class PerspectiveComponent implements OnInit {
  codeAndName: any;
  orgName: any;
  balanceScoreCardData: any;
  codeName: any;
  PerspectivesByCode = [];
  perspectiveId: any;
  isEmptyProject: any;
  perspectiveForm = this.formBuilder.group({
    orgCode: ['', [Validators.required]],
    orgName: ['', [Validators.required]],
    scCode: [''],
    scName: [''],
    name: [''],
    code: [''],
    additionalFields: [[]],
  });
  showDefaultProjType;

  constructor(private strategyService: StrategyService,
              private bscService: BscService,
              private formBuilder: FormBuilder,
              private emitterService: EmitterService,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getOrgUnitCode();
    this.getBalanceScoreCard();
    this.activatedRoute.queryParams.subscribe(params => {
      this.showDefaultProjType = params['defaultProjType'];
    });
  }

  getOrgUnitCode() {
    this.strategyService.getCodeAndName().subscribe((codes) => {
      this.codeAndName = codes;
    });
  }

  getCodeName() {
    this.codeAndName.forEach((val, key) => {
      if (this.perspectiveForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.perspectiveForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getCodeNameForPestal() {
    this.codeAndName.forEach((val, key) => {
      if (this.perspectiveForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.perspectiveForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getBalanceScoreCard() {
    this.bscService.getBalanceScoreCard().subscribe((data: any) => {
      this.balanceScoreCardData = data;
      // this.getBscCodeAndName(this.balanceScoreCardData);
    });
  }

  getScorecardName() {
    this.balanceScoreCardData.forEach((val, key) => {
      if (this.perspectiveForm.controls.scCode.value === val.code) {
        this.codeName = val.name.toUpperCase();
        this.perspectiveForm.controls.scName.setValue(this.codeName);
      }
    });
    this.getPerspectivesByCode();
  }

  getPerspectivesByCode() {
    this.bscService.getPerspectivesByCode(this.perspectiveForm.controls.scCode.value).subscribe((data: any) => {
      this.PerspectivesByCode = data;
    });
  }


  savePerspective() {
    if (!!this.perspectiveId) {
      this.perspectiveForm.value.id = this.perspectiveId;
      this.bscService.updatePerspective(this.perspectiveForm.value, this.perspectiveId).subscribe((data: any) => {
        this.getPerspectivesByCode();
        this.toastrService.success('Updated Successfully');
      });
    } else {
      this.bscService.savePerspective(this.perspectiveForm.value).subscribe((data: any) => {
        if (!!data) {
          this.PerspectivesByCode.push(data);
          this.toastrService.success('Saved Successfully');
        }
      }, error => {
        this.toastrService.error('Internal Server Error');
      });
    }

  }

  editPerspective(perspective: any) {
    this.perspectiveId = perspective.id;
    this.perspectiveForm.controls.name.setValue(perspective.name);
    this.perspectiveForm.controls.code.setValue(perspective.code);
  }

  deletePerspective(id: any) {
    this.bscService.deletePerspective(id).subscribe((data: any) => {
      if (!!data) {
        this.toastrService.error('Deleted Successfully');
        this.getPerspectivesByCode();
      }
    }, error => {
      this.toastrService.error('Unable to Delete, Please try again later.');
    });
  }

}
