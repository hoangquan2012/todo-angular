import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { constants } from '../constants/constans';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenService.getToken()}`,
          },
        });
      }
    },
  });

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401 && e.error.name === "access_token") {
        return tokenService.refreshToken().pipe(
          switchMap((data: any) => {
            const token = data.data.access_token;
            localStorage.setItem(constants.access_token, token);
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });

            return next(newReq)
          })
        )
      }
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};
