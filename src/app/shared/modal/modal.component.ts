import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Вызов функции для автоматического закрытия модального окна через 2 секунды
    setTimeout(() => {
      this.closeModal();
    }, 2000);
  }

  // Функция для закрытия модального окна
  closeModal(): void {
    const modalElement = document.getElementById('customModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
    }
  }

  // Функция для обработки нажатия на кнопку "Отмена"
  cancel(): void {
    // Добавьте здесь свою логику для кнопки "Отмена"
    console.log('Нажата кнопка "Отмена"');
    this.closeModal(); // Закрытие модального окна после выполнения действия
  }

  // Функция для обработки нажатия на кнопку "Удалить"
  delete(): void {
    // Добавьте здесь свою логику для кнопки "Удалить"
    console.log('Нажата кнопка "Удалить"');
    this.closeModal(); // Закрытие модального окна после выполнения действия
  }
}
