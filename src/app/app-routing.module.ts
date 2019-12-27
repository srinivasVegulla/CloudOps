import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AlertsComponent } from './alerts/alerts.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { UtilizationDetailsComponent } from './utilization-details/utilization-details.component';
import { ServiceHealthComponent } from './service-health/service-health.component';
import { LogInsightsComponent } from './log-insights/log-insights.component';
import { AuthGuard }                from './auth.guard';

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
        path: 'alerts',
        component: AlertsComponent
      },
      {
        path: 'ticketHistory',
        component: TicketHistoryComponent
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
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
