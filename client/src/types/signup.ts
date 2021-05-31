export interface IinitialStateSignup {
  login: string;
  email: string;
  password: string;
}

export interface IErrorSignup {
  login?: string;
  email?: string;
  password?: string;
}