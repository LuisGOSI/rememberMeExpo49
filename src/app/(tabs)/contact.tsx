import React, { useState, useEffect } from 'react';
import TopStroke from '../../components/TopStroke';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { initializeAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, persistence } from '../../../firebase';
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

const Contact = () => {
    const [userEmail, setUserEmail] = useState('');
    const router = useRouter(); 

    useEffect(() => {
        const getEmail = async () => {
            try {
                let email = await AsyncStorage.getItem('userEmail');
                setUserEmail(email);
            } catch (error) {
                console.error('Error obteniendo el correo electrónico:', error);
            }
        };

        getEmail();
    }, []);

    const handleCloseSession = async () => {
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app,{
            persistence: persistence
        });
    
        try {
            await auth.signOut();
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userEmail');
            console.log('Sesión cerrada');
            router.push('/login');
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <TopStroke />
            <View style={styles.dataContainer}>
                <View style={styles.container}>
                    <View style={styles.contactContainer}>
                        <Text style={styles.title}>Contacta con nuestro equipo</Text>
                        <View style={styles.infoContainer}>
                            <Feather name="mail" size={24} color="black" style={styles.icon} />
                            <Text style={styles.subtitle}>Correo electrónico: rememberMe@outlook.com</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Feather name="phone" size={24} color="black" style={styles.icon} />
                            <Text style={styles.subtitle}>Teléfono: 123-456-7890</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Entypo name="facebook" size={24} color="black" style={styles.icon} />
                            <Text style={styles.subtitle}>Facebook: rememberMe</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Entypo name="instagram" size={24} color="black" style={styles.icon} />
                            <Text style={styles.subtitle}>Instagram: rememberMe</Text>
                        </View>
                    </View>
                    <View style={styles.sessionContainer}>
                        <Text style={styles.emailText}>Correo de la sesión iniciada: {userEmail}</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleCloseSession}>
                            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar style="inverted" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#B1D4FE',
    },

    dataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 60,
        flexDirection: 'column',
    },

    contactContainer: {
        marginBottom: 20,
    },

    sessionContainer: {
        alignItems: 'center',
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },

    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    icon: {
        marginRight: 10,
    },

    emailText: {
        fontSize: 16,
        marginBottom: 10,
    },

    logoutButton: {
        backgroundColor: '#3099F0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Contact;
