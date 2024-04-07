import React, { useEffect } from 'react';
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from 'firebase/app';
import { firebaseConfig, persistence } from '../../firebase';
import { initializeAuth } from 'firebase/auth';


const StartPage = () => {
    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app, {
            persistence: persistence
        });
    }, []);

    return (
        <Redirect href="/login" />
    );
}

export default StartPage;
