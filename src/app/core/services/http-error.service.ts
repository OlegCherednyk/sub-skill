import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, switchMap, throwError } from 'rxjs';
import { HttpError } from '../interfaces/auth';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor(private modalService: ModalService) {}

  catchErrors(err: HttpErrorResponse): Observable<HttpError> {
    const error: HttpError = {
      status: err.status,
      message:
        err.error.message || 'An error occurred during the HTTP request.',
      details: err.message,
    };
    this.modalService.openModal(error.message);

    return throwError(
      () => new Error('Something bad happened; please try again.')
    );
  }

  handleHttpError<T>(err: HttpErrorResponse): Observable<T> {
    return this.catchErrors(err).pipe(switchMap(() => EMPTY));
  }
}
