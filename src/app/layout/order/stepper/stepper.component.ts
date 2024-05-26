import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepService } from 'src/app/core/services/step.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  currentStep: number = 1;

  constructor(private stepService: StepService) {}

  ngOnInit() {
    this.stepService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }
}
