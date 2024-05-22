import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';
import { HttpError } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  private isErrorSubject = new BehaviorSubject<boolean>(false);
  isError$ = this.isErrorSubject.asObservable();

  constructor(private router: Router) {}
  setErrorStatus(status: boolean) {
    this.isErrorSubject.next(status);
  }
  catchErrors(err: HttpErrorResponse, type: string): Observable<HttpError> {
    const error: HttpError = {
      status: err.status,
      message: err.error
        ? err.error.message
        : 'An error occurred during the HTTP request.',
      details: err.message,
    };
    console.log('error', error.status);
    console.log('error type', typeof error.status);
    console.log('type', type);
    if (error.status === 404 && type === 'login') {
      console.log('this.setErrorStatus(true)');
      this.setErrorStatus(true);
      return EMPTY;
      //   console.log('if');

      //   const modalInfo = {
      //     type: 'notification',
      //     isLogo: false,
      //     isBookmark: false,
      //     isProfile: false,
      //     title: 'ERROR',
      //     message:
      //       'Invalid credentials. Please check your login and password and try again.',
      //     additionalMessage: '',
      //     isVisible: true,
      //     isSuccess: false,
      //     showButtons: false,
      //     modalType: 'Big',
      //   };
      //   this.modalService.openModal(modalInfo);
    } else if (error.status === 500) {
      console.log('500 500 500 500 500');
      this.router.navigate(['/server-error']);
      return EMPTY;
      //   console.log('if');

      //   const modalInfo = {
      //     type: 'notification',
      //     isLogo: false,
      //     isBookmark: false,
      //     isProfile: false,
      //     title: 'ERROR',
      //     message:
      //       'Invalid credentials. Please check your login and password and try again.',
      //     additionalMessage: '',
      //     isVisible: true,
      //     isSuccess: false,
      //     showButtons: false,
      //     modalType: 'Big',
      //   };
      //   this.modalService.openModal(modalInfo);
    }
    return throwError(
      () => new Error('Something bad happened; please try again.')
    );

    return throwError(
      () => new Error('Something bad happened; please try again.')
    );
  }

  // handleHttpError<T>(err: HttpErrorResponse, type: string): Observable<T> {
  //   return this.catchErrors(err, type).pipe(switchMap(() => EMPTY));
  // }
  handleHttpError<T>(err: HttpErrorResponse, type: string): Observable<T> {
    return this.catchErrors(err, type).pipe(
      switchMap(() => {
        this.setErrorStatus(true); // Установка статуса ошибки
        return EMPTY;
      })
    );
  }
}
