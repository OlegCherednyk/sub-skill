import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}
  private changePasswordSubject = new Subject<void>();
  private forgotPasswordSubject = new Subject<void>();
  private notOpenSignUpSubject = new Subject<void>();
  private signUpFormSubject = new Subject<void>();
  private modalSubject = new Subject<void>();
  changePasswordEvent$ = this.changePasswordSubject.asObservable();
  forgotPasswordEvent$ = this.forgotPasswordSubject.asObservable();
  notOpenSignUpEvent$ = this.notOpenSignUpSubject.asObservable();
  signUpFormEvent$ = this.signUpFormSubject.asObservable();
  modalEvent$ = this.modalSubject.asObservable();
  emitchangePasswordEvent() {
    console.log('Emitting change password event');
    this.changePasswordSubject.next();
  }
  emitforgotPasswordEvent() {
    console.log('Emitting forgot password event');
    this.forgotPasswordSubject.next();
  }
  emitNotOpenSignUpEvent() {
    console.log('Emitting not open password event');
    this.notOpenSignUpSubject.next();
  }
  emitSignUpFormEvent() {
    console.log('Emitting sign up form event');
    this.signUpFormSubject.next();
  }
  emitModalEvent() {
    console.log('Emitting modal event');
    this.modalSubject.next();
  }
}
