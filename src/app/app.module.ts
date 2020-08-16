import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';

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
import { TicketsComponent } from './tickets/tickets.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { UtilizationDetailsComponent } from './utilization-details/utilization-details.component';
import { ServiceHealthComponent } from './service-health/service-health.component';
import { LogInsightsComponent } from './log-insights/log-insights.component';
import { AlertCardsComponent } from './alert-cards/alert-cards.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GuageChartsComponent } from './guage-charts/guage-charts.component';
import { RegionalViewComponent } from './regional-view/regional-view.component';
import { TicketsDetailsPageComponent } from './ticket-details-page/ticket-details-page.component';
import { CreateTicketModalDialogComponent } from './create-ticket-modal-dialog/create-ticket-modal-dialog.component';
import { TicketDetailsContainerComponent } from './ticket-details-container/ticket-details-container.component';
import { AssignTicketModalComponent } from './assign-ticket-modal/assign-ticket-modal.component';
import { TroubleshootModalComponent } from './troubleshoot-modal/troubleshoot-modal.component';
import { RCAchartComponent } from './rcachart/rcachart.component';
import { TopologyComponent } from './topology/topology.component';
import { AlarmsComponent } from './alarms/alarms.component';
import { PeriodicActivitiesComponent } from './periodic-activities/periodic-activities.component';
import { AutoRemediationComponent } from './auto-remediation/auto-remediation.component';
import { SecurityVulnerabilityComponent } from './security-vulnerability/security-vulnerability.component';
import { AutoRemediationLogsComponent } from './auto-remediation-logs/auto-remediation-logs.component';
import { AppInsightsComponent } from './app-insights/app-insights.component';
import { ChargeBackAnalyticsComponent } from './charge-back-analytics/charge-back-analytics.component';
import { TenantDetailPageComponent } from './tenant-detail-page/tenant-detail-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    TicketsComponent,
    TicketHistoryComponent,
    UtilizationDetailsComponent,
    ServiceHealthComponent,
    LogInsightsComponent,
    AlertCardsComponent,
    SideNavigationComponent,
    GuageChartsComponent,
    RegionalViewComponent,
    TicketsDetailsPageComponent,
    CreateTicketModalDialogComponent,
    TicketDetailsContainerComponent,
    AssignTicketModalComponent,
    TroubleshootModalComponent,
    RCAchartComponent,
    TopologyComponent,
    AlarmsComponent,
    PeriodicActivitiesComponent,
    AutoRemediationComponent,
    SecurityVulnerabilityComponent,
    AutoRemediationLogsComponent,
    AppInsightsComponent,
    ChargeBackAnalyticsComponent,
    TenantDetailPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
