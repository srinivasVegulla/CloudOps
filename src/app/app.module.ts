import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


//import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDonutChartModule } from 'ngx-doughnut-chart';

import { MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { UtilizationDetailsComponent } from './utilization-details/utilization-details.component';
import { ServiceHealthComponent } from './service-health/service-health.component';
import { LogInsightsComponent } from './log-insights/log-insights.component';
import { AlertCardsComponent } from './alert-cards/alert-cards.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GuageChartsComponent } from './guage-charts/guage-charts.component';
import { RegionalViewComponent } from './regional-view/regional-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    AlertsComponent,
    TicketHistoryComponent,
    UtilizationDetailsComponent,
    ServiceHealthComponent,
    LogInsightsComponent,
    AlertCardsComponent,
    SideNavigationComponent,
    GuageChartsComponent,
    RegionalViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxChartsModule,
    NgxDatatableModule,
    NgxDonutChartModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
