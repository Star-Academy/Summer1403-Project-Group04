import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { EditPasswordComponent } from "../edit-password/edit-password.component";
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user/user.service';
import { PermisionsService } from '../../services/permisisons/permisions.service';
import { EditRoleComponent } from "../edit-role/edit-role.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [EditProfileComponent, EditPasswordComponent, EditRoleComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
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
