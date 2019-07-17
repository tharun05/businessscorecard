import {Component, OnInit} from '@angular/core';
import {CorporateStructure} from '../../entities/corporateStructure';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from './../../shared/app.service';

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
  corporateStructure: CorporateStructure;

  constructor(private formBuilder: FormBuilder,
              private appService: AppService) {
    this.corporateStructure = new CorporateStructure();
  }

  corporateStructureForm = this.formBuilder.group({
    code: ['', [Validators.required]],
    parentCode: ['', [Validators.required]],
    managerName: ['', [Validators.required]],
    employeeCount: ['', [Validators.required]],
    logoUrl: ['', [Validators.required]],
    parentName: ['', [Validators.required]],
    type: ['', [Validators.required]],
    location: ['', [Validators.required]],
    head: ['', [Validators.required]],
    missionStmt: ['', [Validators.required]],
    visionStmt: ['', [Validators.required]],
    valuesStmt: ['', [Validators.required]]
  });

  ngOnInit() {
  }

  editMissionText() {
    this.editMission = true;
  }

  saveMissionText() {
    this.editMission = false;
  }

  editVisionText() {
    this.editVision = true;
  }

  saveVisionText() {
    this.editVision = false;
  }

  editValueText() {
    this.editValue = true;
  }

  saveValueText() {
    this.editValue = false;
  }

  submitOrganization() {
    console.log(this.corporateStructureForm.value);
  }

  orgStructure() {
    console.log(this.corporateStructureForm.value);
  }

  routeToSummaryView() {
    console.log('ds');
    this.appService.navigate('/strategyPreview', []);
  }
}
