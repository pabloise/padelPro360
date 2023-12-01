import {UserState} from './user';

export interface OwnerType extends UserState {
  clubName: string;
  clubAddress: string;
  clubGoogleMapsLink: string;
  status: 'pending' | 'approved' | 'rejected';
  courts: Court[];
}

export type Court = {
  courtId: string;
  courtName: string;
  availability: string;
};
