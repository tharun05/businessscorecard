import {Component, OnInit} from '@angular/core';
import {AppService} from '../../shared/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService) {
  }

  ngOnInit() {
  }

  RedirectToDashboard() {
    this.appService.navigate('/dashboard', []);
  }

}
