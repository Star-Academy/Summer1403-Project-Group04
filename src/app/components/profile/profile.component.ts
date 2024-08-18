import { Component, OnInit } from '@angular/core';
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user/user.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLinkActive, RouterOutlet, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
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
