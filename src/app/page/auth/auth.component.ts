import {Component} from '@angular/core';
import {SignInComponent} from "../../components/sign-in/sign-in.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SignInComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
