import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected userData: UserData = {
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: []
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }
}
