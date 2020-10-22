import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user)
      .pipe(
        tap(this.setToken)
      )
      ;
  }

  logout() {
    this.setToken(null);
  }

  private setToken(res): void {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('YABKO_FB_TOKEN_EXP', expDate.toString());
      localStorage.setItem('YABKO_FB_TOKEN', res.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('YABKO_FB_TOKEN_EXP'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('YABKO_FB_TOKEN');
  }

  isAuthenticated() {
    return !!this.token;
  }
}
