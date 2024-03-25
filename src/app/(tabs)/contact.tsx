import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import TopStroke from '../../components/TopStroke';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Contact() {
    return (
        <View style={styles.mainContainer}>
            <TopStroke />
            <View style={styles.dataContainer}>
                <View style={styles.container}>
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

    strokeContainer: {
        width: width,
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
});
