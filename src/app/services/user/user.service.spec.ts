import { fakeAsync, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserData } from '../../models/user-data';
import { APIResponse } from '../../models/api-response';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete', 'patch']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [UserService, { provide: HttpClient, useValue: httpSpy }, { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(UserService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD update userDataSubject WHEN getCurrentUser is called', () => {
    // Arrange
    const mockUserData: UserData = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      roles: ['user'],
    };
    httpClientSpy.get.and.returnValue(of(mockUserData));

    // Act
    service.getCurrentUser();

    // Assert
    service.userData$.subscribe((userData) => {
      expect(userData).toEqual(mockUserData);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toContain('/api/User');
  });

  it('SHOULD return UserData WHEN getUserById is called', async () => {
    // Arrange
    const mockUserData: UserData = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      roles: ['user'],
    };
    httpClientSpy.get.and.returnValue(of(mockUserData));

    // Act
    const result = await service.getUserById(1);

    // Assert
    expect(result).toEqual(mockUserData);
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toContain('/api/Admin/users/1');
  });

  it('SHOULD return an empty array WHEN getUsers encounters an error', () => {
    // Arrange
    const mockError = new HttpErrorResponse({ error: '404 error', status: 404 });
    httpClientSpy.get.and.returnValue(throwError(() => mockError));

    // Act

    // Assert
    service.getUsers(1).subscribe((response) => {
      expect(response.users).toEqual([]);
      expect(response.allUserCount).toBe(0);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toContain('/api/Admin/users');
  });

  it('SHOULD return APIResponse WHEN deleteUser is called', () => {
    // Arrange
    const mockResponse: APIResponse = { message: 'User deleted successfully' };
    httpClientSpy.delete.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.deleteUser(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.delete.calls.count()).toBe(1);
    expect(httpClientSpy.delete.calls.mostRecent().args[0]).toContain('/api/Admin/users/1');
  });

  it('SHOULD call post method WHEN addUser is called', () => {
    // Arrange
    const mockResponse: APIResponse = { message: 'User added successfully' };
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['value']);
    formGroupMock.value = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.addUser(formGroupMock).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toContain('/api/Admin/users');
  });

  it('SHOULD call put method WHEN updateUser is called', () => {
    // Arrange
    const mockResponse: APIResponse = { message: 'User updated successfully' };
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['value']);
    formGroupMock.value = {
      username: 'updateduser',
      email: 'updated@example.com',
    };
    httpClientSpy.put.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.updateUser(1, formGroupMock, false).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.put.calls.count()).toBe(1);
    expect(httpClientSpy.put.calls.mostRecent().args[0]).toContain('/api/Admin/users/1');
  });

  it('SHOULD call patch method WHEN updatePassword is called', () => {
    // Arrange
    const mockResponse: APIResponse = { message: 'Password updated successfully' };
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    formGroupMock.get.and.callFake((key: string) => {
      return { value: key === 'oldpassword' ? 'oldPass' : 'newPass' };
    });
    httpClientSpy.patch.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.updatePassword(1, formGroupMock, false).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.patch.calls.count()).toBe(1);
    expect(httpClientSpy.patch.calls.mostRecent().args[0]).toContain('/api/Admin/users/1/password');
  });

  it('SHOULD call patch method WHEN updateRole is called', () => {
    // Arrange
    const mockResponse: APIResponse = { message: 'Roles updated successfully' };
    const roles = ['admin', 'user'];
    httpClientSpy.patch.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.updateRole(roles, 1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.patch.calls.count()).toBe(1);
    expect(httpClientSpy.patch.calls.mostRecent().args[0]).toContain('/api/Admin/users/1/roles');
  });

  it('SHOULD call get method WHEN getRoles is called', () => {
    // Arrange
    const mockRoles: string[] = ['admin', 'user'];
    httpClientSpy.get.and.returnValue(of(mockRoles));

    // Act

    // Assert
    service.getRoles().subscribe((response) => {
      expect(response).toEqual(mockRoles);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toContain('/api/Admin/roles');
  });

  it('SHOULD logout successfuly WHEN logout is called', fakeAsync(() => {
    // Arrange
    const mockResponse: APIResponse = { message: 'Logged out successfully' };
    httpClientSpy.post.and.returnValue(of(mockResponse));
    
    // Act
    service.logout().subscribe((response) => {
      // Assert
      expect(response).toEqual(mockResponse);
    });
  
    // Assert
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toContain('/api/User/logout');
  }));
});
