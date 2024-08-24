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
import { faker } from '@faker-js/faker';
import { getRoleColor } from '../../models/role-color';

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

  protected fakeData = {
    country: '',
    city: '',
    tel: '',
    address: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userData$.subscribe((userData) => {
      this.userData = userData;
    });

    this.generateFakeData();
  }

  protected generateFakeData() {
    this.fakeData = {
      country: faker.location.country(),
      city: faker.location.city(),
      tel: faker.phone.number(),
      address: `${faker.location.street()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()}`,
    };
  }

  protected getRoleColor(role: string): string {
    return getRoleColor(role);
  }
}
