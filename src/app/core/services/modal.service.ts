import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalData } from '../interfaces/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalDataSubject: BehaviorSubject<ModalData> =
    new BehaviorSubject<ModalData>({
      title: '',
      message: '',
      isVisible: false,
      showButtons: false,
    });
  public modalData$: Observable<ModalData> =
    this.modalDataSubject.asObservable();

  constructor() {}

  openModal(data: ModalData): void {
    this.modalDataSubject.next(data);
  }
  closeModal(): void {
    const data: ModalData = {
      title: '',
      message: '',
      isVisible: false,
      showButtons: false,
    };
    this.modalDataSubject.next(data);
  }
}
