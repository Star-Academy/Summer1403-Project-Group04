import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD call post method with proper data WHEN submited', () => {
    // Arrange
    const spy = spyOn(httpClient, 'post').and.callThrough();
    const apiUrl = 'http://192.168.24.180:5293/api/Auth/Login';
    const body = { username: 'armin', password: '123' };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Act
    service.login('armin', '123');
    // Assert
    expect(spy).toHaveBeenCalledWith(apiUrl, body, {
      headers: jasmine.any(HttpHeaders),
    });
  });
});
