export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}
