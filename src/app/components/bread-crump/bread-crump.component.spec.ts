import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadCrumpComponent } from './bread-crump.component';
import { Router, NavigationEnd, ActivatedRoute, UrlTree } from '@angular/router';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('BreadCrumpComponent', () => {
  let component: BreadCrumpComponent;
  let fixture: ComponentFixture<BreadCrumpComponent>;
  let mockRouter: {
    events: Subject<any>;
    url: string;
    createUrlTree: jasmine.Spy;
    serializeUrl: jasmine.Spy;
  };
  let mockActivatedRoute: { snapshot: any };

  beforeEach(async () => {
    mockRouter = {
      events: new Subject<any>(),
      url: '/',
      createUrlTree: jasmine.createSpy('createUrlTree').and.callFake((commands: any[]) => {
        return {
          toString: () => commands.join('/'),
        } as any as UrlTree;
      }),
      serializeUrl: jasmine.createSpy('serializeUrl').and.callFake((urlTree: UrlTree) => {
        return urlTree.toString();
      }),
    };
    mockActivatedRoute = { snapshot: { url: [] } };

    await TestBed.configureTestingModule({
      imports: [BreadCrumpComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadCrumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SHOULD be created WHEN ever', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD generate breadcrumbs based on the URL WHEN ever', () => {
    // Arrange
    mockRouter.url = '/dashboard/user/profile';
    
    // Act
    mockRouter.events.next(new NavigationEnd(1, mockRouter.url, mockRouter.url));
    fixture.detectChanges();

    expect(component.breadcrumbs).toEqual([
      { label: 'Dashboard', url: '/dashboard' },
      { label: 'User', url: '/dashboard/user' },
      { label: 'Profile', url: '/dashboard/user/profile' },
    ]);
  });

  it('SHOULD render breadcrumbs correctly in the template WHEN ever', () => {
    // Arrange
    mockRouter.url = '/user/profile';

    // Act
    mockRouter.events.next(new NavigationEnd(1, mockRouter.url, mockRouter.url));
    fixture.detectChanges();

    // Assert
    const breadcrumbItems = fixture.debugElement.queryAll(By.css('nz-breadcrumb-item'));

    expect(breadcrumbItems.length).toBe(3);

    expect(breadcrumbItems[0].nativeElement.textContent.trim()).toContain('');
    expect(breadcrumbItems[1].nativeElement.textContent.trim()).toContain('User');
    expect(breadcrumbItems[2].nativeElement.textContent.trim()).toContain('Profile');
  });

  it('SHOULD handle the case with an empty URL correctly WHEN ever', () => {
    // Arrange
    mockRouter.url = '/';
    
    // Act
    mockRouter.events.next(new NavigationEnd(1, mockRouter.url, mockRouter.url));
    fixture.detectChanges();

    // Assert
    const breadcrumbItems = fixture.debugElement.queryAll(By.css('nz-breadcrumb-item'));
    expect(breadcrumbItems.length).toBe(1);
  });
});
