import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  ChangePasswordBody,
  SignInBody,
  SignUpBody,
  SignUpRequestBody,
} from '../interfaces/auth';
import { HttpAuthService } from './auth-http.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token = '';
  isSingInFromStorage = !!localStorage.getItem('token');
  isSingIn$ = new BehaviorSubject(this.isSingInFromStorage);

  constructor(
    private modalService: ModalService,
    private httpService: HttpAuthService,
    private router: Router
  ) {}
  logged(): boolean {
    return !!localStorage.getItem('token');
  }

  signUp(data: SignUpRequestBody): void {
    console.log('data', data);
    this.httpService.signUpHttp(data).subscribe(resp => {
      // localStorage.setItem('token', resp as unknown as string);

      console.log('resp', resp);
      if (typeof resp === 'object' && 'token' in resp) {
        console.log('HOORAY');
        console.log('token', resp.token);

        localStorage.setItem('token', resp.token as string);
        localStorage.setItem('username', data.username);
        let modalInfo = {
          title: 'Success',
          message: `Your account created successfully!`,
          isVisible: true,
          showButtons: false,
        };
        // this.router.navigate(['signin']);
        this.modalService.openModal(modalInfo);
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
        localStorage.setItem('username', data.username);
        localStorage.setItem('password', data.password);

        // this.router.navigate(['signin']);
        let modalInfo = {
          title: 'Success',
          message: `Hello, ${data.username}!`,
          isVisible: true,
          showButtons: false,
        };
        this.modalService.openModal(modalInfo);
      }
    });
  }

  changePassword(data: ChangePasswordBody): void {
    console.log('data', data);
    this.httpService.changePasswordHttp(data).subscribe(resp => {
      localStorage.setItem('password', data.password);

      console.log('resp', resp);
      if (resp === null) {
        let modalInfo = {
          title: 'Changing password',
          message: `Your password successfully changed! Check password information on your email.`,
          isVisible: true,
          showButtons: false,
        };
        this.modalService.openModal(modalInfo);
      }
    });
  }
}
