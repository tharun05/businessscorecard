import {Component, OnInit} from '@angular/core';
import {StrategyService} from '../strategy.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-value-gap',
  templateUrl: './value-gap.component.html',
  styleUrls: ['./value-gap.component.scss']
})
export class ValueGapComponent implements OnInit {
  valueGapForm: FormGroup;
  codeAndName: any;
  orgName: any;
  valueGapTableData: any;
  AllYearsData = [
    {yearRef: 'Y-5'},
    {yearRef: 'Y-4'},
    {yearRef: 'Y-3'},
    {yearRef: 'Y-2'},
    {yearRef: 'Y-1'},
    {yearRef: 'Y'},
    {yearRef: 'Y+1'},
    {yearRef: 'Y+2'},
    {yearRef: 'Y+3'},
    {yearRef: 'Y+4'},
    {yearRef: 'Y+5'}
  ];
  valueGapId: any;
  currenctUnit = [
    {id: 1, type: 'USD'},
    {id: 1, type: 'GBP'},
    {id: 1, type: 'INR'},
  ];

  createform() {
    const arr = [];
    for (let i = 0; i < this.AllYearsData.length; i++) {
      arr.push(this.BuildFormDynamic(this.AllYearsData[i]));

    }

    this.valueGapForm = this.formBuilder.group({
      orgCode: [''],
      orgName: [''],
      region: [''],
      currencyType: [''],
      productGroupName: [''],
      productGroupUnitOfMeasure: [''],
      year: [''],
      version: [''],
      values: this.formBuilder.array(arr)
    });
  }

  BuildFormDynamic(product): FormGroup {
    return this.formBuilder.group({
      yearRef: [product.yearRef],
      year: [''],
      revenueGap: [''],
      revenueAmount: ['']
    });
  }

  getOrgUnitCode() {
    this.strategyService.getCodeAndName().subscribe((codes) => {
      this.codeAndName = codes;
    });
  }

  getCodeName(code: any) {
    this.codeAndName.forEach((val, key) => {
      if (this.valueGapForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.valueGapForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getCodeNameForPestal(code: any) {
    this.codeAndName.forEach((val, key) => {
      if (this.valueGapForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.valueGapForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  constructor(private strategyService: StrategyService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.createform();
    this.getOrgUnitCode();
    this.getValueGap();
  }

  saveValueGap() {
    if (this.valueGapId) {
      this.strategyService.updateValueGap(this.valueGapForm.value, this.valueGapId).subscribe((data: any) => {
        this.getValueGap();
        this.toastrService.success('Updated Successfully');
      });
    } else {
      this.strategyService.saveValueGap(this.valueGapForm.value).subscribe((data: any) => {
        this.getValueGap();
        this.toastrService.success('Added Successfully');
        this.valueGapId = data.id;
      });
    }
  }

  getValueGap() {
    this.strategyService.getValueGap().subscribe((data) => {
      this.valueGapTableData = data;
    });
  }

  editValueGap(data: any, index) {
    this.valueGapForm.patchValue(data[index]);
    this.valueGapId = data[index].id;
  }

  deleteValueGap(id: any) {
    this.strategyService.deleteValueGap(id).subscribe((data) => {
      this.toastrService.error('Deleted Successfully');
      this.getValueGap();
    });
  }

  clear() {
    this.valueGapForm.reset();
  }

}
