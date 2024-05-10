import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { StepperComponent } from '../stepper/stepper.component';
import { YourOrderComponent } from '../components/your-order/your-order.component';
import { PersonalInfoComponent } from '../components/personal-info/personal-info.component';
import { DeliveryComponent } from '../components/delivery/delivery.component';
import { PaymentComponent } from '../components/payment/payment.component';
import { StepService } from 'src/app/core/services/step.service';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    StepperComponent,
    YourOrderComponent,
    PersonalInfoComponent,
    DeliveryComponent,
    PaymentComponent,
  ],
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent {
  constructor(private stepService: StepService) {}

  setCurrentStep(step: number) {
    this.stepService.setCurrentStep(step);
  }
}
