import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { base_url } from '../core_variables';
import {
  ChangePasswordBody,
  SignInBody,
  SignInResponseBody,
  SignUpBody,
  SignUpRequestBody,
  SignUpResponse,
} from '../interfaces/auth';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  signUpPath = 'auth/register';
  singInPath = 'auth/login';
  changePasswordPath = 'users/password';
  constructor(
    private httpClient: HttpClient,
    private httpErrorService: HttpErrorService
  ) {}

  authToken = localStorage.getItem('token') as string;

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });
  public signUpHttp(body: SignUpRequestBody) {
    console.log('Request URL:', base_url + this.signUpPath);
    console.log('Request Body:', body);
    return this.httpClient
      .post<SignUpResponse>(base_url + this.signUpPath, body)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<SignUpResponse>(err)
        )
      );
  }

  public logInHttp(params: SignInBody): Observable<SignInResponseBody> {
    return this.httpClient
      .post<SignInResponseBody>(base_url + this.singInPath, params)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<SignInResponseBody>(err)
        )
      );
  }

  public changePasswordHttp(
    params: ChangePasswordBody
  ): Observable<ChangePasswordBody> {
    return this.httpClient
      .put<ChangePasswordBody>(base_url + this.changePasswordPath, params, {
        headers: this.headers,
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<ChangePasswordBody>(err)
        )
      );
  }
}
