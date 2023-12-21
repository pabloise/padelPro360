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
  clubName: string;
  clubAddress: string;
  clubGoogleMapsLink: string;
  status: 'pending' | 'approved' | 'rejected';
  courts: Court[];
  location: Location | null;
}

export type Location = {
  lat: number;
  lng: number;
} | null;

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

export interface Court {
  courtId: string;
  courtName: string;
  availability: string;
}
