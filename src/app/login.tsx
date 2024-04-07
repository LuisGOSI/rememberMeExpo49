import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, persistence } from '../../firebase';
import TopStroke from '../components/TopStroke';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter(); 

    const handleSignUp = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Usuario creado', 'El usuario ha sido creado exitosamente');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
            });
    }

    const handleLogin = async () => {
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app,{
            persistence: persistence
        });
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userToken', user.uid);
            Alert.alert('Usuario logueado', 'El usuario ha sido logueado exitosamente');
            router.push('/(tabs)/home'); // Redirigir al usuario a la página de inicio
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert('Error', errorMessage);
        }
    }

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app,{
            persistence: persistence
        });
        const checkUser = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken) {
                    router.push('/(tabs)/home');
                }
            } catch (error) {
                console.error('Error obteniendo el token:', error);
            }
        }
        checkUser();
    }, []);


    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle='default'/>
            <TopStroke />
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <ScrollView style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'grey'}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor={'grey'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={handleLogin}>
                        <Text style={{ color: '#ffffff', textAlign: 'center' }}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton}
                        onPress={handleSignUp}>
                        <Text style={{ color: 'grey', textAlign: 'center' }}>Registrarse</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#B1D4FE',
    },

    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#B1D4FE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    formContainer: {
        width: '80%',
    },

    title: {
        marginTop: 50,
        color: 'grey',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 16,
    },

    input: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
    },

    button: {
        backgroundColor: '#1E90FF',
        color: 'grey',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },

    registerButton: {
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#1E90FF',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
});

export default LoginScreen;