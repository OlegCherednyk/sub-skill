import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  openModal(errorMessage: string): void {
    this.errorMessage$.next(errorMessage);
    //модальное окно здесь
  }
}
