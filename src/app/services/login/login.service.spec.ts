import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [LoginService, HttpClient, HttpHandler],
    });
    service = TestBed.inject(LoginService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD call post method with proper data WHEN submited', () => {
    // Arrange
    const spy = spyOn(httpClient, 'post').and.callThrough();
    const apiUrl = `${environment.API_URL}/api/Auth/Login`;
    const body = { username: 'armin', password: '123' };

    // Act
    service.login('armin', '123');

    // Assert
    expect(spy).toHaveBeenCalledWith(apiUrl, body, {
      headers: jasmine.any(HttpHeaders),
      withCredentials: true
    });
  });

  it('SHOULD call get method with proper data WHEN isLoggedIn is called', () => {
    // Arrange
    const spy = spyOn(httpClient, 'get').and.callThrough();
    const apiUrl = `${environment.API_URL}/api/User/permissions`;

    // Act
    service.isLoggedIn();

    // Assert
    expect(spy).toHaveBeenCalledWith(apiUrl, {
      headers: jasmine.any(HttpHeaders),
      withCredentials: true,
    });
  });
});
