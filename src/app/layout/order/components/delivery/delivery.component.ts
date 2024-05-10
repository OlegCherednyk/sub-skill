import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit
{
  currentUserEmail!: string | null;
  constructor() { }
  ngOnInit(): void
  {
    this.currentUserEmail = localStorage.getItem('email');
  }
}
