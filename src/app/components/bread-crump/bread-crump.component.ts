import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bread-crump',
  standalone: true,
  imports: [NzBreadCrumbComponent, NzBreadCrumbItemComponent, NgIf, NgFor, RouterLink],
  templateUrl: './bread-crump.component.html',
  styleUrl: './bread-crump.component.scss',
})
export class BreadCrumpComponent implements OnInit {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.generateBreadcrumbs();
    });

    this.generateBreadcrumbs();
  }

  private generateBreadcrumbs() {
    const urlParts = this.router.url.split('/').filter((part) => part);
    this.breadcrumbs = urlParts.map((part, index) => {
      const url = '/' + urlParts.slice(0, index + 1).join('/');
      const label = this.formatLabel(part);
      return { label, url };
    });
  }

  private formatLabel(part: string): string {
    part = part.split('?')[0];
    return part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
  }
}
