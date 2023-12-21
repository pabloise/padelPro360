import {GenderOption} from '../types/user';

export const GENDER_OPTIONS: GenderOption[] = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Non binary', value: 'Non binary'},
  {label: `I'd rather not say`, value: `I'd rather not say`},
];

export const AVATAR_IMAGES = {
  Male: require('../assets/male-avatar.png'),
  Female: require('../assets/female-avatar.png'),
  "I'd rather not say": require('../assets/avatar.png'),
  'Non binary': require('../assets/avatar.png'),
};
