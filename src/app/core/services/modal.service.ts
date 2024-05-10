import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalData } from '../interfaces/modal';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalDataSubject: BehaviorSubject<ModalData> =
    new BehaviorSubject<ModalData>({
      isLogo: false,
      isBookmark: false,
      isProfile: false,

      title: '',
      message: '',
      additionalMessage: '',
      showButtons: false,
    });
  public modalData$: Observable<ModalData> =
    this.modalDataSubject.asObservable();

  constructor(private eventService: EventService) {}

  openModal(data: ModalData): void {
    console.log('openModal', data);
    this.modalDataSubject.next(data);
  }
}
