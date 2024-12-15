export interface CreateUser {
  userName: string;
  demonName: string;
  email: string;
  password: string;
}

export interface User {
  userId: string;
  userName: string;
  demonName: string;
  email: string;
  profilePicture: string | null;
  banner: string | null;
  description: string | null;
  pinnedTuipId: number | null;
  createdAt: string;
  birthday: string | null;
  followers: number;
  following: number;
  tuipsCount: number;
  likesCount: number;
}
