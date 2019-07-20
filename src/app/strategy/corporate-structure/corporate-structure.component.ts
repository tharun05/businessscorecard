import {Component, OnInit} from '@angular/core';
import {CorporateStructure} from '../../entities/corporateStructure';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from '../../shared/app.service';
import {StrategyService} from '../strategy.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-corporate-structure',
  templateUrl: './corporate-structure.component.html',
  styleUrls: ['./corporate-structure.component.scss']
})
export class CorporateStructureComponent implements OnInit {
  mission = 'The Vision statetment and mission statement are often confused, ' +
    'and many companies use the terms interchangeably. However,' +
    ' they each have a different purpose';
  editMission = false;
  editVision = false;
  editValue = false;
  missiontxt: any;
  visiontxt: any;
  valuetxt: any;
  updateCounter = 0;
  orgId: any;
  corporateStructure: CorporateStructure;
  unitCodes = [
    {name: 'Group Company', value: 'Group Company'},
    {name: 'Corporate Unit', value: 'Corporate Unit'},
    {name: 'Corporate Department', value: 'Corporate Department'},
    {name: 'Subsidiary', value: 'Subsidiary'},
    {name: 'Subsidiary Department', value: 'Subsidiary Department'}
  ];

  constructor(private formBuilder: FormBuilder, private strategyService: StrategyService, private toastrService: ToastrService, private router: Router,
              private appService: AppService) {
    this.corporateStructure = new CorporateStructure();
  }

  corporateStructureForm = this.formBuilder.group({
    code: ['', [Validators.required]],
    parentCode: ['', [Validators.required]],
    managerName: ['', []],
    employeeCount: ['', []],
    logoUrl: ['', []],
    parentName: ['', [Validators.required]],
    type: ['', []],
    location: ['', []],
    head: ['', []],
    missionStmt: ['Lorem ipsum dolor sit amet consectetur adipiscing elit. Nunc semper massa elit, et facilisis turpis facilisis vel.', []],
    visionStmt: ['Lorem ipsum dolor sit amet consectetur adipiscing elit. Nunc semper massa elit, et facilisis turpis facilisis vel.', []],
    valuesStmt: ['Lorem ipsum dolor sit amet consectetur adipiscing elit. Nunc semper massa elit, et facilisis turpis facilisis vel.', []]
  });

  ngOnInit() {
    this.missiontxt = this.corporateStructureForm.controls.missionStmt.value;
    this.visiontxt = this.corporateStructureForm.controls.visionStmt.value;
    this.valuetxt = this.corporateStructureForm.controls.valuesStmt.value;
  }

  editMissionText() {
    this.editMission = true;

  }

  saveMissionText() {
    this.editMission = false;
    this.missiontxt = this.corporateStructureForm.controls.missionStmt.value;
  }

  editVisionText() {
    this.editVision = true;
  }

  saveVisionText() {
    this.editVision = false;
    this.visiontxt = this.corporateStructureForm.controls.visionStmt.value;
  }

  editValueText() {
    this.editValue = true;
  }

  saveValueText() {
    this.editValue = false;
    this.valuetxt = this.corporateStructureForm.controls.valuesStmt.value;
  }

  submitOrganization() {

    this.strategyService.saveOrganization(this.corporateStructureForm.value).subscribe((orgData: any) => {
      this.updateCounter = this.updateCounter + 1;
      this.orgId = orgData.id;
      this.toastrService.success('Saved Successfully');
      if (!!orgData && !!orgData.id && this.updateCounter > 1) {
        this.orgId = orgData.id;
        this.strategyService.UpdateOrganization(this.corporateStructureForm.value, orgData.id).subscribe((updatedOrg) => {
          this.toastrService.success('Saved Successfully');
          console.log('updated successfully');
        });
      }
    });
  }

  orgStructure() {
    console.log(this.corporateStructureForm.value);
  }

  routeToSummaryView() {
    console.log(this.orgId);
    this.router.navigate(['/strategy/strategyPreview'], {queryParams: {id: this.orgId}});
  }

  clearFields() {
    this.corporateStructureForm.reset();
  }
}
