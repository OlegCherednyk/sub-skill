import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { base_url } from '../core_variables';
import {
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
  constructor(
    private httpClient: HttpClient,
    private httpErrorService: HttpErrorService
  ) {}

  public signUp(body: SignUpRequestBody) {
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

  public singIn(params: SignInBody): Observable<SignInResponseBody> {
    return this.httpClient
      .post<SignInResponseBody>(base_url + this.singInPath, params)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<SignInResponseBody>(err)
        )
      );
  }
}
