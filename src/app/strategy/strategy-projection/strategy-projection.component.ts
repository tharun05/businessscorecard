import {Component, OnDestroy, OnInit, SimpleChanges, SimpleChange, OnChanges} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {StrategyService} from '../strategy.service';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {EmitterService} from '../../shared/emitter.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-strategy-projection',
  templateUrl: './strategy-projection.component.html',
  styleUrls: ['./strategy-projection.component.scss']
})
export class StrategyProjectionComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  // persons: Person[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  codeAndName: any;
  orgName: any;
  strategyProjectionForm: FormGroup;
  strategyProjectionTableData: any = [];
  strategyProjId: any;
  updateElem: any;
  strategyProjectionId: any;
  strategyProjectionItem: any;
  isEditDetails: any;
  prdGrp: any;
  prdGrpSubscription: any;
  unitOfMeasure: any;

  constructor(private formBuilder: FormBuilder,
              private strategyService: StrategyService,
              private toastrService: ToastrService,
              private emitterService: EmitterService) {

    this.prdGrpSubscription = this.emitterService.productGroup$.subscribe((data: any) => {
      if (data) {
        this.getProductGrp();
      }
    });

  }


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

    this.strategyProjectionForm = this.formBuilder.group({
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
      quantity: [''],
      averagePrice: [''],
      revenueAmount: ['']
    });
  }

  ngOnInit() {
    this.createform();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 1
    };
    this.getOrgUnitCode();
    this.getAllStrategyProjection();
    this.getProductGroup();
    this.getProductGrp();
  }


  getOrgUnitCode() {
    this.strategyService.getCodeAndName().subscribe((codes) => {
      this.codeAndName = codes;
    });
  }

  getCodeName(code: any) {
    this.codeAndName.forEach((val, key) => {
      if (this.strategyProjectionForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.strategyProjectionForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  getCodeNameForPestal() {
    this.codeAndName.forEach((val, key) => {
      if (this.strategyProjectionForm.controls.orgCode.value === val.code) {
        this.orgName = val.name.toUpperCase();
        this.strategyProjectionForm.controls.orgName.setValue(this.orgName);
      }
    });
  }

  submitStrategyProjection() {
    if (this.strategyProjId || this.isEditDetails) {
      this.strategyService.UpdateStrategyProjection(this.strategyProjectionForm.value, this.strategyProjId).subscribe((data: any) => {
        this.getAllStrategyProjection();
        this.toastrService.success('Updated Successfully');
      });
    } else {
      this.strategyService.saveStrategyProjection(this.strategyProjectionForm.value).subscribe((data: any) => {
        this.getAllStrategyProjection();
        this.toastrService.success('Added Successfully');
        this.strategyProjId = data.id;
        console.log(this.strategyProjectionForm.value);
      });
    }
  }

  editStrategyProjection(data: any, index) {
    this.strategyProjectionForm.patchValue(data[index]);
    this.strategyProjId = data[index].id;
    this.isEditDetails = true;
  }

  getAllStrategyProjection() {
    this.strategyService.getAllStrategyProjection().subscribe((data: any) => {
      this.strategyProjectionTableData = data;
    });
  }

  deleteStrategyPorjection(id: any) {
    this.strategyService.deleteStrategyProjection(id).subscribe((data) => {
      this.toastrService.error('Deleted Successfully');
      this.getAllStrategyProjection();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getProductGroup() {
    this.strategyService.getAllProductGroup().subscribe((data) => {
      console.log(data);
    });
  }

  calRevenueAmt(index: any) {
    if (this.strategyProjectionForm.value.values[index].quantity && this.strategyProjectionForm.value.values[index].averagePrice) {
      let revAmt = this.strategyProjectionForm.value.values[index].quantity * this.strategyProjectionForm.value.values[index].averagePrice;
      this.strategyProjectionForm.controls.values['controls'][index].controls.revenueAmount.setValue(revAmt);
    }

  }

  clear() {
    this.strategyProjectionForm.reset();
  }

  getProductGrp() {
    this.strategyService.getAllProductGroup().subscribe((data: any) => {
      this.prdGrp = data;
    });
  }

  getProductUnitOfMeasure() {
    this.prdGrp.forEach((val, key) => {
      if (this.strategyProjectionForm.controls.productGroupName.value === val.name) {
        this.unitOfMeasure = val.unitOfMeasure.toUpperCase();
        this.strategyProjectionForm.controls.productGroupUnitOfMeasure.setValue(this.unitOfMeasure);
      }
    });
  }


}
