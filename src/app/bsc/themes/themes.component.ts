import {Component, OnInit} from '@angular/core';
import {BscService} from '../bsc.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {StrategyService} from '../../strategy/strategy.service';
import {ToastrService} from 'ngx-toastr';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  codeAndName: any;
  orgName: any;
  codeName: any;
  balanceScoreCardData: any;
  themeByScCode = [];
  themeId;

  constructor(private bscService: BscService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private strategyService: StrategyService) {
  }

  themeForm = this.formBuilder.group({
    orgCode: ['', [Validators.required]],
    orgName: ['', [Validators.required]],
    scCode: [''],
    scName: [''],
    name: [''],
    code: [''],
    additionalFields: [[]],
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

  getCodeName() {
    this.codeAndName.forEach((val, key) => {
      if (this.themeForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.themeForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getBalanceScoreCard() {
    this.bscService.getBalanceScoreCard().subscribe((data: any) => {
      this.balanceScoreCardData = data;
      console.log(this.balanceScoreCardData);
      // this.getBscCodeAndName(this.balanceScoreCardData);
    });
  }

  getScorecardName() {
    this.balanceScoreCardData.forEach((val, key) => {
      if (this.themeForm.controls.scCode.value === val.code) {
        this.codeName = val.name.toUpperCase();
        this.themeForm.controls.scName.setValue(this.codeName);
      }
    });
    this.getThemeByCode();
  }

  getThemeByCode() {
    this.bscService.getThemeByCode(this.themeForm.controls.scCode.value).subscribe((data: any) => {
      this.themeByScCode = data;
      console.log(this.themeByScCode);
    });
  }

  saveTheme() {
    if (!!this.themeId) {
      this.themeForm.value.id = this.themeId;
      this.bscService.updateTheme(this.themeForm.value, this.themeId).subscribe((data: any) => {
        this.getThemeByCode();
        this.toastrService.success('Updated Successfully');
      });
    } else {
      this.bscService.saveScoreCardTheme(this.themeForm.value).subscribe((data: any) => {
        this.toastrService.success('Saved Successfully');
        this.themeByScCode.push(data);
        this.themeId = data.id;
      });
    }
  }

  editTheme(theme: any) {
    this.themeId = theme.id;
    this.themeForm.controls.name.setValue(theme.name);
    this.themeForm.controls.code.setValue(theme.code);
  }

  deleteTheme(id: any) {
    this.bscService.deleteTheme(id).subscribe((data: any) => {
      if (data) {
        this.getThemeByCode();
        this.toastrService.success('Deleted Successfully');
      } else {
        this.toastrService.error('unable to delete themes');
      }
    }, error => {
      this.toastrService.error('Internal server error');
    });
  }

}
