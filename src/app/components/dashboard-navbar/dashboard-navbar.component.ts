import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [NzDropdownMenuComponent, NzDropDownModule, NzIconModule, RouterLink],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.scss',
})
export class DashboardNavbarComponent implements OnInit {
  @Output() toggle = new EventEmitter();
  private isCollapsed = false;
  public userData: UserData = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
  };

  constructor(private userService: UserService, private notificationService: NotificationService, private router: Router) {}

  ngOnInit() {
    this.userService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  logout() {
    this.userService.logout().subscribe({
      next: (response) => {
        this.notificationService.createNotification('success', 'Success', response.message);

        setTimeout(() => this.router.navigate(['/']), 2000);
      },
    });
  }

  setUserData(data: UserData) {
    this.userData = data;
  }
}
