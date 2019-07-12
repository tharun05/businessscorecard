import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HomeComponent} from '../components/strategy/home/home.component';
import {StrategyAnalysisComponent} from '../components/strategy/strategy-analysis/strategy-analysis.component';
import {StrategyProjectionComponent} from '../components/strategy/strategy-projection/strategy-projection.component';
import {CorporateStructureComponent} from '../components/strategy/corporate-structure/corporate-structure.component';
import {ValueGapCloserComponent} from '../components/strategy/value-gap-closer/value-gap-closer.component';
import {ValueGapComponent} from '../components/strategy/value-gap/value-gap.component';
import {OverviewComponent} from '../components/strategy/overview/overview.component';
import {TestComponent} from '../components/strategyMap/test/test.component';
import {HttpService} from '../shared/http.service';
import {AppService} from '../shared/app.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'strategyAnalysis', component: StrategyAnalysisComponent},
      {path: 'strategyProjection', component: StrategyProjectionComponent},
      {path: 'corporateStructure', component: CorporateStructureComponent},
      {path: 'valuegapCloser', component: ValueGapCloserComponent},
      {path: 'valuegap', component: ValueGapComponent},

    ]
  }

];

@NgModule({
  declarations: [
    OverviewComponent,
    HomeComponent,
    StrategyAnalysisComponent,
    StrategyProjectionComponent,
    CorporateStructureComponent,
    ValueGapCloserComponent,
    ValueGapComponent,
    TestComponent
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
export class StrategyModule {
}
