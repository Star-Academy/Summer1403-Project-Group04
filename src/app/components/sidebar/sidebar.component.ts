import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/user-data';
import { PermisionsService } from '../../services/permisisons/permisions.service';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';

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
    NzAvatarComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  protected userData: UserData = {
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: []
  };
  protected userPermissions: string[] = [];

  constructor(private userService: UserService, private premissionSubject: PermisionsService) {
  }

  ngOnInit() {
    this.premissionSubject.permissions$.subscribe((per) => {
      this.userPermissions = per;
    });

    this.userService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }
}