import {FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

window['$'] = window['jQuery'] = $;

@Component({
  selector: 'app-strategy-analysis',
  templateUrl: './strategy-analysis.component.html',
  styleUrls: ['./strategy-analysis.component.scss']
})
export class StrategyAnalysisComponent implements OnInit {


  constructor(private formBuilder: FormBuilder) {
    $(document).ready(function () {
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
    code: ['', [Validators.required]],
    description: [''],
    name: [''],
    year: [''],
    version: ['']

  });

  ngOnInit() {
  }

}
