import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EditUserComponent } from './edit-user.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { PermisionsService } from '../../../services/permisisons/permisions.service';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  // Mock data
  const mockUserData = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    roles: ['user']
  };

  // Mock services
  const mockUserService = {
    getUserById: jasmine.createSpy('getUserById').and.returnValue(Promise.resolve(mockUserData)),
    userData$: of(mockUserData)
  };

  const mockPermisionService = {
    permissions$: of(['read', 'write'])
  };

  // Mock ActivatedRoute
  const mockActivatedRoute = {
    queryParams: of({ id: 1 })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: mockUserService },
        { provide: PermisionsService, useValue: mockPermisionService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
