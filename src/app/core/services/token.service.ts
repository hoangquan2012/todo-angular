import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { apiEndpoint, constants } from '../constants/constans';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  getToken(): string | null {
    return localStorage.getItem(constants.access_token);
  }

  setToken(access_token: string, refresh_token: string) {
    this.updateToken(true);
    localStorage.setItem(constants.access_token, access_token);
    localStorage.setItem(constants.refresh_token, refresh_token);
  }

  removeToken() {
    this.updateToken(false);
    localStorage.removeItem(constants.access_token);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(constants.refresh_token);
    return this.http.post(apiEndpoint.AuthEndpoint.refresh, {
      refresh_token: refreshToken,
    });
  }
}
