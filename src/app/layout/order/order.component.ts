import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepService } from 'src/app/core/services/step.service';
import { StepThreeComponent } from './step-three/step-three.component';
import { SuccessOrderComponent } from './success-order/success-order.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    SuccessOrderComponent
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  currentStep: number = 1;

  constructor(private stepService: StepService) {}

  ngOnInit() {
    this.stepService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }
}
