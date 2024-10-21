import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ILogin, ILoginResponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constans';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  onLogin(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        tap((response) => {
          if (response) {
            this.tokenService.setToken(
              response.data.access_token,
              response.data.refresh_token
            );
          }
          // return response;
        })
      );
  }
  onLogout() {
    this.tokenService.removeToken();
  }

  getProfile() {
    return this.http.get<ILoginResponse>(`${apiEndpoint.AuthEndpoint.profile}`);
  }
  getProfile1() {
    return this.http.get<ILoginResponse>(`${apiEndpoint.AuthEndpoint.products}`);
  }
}
