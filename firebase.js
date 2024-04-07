import { getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const persistence = getReactNativePersistence(ReactNativeAsyncStorage);
// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCOsToYdSfZLh-ZsWrY0ISrNyKolJ3nYFA",
    authDomain: "rememberme49-47730.firebaseapp.com",
    projectId: "rememberme49-47730",
    storageBucket: "rememberme49-47730.appspot.com",
    messagingSenderId: "900273543088",
    appId: "1:900273543088:web:fc8416655de2697d6da875"
};

