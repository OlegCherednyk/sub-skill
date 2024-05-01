import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfessionAllBody, ProfileBody } from 'src/app/core/interfaces/auth';
import { HttpAuthService } from 'src/app/core/services/auth-http.service';
import { EventService } from 'src/app/core/services/event.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  showPassword = false;
  isFormDirty: boolean = false;
  public profileInfo$!: Observable<ProfileBody>;
  public profile!: ProfileBody;
  password: string | null = '';
  profileForm!: FormGroup;
  selectedInterests: string[] = [];
  professions: ProfessionAllBody[] = [];
  // dropdownOpen: { [key: number]: boolean } = {};
  // technologies: { [key: number]: ProfessionAllBody[] } = {};
  // selectedTechnologies: { [key: number]: number } = {};
  requestData = {} as ProfileBody;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpAuthService,
    private eventService: EventService,
    private modalService: ModalService,
    private authService: AuthService
  ) {}
  // toggleDropdown(professionId: number): void {
  //   this.dropdownOpen[professionId] = !this.dropdownOpen[professionId];
  // }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.password = localStorage.getItem('password');
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.profileInfo$ = this.httpService.getUsersHttp().pipe(
      tap(data => {
        console.log('Данные с сервера:', data);
      }),

      map((profiles: ProfileBody[]) => {
        const currentUserEmail = localStorage.getItem('email');
        const currentUserName = localStorage.getItem('username');

        const currentUser = profiles.find(
          profile =>
            profile.email === currentUserEmail &&
            profile.username === currentUserName
        );

        if (currentUser) {
          this.profile = currentUser;
          return currentUser;
        } else {
          throw new Error('Account is not found.');
        }
      })
    );
    this.httpService.getInterestAllHttp().subscribe(
      (interests: ProfessionAllBody[]) => {
        this.selectedInterests = interests.map(interest => interest.name);
        console.log('this.selectedInterests', this.selectedInterests);
      },
      (error: any) => {
        console.error('Error fetching interests:', error);
      }
    );

    this.httpService.getProfessionAllHttp().subscribe(
      (professions: ProfessionAllBody[]) => {
        this.professions = professions;
        console.log('this.professions', this.professions);

        // professions.forEach(profession => {
        //   this.httpService
        //     .getTechnologyProfessionHttp(profession.name)
        //     .subscribe({
        //       next: (technologies: ProfessionAllBody[]) => {
        //         this.technologies[profession.id] = technologies;
        //       },
        //       error: (error: any) => {
        //         console.error(
        //           'Error fetching technologies for profession',
        //           profession.name,
        //           ':',
        //           error
        //         );
        //       },
        //     });
        // });
      },
      (error: any) => {
        console.error('Error fetching professions:', error);
      }
    );
  }

  toggleInterest(interest: string): void {
    console.log('toggleInterest');

    if (this.selectedInterests.includes(interest)) {
      this.deleteInterest(interest);
    } else {
      this.selectedInterests.push(interest);
      this.addInterest(interest);
    }
  }
  onFormControlChange(): void {
    this.isFormDirty = true;
  }
  addInterest(interest: string) {
    console.log('interest', interest);
    // const index = this.selectedInterests.indexOf(interest);

    const requestInterest = [];
    requestInterest.push(interest);
    // this.httpService.addInterestHttp(requestInterest);
    console.log(' this.selectedInterests', requestInterest);

    this.httpService.addInterestHttp(requestInterest).subscribe(resp => {
      if (typeof resp === null) {
        this.httpService.getInterestAllHttp().subscribe(
          (interests: ProfessionAllBody[]) => {
            this.selectedInterests = interests.map(interest => interest.name);
          },
          (error: any) => {
            console.error('Error fetching interests:', error);
          }
        );
      }
    });
  }

  deleteInterest(interest: string) {
    console.log('deleteInterest');
    const index = this.selectedInterests.indexOf(interest);
    if (index !== -1) {
      this.selectedInterests.splice(index, 1);
      console.log('Deleted interest:', interest);
      const requestInterest = [];
      requestInterest.push(interest);
      this.httpService.deleteInterestHttp(interest).subscribe();
    }
  }

  onChangePasswordButton() {
    console.log('onChangePasswordButton');
    this.eventService.emitchangePasswordEvent();
    this.eventService.emitNotOpenSignUpEvent();
  }

  onDeleteProfileButton() {
    let modalInfo = {
      type: 'confirmation',
      isLogo: false,
      isBookmark: false,
      isProfile: false,
      title: 'Are you sure?',
      message: `You are about to delete your account. After clicking the "Delete", your account will be permanently deleted. It will be impossible to restore your account after deletion.
     `,
      additionalMessage: `Just remember, once you delete it, it’s gone forever.`,
      isVisible: true,
      isSuccess: true,
      showButtons: true,
      modalType: 'Big',
    };
    this.modalService.openModal(modalInfo);
    this.eventService.emitModalEvent();
  }

  submitProfileSettings() {
    const data = this.profileForm.value as ProfileBody;
    this.requestData.username = data.username || this.profile.username;
    this.requestData.jobTitle = data.jobTitle || this.profile.jobTitle;
    this.requestData.email = data.email || this.profile.email;

    console.log('this.requestData', this.requestData);

    this.httpService.updateUserHttp(this.requestData).subscribe(resp => {
      console.log(resp);
      if (typeof resp === 'object' && 'username' in resp)
        localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);
      this.authService.setUsername(data.username);
      this.profile = resp;
    });

    // this.authService.updateProfile(this.requestData);
  }

  onSignOut() {
    this.authService.signOut();
  }
}
