import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './modules/auth.module#AuthModule'},
  {path: 'auth', loadChildren: './modules/auth.module#AuthModule'},
  {path: 'strategy', loadChildren: './modules/strategy.module#StrategyModule'},
  {path: 'dashboard', loadChildren: './modules/dashboard.module#DashboardModule'},
  // {path: 'strategyMap', loadChildren: './modules/strategyMap.module#StrategyMapModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
