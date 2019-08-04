import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OverviewComponent} from './strategy/overview/overview.component';
import {CorporateStructureComponent} from './strategy/corporate-structure/corporate-structure.component';
import {StrategyPreviewComponent} from './strategy/strategy-preview/strategy-preview.component';
import {StrategyComponent} from './strategy/strategy.component';
import {ValueGapComponent} from './strategy/value-gap/value-gap.component';
import {ValueGapCloserComponent} from './strategy/value-gap-closer/value-gap-closer.component';
import {StrategyAnalysisComponent} from './strategy/strategy-analysis/strategy-analysis.component';
import {StrategyProjectionComponent} from './strategy/strategy-projection/strategy-projection.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'strategy', component: StrategyComponent,
    children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'corporateStructure', component: CorporateStructureComponent},
      {path: 'strategyPreview', component: StrategyPreviewComponent},
      {path: 'strategyAnalysis', component: StrategyAnalysisComponent},
      {path: 'strategyProjection', component: StrategyProjectionComponent},
      {path: 'valueGap', component: ValueGapComponent},
      {path: 'valueGapCloser', component: ValueGapCloserComponent}
    ]
  },


  // {path: '', loadChildren: './auth/auth.module#AuthModule'},
  // {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  // {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  // {path: 'strategy', loadChildren: './strategy/strategy.module#StrategyModule'},
  {path: 'strategyMap', loadChildren: './strategyMap/strategyMap.module#StrategyMapModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
