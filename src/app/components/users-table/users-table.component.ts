import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgFor } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [NzTableModule, NzDividerModule, NgFor , NzPopconfirmModule, NzIconModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  listOfData = [
    {
      key: '1',
      name: 'Admin',
      lastName: 'Admin',
      email: 'Admin@gmail.com',
      role: 'Admin'
    },
    {
      key: '2',
      name: 'Armin',
      lastName: 'Moradi',
      email: 'Arminmow@gmail.com',
      role: 'Front'
    },
    {
      key: '3',
      name: 'Arash',
      lastName: 'Azarpoor',
      email: 'Arash@gmail.com',
      role: 'Front'
    },
    {
      key: '4',
      name: 'Saleh',
      lastName: 'IDK',
      email: 'Saleh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '5',
      name: 'Mamad',
      lastName: 'No idea',
      email: 'Mamad@gmail.com',
      role: 'Dev'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
    {
      key: '4',
      name: 'Sadegh',
      lastName: 'No idea',
      email: 'Sadegh@gmail.com',
      role: 'Back'
    },
  ];
}
