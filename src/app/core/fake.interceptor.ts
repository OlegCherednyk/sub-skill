// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable()
// export class FakeInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     if (request.url.endsWith('/profession/all')) {
//       return throwError(
//         new HttpErrorResponse({
//           status: 500,
//           statusText: 'Internal Server Error',
//         })
//       );
//     }
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         return throwError(error);
//       })
//     );
//   }
// }
