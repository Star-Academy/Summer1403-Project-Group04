import { Component, OnInit } from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgFor } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddUserComponent } from '../add-user/add-user.component';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { UserData } from '../../models/user-data';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    NzTableModule,
    NzDividerModule,
    NgFor,
    NzPopconfirmModule,
    NzIconModule,
    AddUserComponent,
    NzPaginationComponent,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  listOfData: UserData[] = [];
  protected isVisible = false;
  protected isLoading = true;
  protected pageSize = 10;
  protected pageIndex = 1;
  protected currentPage = 1;
  protected total = 2;

  constructor(private userService: UserService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex - 1, this.pageSize);
  }

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.isLoading = true;
    this.userService.getUsers(pageIndex, pageSize).subscribe({
      next: (data) => {
        this.listOfData = data;
        this.total = data.length;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.listOfData = [];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex - 1, pageSize);
  }

  protected showModal(): void {
    this.isVisible = true;
  }

  protected closeModal(): void {
    this.isVisible = false;
  }

  protected handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  protected handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  editUser(user: UserData): void {
    // this.userService.editUser(user);
  }

  deleteUser(user: UserData): void {
    this.userService.deleteUser(user.id).subscribe({
      next: (response) => {
        if (response && response.message === "User Deleted successfully!") {
          this.notification.createNotification('success', 'User deleted', `User ${user.username} has been deleted`);
          this.loadDataFromServer(this.pageIndex - 1, this.pageSize);
        } else {
          this.notification.createNotification('error', 'Error deleting user', `User ${user.username} could not be deleted`);
        }
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.notification.createNotification('error', 'Error deleting user', `User ${user.username} could not be deleted`);
      }
    });
  }
}
