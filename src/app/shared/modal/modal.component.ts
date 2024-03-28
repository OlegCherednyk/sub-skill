import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalData } from 'src/app/core/interfaces/modal';
import { ButtonComponent } from '../components/button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalData: ModalData | null = null;
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.modalService.closeModal();
  }

  cancel(): void {
    console.log('Нажата кнопка "Отмена"');
    this.closeModal();
  }

  delete(): void {
    this.closeModal();
  }
}
