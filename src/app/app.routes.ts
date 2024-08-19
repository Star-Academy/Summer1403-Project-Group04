import { Routes } from '@angular/router';
import { AuthComponent } from './page/auth/auth.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthGuardService } from './services/gaurds/auth-guard/auth-guard.service';
import { GraphComponent } from './page/graph/graph/graph.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { DashboardGuardService } from './services/gaurds/dashboard-guard/dashboard-guard.service';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ManageUsersGuardService } from './services/gaurds/manage-users/manage-users-guard.service';

export const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AuthGuardService] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile/edit-your-profile',
        component: EditUserComponent
      },
      {
        path: 'manage-users',
        component: UsersTableComponent,
        canActivate: [ManageUsersGuardService]
      }
    ],
    canActivate: [DashboardGuardService],
  },
   { path: 'graph', component: GraphComponent, canActivate: [AuthGuardService] },
];
