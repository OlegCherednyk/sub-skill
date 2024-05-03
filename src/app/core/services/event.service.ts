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
  private modalForHomeSubject = new Subject<void>();
  private closeSignUpFormSubject = new Subject<string>();
  private deleteForOrderCardSubject = new Subject<number>();
  changePasswordEvent$ = this.changePasswordSubject.asObservable();
  forgotPasswordEvent$ = this.forgotPasswordSubject.asObservable();
  notOpenSignUpEvent$ = this.notOpenSignUpSubject.asObservable();
  signUpFormEvent$ = this.signUpFormSubject.asObservable();
  modalEvent$ = this.modalSubject.asObservable();
  modalForHomeEvent$ = this.modalForHomeSubject.asObservable();

  closeSignUpForm$ = this.closeSignUpFormSubject.asObservable();
  deleteForOrderCard$ = this.deleteForOrderCardSubject.asObservable();

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
  emitModalForHomeEvent() {
    console.log('Emitting modal event for HOME');
    this.modalForHomeSubject.next();
  }
  emitCloseSignUpFormEvent(formId: string) {
    console.log('Emitting close sign up form event for form ID:', formId);
    this.closeSignUpFormSubject.next(formId);
  }
  emitDeleteForOrderCardEvent(cardForOrderingId: number) {
    console.log(
      'Emitting delete card for ordering event for form ID:',
      cardForOrderingId
    );
    this.deleteForOrderCardSubject.next(cardForOrderingId);
  }
}
