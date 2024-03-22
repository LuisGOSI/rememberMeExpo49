import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import TopStroke from '../../components/TopStroke';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const { width } = Dimensions.get('window');

export default function addPill() {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        setSelectedTime(time);
        hideTimePicker();
    };

    return (
        <View style={styles.mainContainer}>
            <TopStroke />
            <View style={styles.container}>
                <Text style={styles.text}>Agregar pastilla</Text>
                <View style={styles.formContainer}>
                    <TextInput style={styles.input} placeholder="Nombre de la pastilla" placeholderTextColor={"grey"} />
                    <TextInput style={styles.input} placeholder="Dosis" placeholderTextColor={"grey"} />
                    <TouchableOpacity style={styles.input} onPress={showTimePicker}>
                        <Text style={{ color: 'gray' }}>{selectedTime ? selectedTime.toLocaleTimeString() : 'Seleccionar horario'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirm}
                        onCancel={hideTimePicker}
                    />
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#B1D4FE',
    },

    container: {
        flex: 1,
        backgroundColor: '#B1D4FE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    strokeContainer: {
        width: width,
    },

    text: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    formContainer: {
        width: '80%',
    },

    input: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
    },

    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
