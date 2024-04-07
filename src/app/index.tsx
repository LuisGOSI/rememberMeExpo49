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

        const checkUser = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken) {
                    console.log('Usuario logueado');
                    <Redirect href="/(tabs)/home" />
                } else {
                    console.log('Usuario no logueado');
                }
            } catch (error) {
                console.error('Error obteniendo el token:', error);
            }
        }

        checkUser();
    }, []);

    return (
        <Redirect href="/login" />
    );
}

export default StartPage;
