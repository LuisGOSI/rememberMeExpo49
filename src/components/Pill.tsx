import React from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

export default function Pill(props) {
    const { name, dose, time, option } = props;
    return (
        <View>
            <View style={styles.pillContainer}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="pill" size={24} color="#0AB8F7" />
                </View>
                <View style={styles.text}>
                    <Text>Nombre: {name}</Text>
                    <Text>Dosis: {dose}</Text>
                    <Text>Horario: {time}</Text>
                    <Text>Casilla: {option}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pillContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    text: {
        flex: 1,
    },

    iconContainer: {
        justifyContent: 'center',
        marginRight: 10,
    },
    
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalContent: {
        backgroundColor: '#B1D4FE',
        padding: 20,
        borderRadius: 10,
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
});
