import { Component, OnInit } from '@angular/core';
import { SignInComponent } from "../../components/sign-in/sign-in.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SignInComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
