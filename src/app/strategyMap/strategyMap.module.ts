import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpService} from '../shared/http.service';
import {AppService} from '../shared/app.service';
import {TestComponent} from './test/test.component';
import {StrategyMapComponent} from './strategymap.component';

const routes: Routes = [
  {
    path: '', component: TestComponent,
    children: [
      {
        path: 'test', component: TestComponent
      }
    ]
  }];

@NgModule({
  declarations: [
    TestComponent,
    StrategyMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [HttpService, AppService],
})
export class StrategyMapModule {
}
