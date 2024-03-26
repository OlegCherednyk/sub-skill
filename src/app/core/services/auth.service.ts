import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SignInBody, SignUpBody, SignUpRequestBody } from '../interfaces/auth';
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
    this.httpService.signUp(data).subscribe(resp => {
      if (typeof resp === 'object' && 'token' in resp) {
        console.log('HOORAY');
        localStorage.setItem('token', resp.token as string);
        // this.router.navigate(['signin']);
        const message = `Your account created successfully!`;
        this.modalService.openModal(message);
      }
    });
  }

}
