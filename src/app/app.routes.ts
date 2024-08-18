import { Routes } from '@angular/router';
import { AuthComponent } from './page/auth/auth.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthGuardService } from './services/gaurds/auth-guard/auth-guard.service';

export const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
];
