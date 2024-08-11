import { Component, OnInit } from '@angular/core';
import { SignInComponent } from "../../components/sign-in/sign-in.component";
import { SignUpComponent } from "../../components/sign-up/sign-up.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SignInComponent, SignUpComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  protected action: string;

  constructor(private route : ActivatedRoute)  {
    this.action = window.location.pathname.split('/')[2];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
      this.action = param.get('action') || '';
    })
  }

}
