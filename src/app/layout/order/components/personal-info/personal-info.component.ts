import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepService } from 'src/app/core/services/step.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit
{
  currentUserName!: string | null;
  currentUserEmail!: string | null;

  constructor(private stepService: StepService) { }
  ngOnInit(): void
  {
    this.currentUserEmail = localStorage.getItem('email');
    this.currentUserName = localStorage.getItem('username');
  }
}