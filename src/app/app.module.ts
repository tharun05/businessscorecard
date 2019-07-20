import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {SubheaderComponent} from './shared/components/subheader/subheader.component';
import {WINDOW_PROVIDERS} from './shared/window.service';
import {FooterComponent} from './shared/components/footer/footer.component';
import {LoginComponent} from './auth/login/login.component';
import {AppService} from './shared/app.service';
import {OverviewComponent} from './strategy/overview/overview.component';
import {CorporateStructureComponent} from './strategy/corporate-structure/corporate-structure.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StrategyPreviewComponent} from './strategy/strategy-preview/strategy-preview.component';
import {StrategyComponent} from './strategy/strategy.component';
import {ValueGapComponent} from './strategy/value-gap/value-gap.component';
import {ValueGapCloserComponent} from './strategy/value-gap-closer/value-gap-closer.component';
import {EmitterService} from './shared/emitter.service';
import {AuthService} from './auth/auth.service';
import {StrategyService} from './strategy/strategy.service';
import {HttpService} from './shared/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubheaderComponent,
    FooterComponent,
    LoginComponent,
    OverviewComponent,
    CorporateStructureComponent,
    DashboardComponent,
    StrategyPreviewComponent,
    StrategyComponent,
    ValueGapComponent,
    ValueGapCloserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center'})
  ],
  providers: [WINDOW_PROVIDERS, AppService, EmitterService, AuthService, StrategyService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
