import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  counter: number = 0;
  constructor(
    private router: Router
  ) {
  }
  toCartPage(){
    this.router.navigate(['cart']);
  }
}
