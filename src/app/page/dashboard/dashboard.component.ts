import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SignInComponent } from "../../components/sign-in/sign-in.component";
import { AuthComponent } from "../auth/auth.component";
import { UsersTableComponent } from "../../components/users-table/users-table.component";
import { EditUserComponent } from "../../components/edit-user/edit-user.component";
import { ProfileComponent } from "../../components/profile/profile.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    SidebarComponent,
    SignInComponent,
    AuthComponent,
    UsersTableComponent,
    EditUserComponent,
    ProfileComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
