export interface UserType {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  uid: string;
  photoURL?: string | null;
}

export interface UserState {
  initializing: boolean;
  user: UserType | null;
  userEmail: string;
  userPassword: string;
  userName?: string;
}
