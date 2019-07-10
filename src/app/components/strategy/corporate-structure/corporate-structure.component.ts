import {Component, OnInit} from '@angular/core';
import {CorporateStructure} from '../../../entities/corporateStructure';

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

  constructor() {
    this.corporateStructure = new CorporateStructure();
  }

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
  submitOrganization(){
    console.log(this.corporateStructure)
  }
}
