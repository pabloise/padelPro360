import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUser} from '../src/redux/modules/userSlice';

GoogleSignin.configure({
  webClientId:
    '691358675671-2jrmk7lk6v6tdjdmfk01t3djajuhqd80.apps.googleusercontent.com',
});
