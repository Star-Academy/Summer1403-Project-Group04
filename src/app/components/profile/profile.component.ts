import { Component, OnInit } from '@angular/core';
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user/user.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadCrumpComponent } from '../bread-crump/bread-crump.component';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { NgFor } from '@angular/common';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { faker, Faker } from '@faker-js/faker';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    BreadCrumpComponent,
    NzAvatarComponent,
    NzTypographyComponent,
    NgFor,
    NzTagComponent,
    NzButtonComponent,
    NzIconModule,
    NzDescriptionsModule,
    NzDividerComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  protected userData: UserData = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [],
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }
  protected getRoleColor(role: string): string {
    switch (role) {
      case 'Admin':
        return 'green';
      case 'DataAdmin':
        return 'orange';
      case 'DataAnalyst':
        return 'blue';
      default:
        return 'default';
    }
  }

  fakeShit(type: string) {
    switch (type) {
      case 'city':
        return faker.location.city();
      case 'country':
        return faker.location.country();

      case 'tel':
        return faker.phone.number();

      case 'address':
        return `${faker.location.street()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()}`;

      default:
        return '';
    }
  }
}
