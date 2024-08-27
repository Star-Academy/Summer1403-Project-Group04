import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { GraphComponent } from './page/graph/graph/graph.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersTableComponent } from './components/manage-users-components/users-table/users-table.component';
import { DashboardGuardService } from './services/gaurds/dashboard-guard/dashboard-guard.service';
import { EditUserComponent } from './components/edit-user-components/edit-user/edit-user.component';
import { ManageUsersGuardService } from './services/gaurds/manage-users/manage-users-guard.service';
import { LandingComponent } from './page/landing/landing.component';
import { DashboardContentComponent } from './components/dashboard-content/dashboard-content.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardContentComponent },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'profile/edit-your-profile',
        component: EditUserComponent,
      },
      {
        path: 'manage-users',
        component: UsersTableComponent,
        canActivate: [ManageUsersGuardService],
      },
      {
        path: 'manage-users/edit',
        component: EditUserComponent,
        canActivate: [ManageUsersGuardService],
      },
      { path: 'graph', component: GraphComponent },
    ],
    canActivate: [DashboardGuardService],
  },
];
