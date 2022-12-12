import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, switchMap } from 'rxjs';
import { TOKEN_KEY } from '../constants/auth-constants';
import { LoginCred } from '../models/login-cred';
import { environment } from '../../environments/environment';
import { URL } from '../constants/urls';
import { LoginResponse } from '../models/login-response';
import { getHttpAuthOption } from '../utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(cred: LoginCred): Observable<any> {
    const url = `${environment.SERVER_URL}${URL.auth.login}`
    // this.http.post(url, cred).subscribe((res) => {
    //   (res as LoginResponse).token
    // })
    // localStorage.setItem(TOKEN_KEY, 'dummy')

    return this.http.post(url, cred).pipe(switchMap((res) => {
      localStorage.setItem(TOKEN_KEY, (res as LoginResponse).token)
      return of(res)
    }))

    // return of('dummy')
  }

  verifyToken(): Observable<any> {
    // const token = localStorage.getItem(TOKEN_KEY)
    return this.http.get(`${environment.SERVER_URL}${URL.auth.verify}`, getHttpAuthOption())
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(TOKEN_KEY)
    return !!token
  }
}
