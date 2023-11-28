export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUserAll {
  users: IUser[];
  count: number;
}
