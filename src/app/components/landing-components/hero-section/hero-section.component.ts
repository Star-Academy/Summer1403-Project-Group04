import { Component, OnInit } from '@angular/core';
import { NgParticlesService, NgxParticlesModule } from '@tsparticles/angular';
import { Container, IOptions, Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { config } from '../../../models/animation-config';
import { LoginFormComponent } from "../login-form/login-form.component";

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgxParticlesModule, NzIconModule, LoginFormComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {
  id = 'tsparticles';
  animationConfig: IOptions = config as IOptions;

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

   /* eslint-disable @typescript-eslint/no-unused-vars */
   particlesLoaded(container: Container): void {
    // Placeholder implementation
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

}
