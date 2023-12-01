export interface UserState {
  initializing: boolean;
  isLoading: boolean;
  user: UserType | null;
  userEmail: string;
  userPassword: string;
  userName: string;
  userGender: GenderType;
  isOwner?: boolean;
  userType: 'normal' | 'owner';
}

export interface UserType {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  uid: string;
  photoURL?: string | null;
}

export type GenderType =
  | 'Male'
  | 'Female'
  | 'Non binary'
  | `I'd rather not say`
  | null;

export interface GenderOption {
  label: string;
  value: GenderType;
}
