import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {StrategyService} from '../../../strategy/strategy.service';
import {EmitterService} from '../../../shared/emitter.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  productGrpFrom = this.formBuilder.group({
    name: ['', [Validators.required]],
    unitOfMeasure: ['', [Validators.required]]
  });

  constructor(private strategyService: StrategyService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private emitterService: EmitterService) {
  }

  ngOnInit() {
  }

  addProductGrp() {
    this.strategyService.saveProductGroup(this.productGrpFrom.value).subscribe((data: any) => {
      if (data.id) {
        this.emitterService.broadcastProductGroup(data);
        this.toastrService.success('Added Successfully');
      }
    });
  }

}
