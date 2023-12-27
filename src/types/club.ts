export interface Club {
  id: string;
  clubName: string;
  address: string;
  googleMapsLink: string;
  location: Location | null;
  courts: Court[];
}

export interface ClubState {
  currentClub: Club;
  clubs: {[id: string]: Club};
}

export type Location = {
  lat: number;
  lng: number;
} | null;

export interface Court {
  courtId: string;
  courtName: string;
  availability: string;
}
