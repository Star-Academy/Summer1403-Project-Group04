import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/user-data';
import { PermisionsService } from '../../services/permisisons/permisions.service';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  protected userData: UserData = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
  };
  protected userPermissions: string[] = [];

  constructor(
    private userService: UserService,
    private premissionSubject: PermisionsService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.premissionSubject.permissions$.subscribe((per) => {
      this.userPermissions = per;
    });

    this.userService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  protected logout() {
    this.userService.logout().subscribe({
      next: (response) => {
        this.notificationService.createNotification('success', 'Success', response.message);

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Old password is wrong!';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }
}
