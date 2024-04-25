export interface SignInBody {
  email: string;
  password: string;
}
export interface ChangePasswordBody {
  password: string;
}
export interface ChangePasswordForm {
  password: string;
  newPassword: string;
}
export interface SignInResponseBody {
  token: string;
  uid: string;
}
export interface SignUpBody extends SignInBody {
  username: string;
}
export interface SignUpRequestBody {
  username: string;
  jobTitle: string;

  password: string;
  email: string;
}
export interface UpdateUserRequestBody {
  username: string;
  jobTitle: string;
  email: string;
}
export interface UpdateUserResponseBody {
  username: string;
  jobTitle: string;
  email: string;
  password: string;
  role: string;
}
export interface SignUpResponse {
  status: {};
}
export interface HttpError {
  status: number;
  message: string;
  details?: string;
}
export interface ProfileBody {
  username: string;
  jobTitle: string;
  email: string;
  password: string;
  role: string;
}
export interface ProfessionAllBody {
  id: number;
  name: string;
}
export interface TechnologyProfessionRequestBody {
  name: string;
}
export interface DropdownOption {
  id: string;
  name: string;
}
export interface ForgotPasswordBody {
  email: string;
}
