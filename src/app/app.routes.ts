import { Routes } from '@angular/router';
import { AuthComponent } from './page/auth/auth.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent }
];
