import { Component, OnInit } from '@angular/core';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { NgParticlesService, NgxParticlesModule } from '@tsparticles/angular';
import { Container, IOptions, Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { config } from '../../models/animation-config';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SignInComponent, NgxParticlesModule, NzIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  id = 'tsparticles';
  animationConfig: IOptions = config as IOptions;

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  particlesLoaded(container: Container): void {
  }
}
