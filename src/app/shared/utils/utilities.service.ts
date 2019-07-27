import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

window['$'] = window['jQuery'] = $;

@Injectable()
export class Utilities implements OnInit {
  self: any;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.fieldCriterias();
  }

  fieldCriterias() {
    $(document).ready(function () {
      // number field removing decimals and hyphens
      $('.inputWithoutDecimal').keypress(function (e) {
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
          return false;
        }
      });
    });
  }
}
