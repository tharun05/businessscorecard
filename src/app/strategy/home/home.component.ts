import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clicked: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  Clicked() {
    this.clicked = true;
  }
}
