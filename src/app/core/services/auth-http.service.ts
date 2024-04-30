import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { base_url } from '../core_variables';
import {
  ChangePasswordBody,
  ProfessionAllBody,
  SignInBody,
  SignInResponseBody,
  SignUpRequestBody,
  SignUpResponse,
  UpdateUserRequestBody,
  UpdateUserResponseBody,
} from '../interfaces/auth';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  signUpPath = 'auth/register';
  singInPath = 'auth/login';
  getUserNamePath = 'users/all';
  deleteUserPath = 'users/delete';
  updateUserPath = 'users/update';

  changePasswordPath = 'users/password';
  getProfessionAllPath = 'profession/all';
  getTechnologyProfessionPath = 'technology/profession';
  getInterestAllPath = 'interest/all';
  getPasswordRecoveryPath = 'users/password-email';

  postInterestPath = 'interest/add';
  deleteInterestPath = 'interest';

  constructor(
    private httpClient: HttpClient,
    private httpErrorService: HttpErrorService
  ) {
  }

  authToken = localStorage.getItem('token') as string;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.authToken}`,
  });
 createHeaders(): Record<string, string> {
    const authToken = localStorage.getItem('token') as string;
    return {
      Authorization: `Bearer ${authToken}`,
    };
  }
  public signUpHttp(body: SignUpRequestBody) {
    console.log('Request URL:', base_url + this.signUpPath);
    console.log('Request Body:', body);
    return this.httpClient
      .post<SignUpResponse>(base_url + this.signUpPath, body)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<SignUpResponse>(err, 'signin')
        )
      );
  }

  public logInHttp(params: SignInBody): Observable<SignInResponseBody> {
    return this.httpClient
      .post<SignInResponseBody>(base_url + this.singInPath, params)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<SignInResponseBody>(
            err,
            'login'
          )
        )
      );
  }

  public changePasswordHttp(
    email: string,
    body: ChangePasswordBody
  ): Observable<ChangePasswordBody> {
    const paramsString = new HttpParams().set('email', email.toString());

    return this.httpClient
      .put<ChangePasswordBody>(base_url + this.changePasswordPath, body, {
        params: paramsString,
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<ChangePasswordBody>(
            err,
            'changePassword'
          )
        )
      );
  }

  public getUsersHttp(): Observable<any> {
    return this.httpClient
      .get<any>(base_url + this.getUserNamePath, {
        headers: new HttpHeaders().set('Authorization', `${this.authToken}`),
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<string>(err, 'getUsers')
        )
      );
  }

  public deleteUserHttp(): Observable<any> {
    return this.httpClient
      .delete<any>(base_url + this.deleteUserPath,    { headers: this.createHeaders()
    })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<string>(err, 'deleteUser')
        )
      );
  }
  public getProfessionAllHttp(): Observable<ProfessionAllBody[]> {
    return this.httpClient
      .get<ProfessionAllBody[]>(base_url + this.getProfessionAllPath, {
        headers: new HttpHeaders().set('Authorization', `${this.authToken}`),
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<ProfessionAllBody[]>(
            err,
            'getProfession'
          )
        )
      );
  }
  public getTechnologyProfessionHttp(
    name: string
  ): Observable<ProfessionAllBody[]> {
    const url = `${base_url}${this.getTechnologyProfessionPath}/${name}`;
    return this.httpClient
      .get<ProfessionAllBody[]>(url, {
        headers: new HttpHeaders().set('Authorization', `${this.authToken}`),
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<ProfessionAllBody[]>(
            err,
            'getTechnology'
          )
        )
      );
  }

  public getInterestAllHttp(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(base_url + this.getInterestAllPath, {
        headers: new HttpHeaders().set('Authorization', `${this.authToken}`),
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<string[]>(err, 'getInterestAll')
        )
      );
  }

  public addInterestHttp(body: string[]): Observable<string[]> {
    const url = `${base_url}${this.postInterestPath}`;
console.log('public addInterestHttp', body);
    return this.httpClient
      .post<string[]>(url, body, {
        headers: new HttpHeaders().set('Authorization', `${this.authToken}`),
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<string[]>(err, 'postInterest')
        )
      );
  }
  public deleteInterestHttp(tags: string[]): Observable<string[]> {
    console.log('public deleteInterestHttp', tags);

    const url = `${base_url}${this.deleteInterestPath}`;
    const paramsString = new HttpParams().set('tags', tags.toString());
    return this.httpClient
      .delete<string[]>(url, {
        params: paramsString,
        headers: new HttpHeaders().set('Authorization', `${this.authToken}`),
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<string[]>(err, 'postInterest')
        )
      );
  }
  public forgotPasswordHttp(email: string): Observable<any> {
    const paramsString = new HttpParams().set('mail', email);

    return this.httpClient
      .post(base_url + this.getPasswordRecoveryPath,{}, {
        params: paramsString,
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.httpErrorService.handleHttpError<any>(err, 'getForgotPassword')
        )
      );
  }

  public updateUserHttp(body: UpdateUserRequestBody) {
  
    return this.httpClient.put<UpdateUserResponseBody>(
      base_url + this.updateUserPath,
      body,
      { headers: this.createHeaders() }
    ).pipe(
      catchError((err: HttpErrorResponse) =>
        this.httpErrorService.handleHttpError<UpdateUserResponseBody>(
          err,
          'update'
        )
      )
    );
  }
  
}
