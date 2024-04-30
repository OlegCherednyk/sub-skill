import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  ChangePasswordBody,
  ForgotPasswordBody,
  SignUpRequestBody,
  UpdateUserRequestBody,
} from '../interfaces/auth';
import { HttpAuthService } from './auth-http.service';
import { EventService } from './event.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isModalTypeOpenSubject = new BehaviorSubject<boolean>(false);
  isModalTypeOpen$ = this.isModalTypeOpenSubject.asObservable();
  public token = '';
  isSingInFromStorage = !!localStorage.getItem('token');
  isSingIn$ = new BehaviorSubject(this.isSingInFromStorage);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  public username$ = this.usernameSubject.asObservable();
  private redirectUrl: string | null = null;

  constructor(
    private modalService: ModalService,
    private httpService: HttpAuthService,
    private router: Router,
    private eventService: EventService
  ) {}

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
    console.log('this.redirectUrl', this.redirectUrl);
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }
  setModalStatus(status: boolean) {
    console.log('setModalStatus', status);
    this.isModalTypeOpenSubject.next(status);
  }

  logged(): boolean {
    return !!localStorage.getItem('token');
  }

  signUp(data: SignUpRequestBody): void {
    console.log('data', data);
    this.httpService.signUpHttp(data).subscribe(resp => {
      console.log('resp', resp);
      if (typeof resp === 'object' && 'token' in resp) {
        console.log('HOORAY');
        console.log('token', resp.token);

        localStorage.setItem('token', resp.token as string);
        localStorage.setItem('username', data.username);
        localStorage.setItem('password', data.password);
        localStorage.setItem('email', data.email);

        this.setUsername(data.username);

        let modalInfo = {
          type: 'confirmation',

          isLogo: true,
          isBookmark: false,
          isProfile: true,

          title: `Welcome, ${data.username}`,
          message: `You can always change your data on Profile page!`,
          additionalMessage: '',
          showButtons: false,
        };
        this.modalService.openModal(modalInfo);
        this.eventService.emitNotOpenSignUpEvent();
        this.eventService.emitModalEvent();
      }
    });
  }

  logIn(data: SignUpRequestBody): void {
    console.log('data', data);

    this.httpService.logInHttp(data).subscribe(resp => {
      console.log('resp', resp);
      if (typeof resp === 'object' && 'token' in resp) {
        console.log('HOORAY');
        console.log('token', resp.token);

        localStorage.setItem('token', resp.token as string);
        localStorage.setItem('password', data.password);
        localStorage.setItem('email', data.email);

        this.httpService.getUsersHttp().subscribe(responce => {
          const emailToFind = data.email;
          const username = responce.find(
            (user: { email: any }) => user.email === emailToFind
          );
          localStorage.setItem('username', username.username);
          this.setUsername(username.username);
          let modalInfo = {
            isLogo: true,
            isBookmark: true,
            isProfile: false,

            title: `Welcome back, ${username.username}!`,
            message: `Your Skills waiting for you, check it!`,
            additionalMessage: '',
            showButtons: false,
          };
          this.modalService.openModal(modalInfo);
          this.eventService.emitNotOpenSignUpEvent();
          this.eventService.emitModalEvent();
        });
      }
    });
  }
  setUsername(username: string | null) {
    this.usernameSubject.next(username);
  }

  changePassword(data: ChangePasswordBody): void {
    console.log('data', data);
    const email = localStorage.getItem('email');
    if (email) {
      this.httpService.changePasswordHttp(email, data).subscribe(resp => {
        localStorage.setItem('password', data.password);

        console.log('resp', resp);
        if (resp === null) {
          let modalInfo = {
            isLogo: false,
            isBookmark: false,
            isProfile: false,

            title: 'Changing password',
            message: `Your password successfully changed! Check password information on your email.`,
            additionalMessage: '',
            showButtons: false,
          };
          this.modalService.openModal(modalInfo);
          this.eventService.emitchangePasswordEvent();
          this.eventService.emitSignUpFormEvent();
          this.eventService.emitModalEvent();
        }
      });
    }
  }
  forgotPassword(data: ForgotPasswordBody): void {
    console.log('data', data);
    this.httpService.forgotPasswordHttp(data.email).subscribe(resp => {
      console.log('resp', resp);
      if (resp) {
        localStorage.setItem('password', resp);

        let modalInfo = {
          isLogo: true,
          isBookmark: false,
          isProfile: false,

          title: 'Password recovery',
          message: `We sent you a password recovery link to ${data.email} `,
          additionalMessage: 'Check your e-mail',
          showButtons: false,
        };
        this.modalService.openModal(modalInfo);
      }
    });
  }
  deleteAccount(): void {
    this.httpService.deleteUserHttp().subscribe(resp => {
      if (resp === null) {
        let modalInfo = {
          isLogo: true,
          isBookmark: false,
          isProfile: false,

          title: 'Your account is deleted',
          message: `We are so sorry that you left ☹️
          Your data has been deleted from our database.
          But you can join us again at any time. Waiting for you again!`,
          additionalMessage: '',
          showButtons: false,
        };
        this.modalService.openModal(modalInfo);
        this.router.navigate(['']);
        this.eventService.emitModalEvent();
      }
    });
  }
  // updateUser(data: UpdateUserRequestBody): void {
  //   this.httpService.updateUserHttp(data).subscribe(resp => {
  //     if (typeof resp === 'object' && 'username' in resp)
  //       localStorage.setItem('username', data.username);
  //     localStorage.setItem('email', data.email);
  //     this.setUsername(data.username);

  // let modalInfo = {
  //   isLogo: true,
  //   isBookmark: false,
  //   title: 'Your account is deleted',
  //   message: `We are so sorry that you left ☹️
  //   Your data has been deleted from our database.
  //   But you can join us again at any time. Waiting for you again!`,
  //   additionalMessage: '',
  //   showButtons: false,
  //   modalType: 'Big',
  // };
  // this.modalService.openModal(modalInfo);
  // }
  // });
  // }
}
