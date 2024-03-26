export interface SignInBody {
  password: string;
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
  imageUrl: string;
}
export interface SignUpResponse {
  status: {};
}
export interface HttpError {
  status: number;
  message: string;
  details?: string;
}
