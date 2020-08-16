import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { UtilizationDetailsComponent } from './utilization-details/utilization-details.component';
import { ServiceHealthComponent } from './service-health/service-health.component';
import { LogInsightsComponent } from './log-insights/log-insights.component';
import { AuthGuard }                from './auth.guard';
import { TicketsDetailsPageComponent } from './ticket-details-page/ticket-details-page.component';
import { TopologyComponent } from './topology/topology.component';
import { AutoRemediationLogsComponent } from './auto-remediation-logs/auto-remediation-logs.component';
import { AppInsightsComponent } from './app-insights/app-insights.component';
import { ChargeBackAnalyticsComponent } from './charge-back-analytics/charge-back-analytics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'topology',
        component: TopologyComponent
      },
      {
        path: 'tickets',
        component: TicketsComponent
      },
      {
        path: 'ticketHistory',
        component: TicketHistoryComponent
      },
      {
        path: 'autoRemediation',
        component: AutoRemediationLogsComponent
      },
      {
        path: 'utilizationHistory',
        component: UtilizationDetailsComponent
      },
      {
        path: 'serviceHealth',
        component: ServiceHealthComponent
      },
      {
        path: 'logInsights',
        component: LogInsightsComponent
      },
      {
        path: 'ticketdetails/:ticketId/:ticketstatus/:tickettab/:ticketSeverity',
        component: TicketsDetailsPageComponent
      },
      {
        path: 'appInsights',
        component: AppInsightsComponent
      },
      {
        path: 'chargeBackanalytics',
        component: ChargeBackAnalyticsComponent
      },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
