import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, map, switchMap, take, tap, throwError } from 'rxjs';
import { constants } from '../constants/constans';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject(null);
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
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            tap((token) => console.log("token 1", token)),
            filter(result => result !== null),
            take(1),
            switchMap((token) => {
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
  
              return next(newReq)
            })
          );
        } else {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return tokenService.refreshToken().pipe(
            switchMap((data: any) => {
              isRefreshing = false;
              const token = data.data.access_token;
              refreshTokenSubject.next(token);
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
      }
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};
