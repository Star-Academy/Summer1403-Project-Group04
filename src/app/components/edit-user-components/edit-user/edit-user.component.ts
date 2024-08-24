import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditPasswordComponent } from '../edit-password/edit-password.component';
import { UserData } from '../../../models/user-data';
import { UserService } from '../../../services/user/user.service';
import { PermisionsService } from '../../../services/permisisons/permisions.service';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { BreadCrumpComponent } from "../../bread-crump/bread-crump.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [EditProfileComponent, EditPasswordComponent, EditRoleComponent, NgIf, BreadCrumpComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  protected userData?: UserData;
  protected userPermissions: string[] = [];

  constructor(
    private userService: UserService,
    private premissionSubject: PermisionsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.premissionSubject.permissions$.subscribe((per) => {
      this.userPermissions = per;
    });
    
    this.activeRoute.queryParams.subscribe(async (params) => {
      if (params['id']) {
        this.userData = await this.userService.getUserById(params['id']);
      } else {
        this.userService.userData$.subscribe((userData) => {
          this.userData = userData;
        });
      }
    });
  }
}
