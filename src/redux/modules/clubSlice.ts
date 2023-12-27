import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Club, ClubState, Location} from '../../types/club';

const initialState: ClubState = {
  currentClub: {
    id: '',
    clubName: '',
    address: '',
    googleMapsLink: '',
    location: null,
    courts: [],
  },
  clubs: {},
};

export const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    setCurrentClub: (state, action: PayloadAction<Club>) => {
      state.currentClub = action.payload;
    },
    addClub: (state, action: PayloadAction<Club>) => {
      const club = action.payload;
      state.clubs[club.id] = club;
    },
    updateClub: (state, action: PayloadAction<Club>) => {
      const club = action.payload;
      if (state.clubs[club.id]) {
        state.clubs[club.id] = club;
      }
    },
    setClubName: (state, action: PayloadAction<string>) => {
      state.currentClub.clubName = action.payload;
    },
    setClubAddress: (state, action: PayloadAction<string>) => {
      state.currentClub.address = action.payload;
    },
    setClubGoogleMapsLink: (state, action: PayloadAction<string>) => {
      state.currentClub.googleMapsLink = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.currentClub.location = action.payload;
    },
    resetClub: state => {
      state.currentClub = {
        id: '',
        clubName: '',
        address: '',
        googleMapsLink: '',
        location: null,
        courts: [],
      };
    },
  },
});

export const {
  addClub,
  updateClub,
  setClubName,
  setClubAddress,
  setCurrentClub,
  setClubGoogleMapsLink,
  setLocation,
  resetClub,
} = clubSlice.actions;

export default clubSlice.reducer;
