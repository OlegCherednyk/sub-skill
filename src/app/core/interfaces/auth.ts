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
  password: string;
  email: string;
  imageUrl: null;
}
export interface SignUpResponse {
  status: {};
}
export interface HttpError {
  status: number;
  message: string;
  details?: string;
}
