import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Pill(props) {
    const { id, name, dose, time, option, frequency, repeatInterval } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [editedName, setEditedName] = useState(name); 
    const [editedDose, setEditedDose] = useState(dose); 
    const [editedTime, setEditedTime] = useState(time); 
    const [editedOption, setEditedOption] = useState(option); 
    const [editedFrequency, setEditedFrequency] = useState(frequency);
    const [editedRepeatInterval, setEditedRepeatInterval] = useState(repeatInterval);



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
