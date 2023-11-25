export interface IUser {
  id?: string;
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface IUserAll {
  users: IUser[];
  count: number;
}
