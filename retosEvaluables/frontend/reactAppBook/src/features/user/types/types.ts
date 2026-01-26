type User = {
  id_user: number;
  firstName: string;
  lastName: string;
  nickName: string;
  userRole: string;
  email: string;
  password: string;
  thumb: string;
  signInDate: Date;
};

type PublicUser = Omit<User, "id_user" | "password">;

export type { User, PublicUser };
