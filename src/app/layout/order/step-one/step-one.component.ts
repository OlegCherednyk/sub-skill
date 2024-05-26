import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../stepper/stepper.component';
import { OrderInfoComponent } from '../../shoping-cart/order-info/order-info.component';
import { OrderTotalComponent } from '../../shoping-cart/order-total/order-total.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { StepService } from 'src/app/core/services/step.service';
import { RouterModule } from '@angular/router';
import { PersonalInfoComponent } from '../components/personal-info/personal-info.component';
import { YourOrderComponent } from '../components/your-order/your-order.component';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    CommonModule,
    StepperComponent,
   PersonalInfoComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    YourOrderComponent,
    RouterModule
  ],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent{


  constructor(private stepService: StepService) {}


  setCurrentStep(step: number) {
    this.stepService.setCurrentStep(step);
  }
}
