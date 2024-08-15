import { Component } from '@angular/core';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { EditPasswordComponent } from "../edit-password/edit-password.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [EditProfileComponent, EditPasswordComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

}
