import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../stepper/stepper.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeliveryComponent } from '../components/delivery/delivery.component';
import { PaymentComponent } from '../components/payment/payment.component';
import { StepService } from 'src/app/core/services/step.service';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    CommonModule,
    StepperComponent,
    ButtonComponent,
    RouterModule,
    FormsModule,
    DeliveryComponent,
    PaymentComponent
  ],
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
  currentUserEmail!: string | null;
  isByCard!: false;
  constructor(private stepService: StepService) {}
  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('email');
  }
 setCurrentStep(step: number) {
    this.stepService.setCurrentStep(step);
  }
}
