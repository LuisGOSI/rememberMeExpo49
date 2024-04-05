import React, { useState, useEffect } from 'react';
import TopStroke from '../../components/TopStroke';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { useRouter } from "expo-router";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase';

const { width } = Dimensions.get('window');

const Contact = () => {
    const [email, setEmail] = useState(null);
    const router = useRouter(); 

    useEffect(() => {
        const getEmail = async () => {
            try {
                const userEmail = await AsyncStorage.getItem('userToken');
                setEmail(userEmail); // Esto establecerá correctamente el correo electrónico en el estado
            } catch (error) {
                console.error('Error obteniendo el correo electrónico:', error);
            }
        };
        getEmail();
    }, []);

    const handleCloseSession = async () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        try {
            await auth.signOut();
            await AsyncStorage.removeItem('userToken');
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
                        <Text style={styles.emailText}>Correo de la sesión iniciada: luis_gosi@outlook.com</Text>
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
