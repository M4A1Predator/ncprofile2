import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TOKEN_KEY } from '../constants/auth-constants';
import { LoginCred } from '../models/login-cred';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(cred: LoginCred): Observable<any> {
    localStorage.setItem(TOKEN_KEY, 'dummy')
    return of('dummy')
  }

  verifyToken() {
    const token = localStorage.getItem(TOKEN_KEY)
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(TOKEN_KEY)
    return !!token
  }
}
