import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/landing-components/navbar/navbar.component";
import { HeroSectionComponent } from "../../components/landing-components/hero-section/hero-section.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, HeroSectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  protected showLogin = false;

  showLoginForm() {
    this.showLogin = true;
  }
}
