import {UserType, GenderType} from './user';

export interface OwnerState {
  initializing: boolean;
  isLoading: boolean;
  user: UserType | null;
  userEmail: string;
  userPassword: string;
  userName: string;
  userGender: GenderType;
  courtName: string;
  courtAddress: string;
  courtGoogleMapsLink: string;
  status: 'pending' | 'approved' | 'rejected';
}
