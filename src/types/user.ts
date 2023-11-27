export type GenderType = 'Male' | 'Female' | `I'd rather not say` | null;

export interface UserType {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  uid: string;
  photoURL?: string | null;
}

export interface UserState {
  initializing: boolean;
  isLoading: boolean;
  user: UserType | null;
  userEmail: string;
  userPassword: string;
  userName: string;
  userGender: GenderType;
}
