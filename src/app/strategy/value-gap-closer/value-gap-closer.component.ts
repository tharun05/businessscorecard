import {Component, OnInit} from '@angular/core';
import {StrategyService} from './../strategy.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-value-gap-closer',
  templateUrl: './value-gap-closer.component.html',
  styleUrls: ['./value-gap-closer.component.scss']
})
export class ValueGapCloserComponent implements OnInit {
  codeAndName: any;
  orgName: any;
  reqObj: any;
  prdGrp: any;
  valueGapCloserTableData = [];
  valueGapCloserId: any;
  revenueGap: any;
  amount: any;


  years = [{id: 1, name: '2016'},
    {id: 1, name: '2017'},
    {id: 1, name: '2018'},
    {id: 1, name: '2019'}];

  valueGapCloserForm = this.formBuilder.group({
    orgCode: [''],
    orgName: [''],
    productGroupName: [''],
    revenueGap: [''],
    percentage: [''],
    amount: [''],
    year: [''],
    version: [''],
    scorecardCode: [''],
    objectiveCode: [''],
    initiativeCode: ['']
  });

  constructor(private strategyService: StrategyService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.getAllValueGapCloser();
    this.getOrgUnitCode();
    this.getProductGrp();
  }

  getAllValueGapCloser() {
    this.strategyService.getValueGapCloser().subscribe((data: any) => {
      this.valueGapCloserTableData = data;
    });
  }

  getCodeName() {
    this.codeAndName.forEach((val, key) => {
      if (this.valueGapCloserForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.valueGapCloserForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getCodeNameForPestal() {
    this.codeAndName.forEach((val, key) => {
      if (this.valueGapCloserForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.valueGapCloserForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getOrgUnitCode() {
    this.strategyService.getCodeAndName().subscribe((codes) => {
      this.codeAndName = codes;
    });
  }

  getRevenueGapAmt() {
    this.reqObj = this.valueGapCloserForm.value;
    this.strategyService.getRevenueGap(this.reqObj.orgCode, this.reqObj.productGroupName, this.reqObj.year, this.reqObj.version).subscribe((data: any) => {
      this.revenueGap = data;
      this.valueGapCloserForm.controls.revenueGap.setValue(this.revenueGap);
      if (this.valueGapCloserForm.controls.percentage.value !== '' && this.valueGapCloserForm.controls.revenueGap.value !== '') {
        this.amount = (this.valueGapCloserForm.controls.percentage.value * this.valueGapCloserForm.controls.revenueGap.value) / 100;
        this.valueGapCloserForm.controls.amount.setValue(this.amount);
      }
    });
  }

  getProductGrp() {
    this.strategyService.getAllProductGroup().subscribe((data: any) => {
      this.prdGrp = data;
    });
  }

  saveValueGapCloser() {
    this.strategyService.saveValueGapCloser(this.valueGapCloserForm.value).subscribe((data: any) => {
      if (data.id) {
        console.log(data);
        this.valueGapCloserTableData.push(data);
      }
    });
  }

  editValueGapCloser(data, index) {
    this.valueGapCloserForm.patchValue(data[index]);
    this.valueGapCloserId = data[index].id;
    // this.isEditDetails = true;
  }

  deleteValueGapCloser(id: any) {
    this.strategyService.deleteValueGapCloser(id).subscribe((data) => {
      this.toastrService.error('Deleted Successfully');
      this.getAllValueGapCloser();
    });
  }


}
