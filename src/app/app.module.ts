import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {TagInputModule} from 'ngx-chips';
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
import {StrategyAnalysisComponent} from './strategy/strategy-analysis/strategy-analysis.component';
import {StrategyProjectionComponent} from './strategy/strategy-projection/strategy-projection.component';
import {StrategyComponent} from './strategy/strategy.component';
import {ValueGapComponent} from './strategy/value-gap/value-gap.component';
import {ValueGapCloserComponent} from './strategy/value-gap-closer/value-gap-closer.component';
import {DataTablesModule} from 'angular-datatables';
import {EmitterService} from './shared/emitter.service';
import {AuthService} from './auth/auth.service';
import {StrategyService} from './strategy/strategy.service';
import {HttpService} from './shared/http.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {Utilities} from './shared/utils/utilities.service';
import {StrategyAnalysisService} from './strategy/strategy-analysis/strategy-analysis.service';
import {TagInputComponent} from './shared/components/tag-input/tag-input.component';
import {BusinessScoreCardComponent} from './bsc/business-score-card/business-score-card.component';
import {BscComponent} from './bsc/bsc/bsc.component';
import {PerspectiveComponent} from './bsc/perspective/perspective.component';
import {ModalComponent} from './shared/components/modal/modal.component';
import {ThemesComponent} from './bsc/themes/themes.component';
import {ObjectivesComponent} from './bsc/objectives/objectives.component';
import {BscService} from './bsc/bsc.service';
import { MeasuresComponent } from './bsc/measures/measures.component';

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
    ValueGapCloserComponent,
    StrategyAnalysisComponent,
    StrategyProjectionComponent,
    TagInputComponent,
    BusinessScoreCardComponent,
    BscComponent,
    PerspectiveComponent,
    ModalComponent,
    ThemesComponent,
    ObjectivesComponent,
    MeasuresComponent
    // SubUnitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    TagInputModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center', timeOut: 2000})
  ],
  providers: [WINDOW_PROVIDERS, AppService, EmitterService, AuthService, StrategyService, HttpService, Utilities, StrategyAnalysisService, BscService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
