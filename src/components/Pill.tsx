import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

export default function Pill ({name, frequency, quantity}) {

    const handleEdit = () => {
        console.log('Editando pastilla');
    };

    return (
        <TouchableOpacity style={styles.pillContainer}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="pill" size={24} color="#0AB8F7"/>
            </View>
            <View style={styles.text}>
                <Text>Nombre: Paracetamol {name}</Text>
                <Text>Frecuencia: Cada 8 horas{frequency}</Text>
                <Text>Cantidad: 1{quantity}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
                <Feather name="edit" size={24} color="#0AB8F7" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

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

    editButton: {
        justifyContent: 'center',
    },
});
