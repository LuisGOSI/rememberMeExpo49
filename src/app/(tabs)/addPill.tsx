import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TopStroke from '../../components/TopStroke';
import { Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import PickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get('window');

export default function AddPill() {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [pillName, setPillName] = useState('');
    const [pillDose, setPillDose] = useState('');
    const [pillList, setPillList] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAddingPill, setIsAddingPill] = useState(false);

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const handleDeleteAllPills = async () => {
        try {
            await AsyncStorage.clear();
            setPillList([]);
            console.log('Todas las pastillas han sido eliminadas');
        } catch (error) {
            console.error('Error eliminando las pastillas:', error);
        }
    }

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        setSelectedTime(time);
        hideTimePicker();
    };

    const handleAddPill = async () => {
        try {
            if (!pillName || !pillDose || !selectedTime || !selectedOption) {
                Alert.alert('Campos incompletos', 'Por favor complete todos los campos.');
                return;
            }

            setIsAddingPill(true);

            const newPill = {
                name: pillName,
                dose: pillDose,
                time: selectedTime.toLocaleTimeString(), // Formatea la hora a cadena de texto legible
                option: selectedOption,
            };

            const updatedPillList = [...pillList, newPill];
            await AsyncStorage.setItem('pillList', JSON.stringify(updatedPillList));
            setPillList(updatedPillList);

            // Limpia los campos después de agregar la pastilla
            setPillName('');
            setPillDose('');
            setSelectedTime(null);
            setSelectedOption(null);
            console.log('Pastilla guardada:', newPill);

        } catch (error) {
            console.error('Error guardando la pastilla:', error);
            Alert.alert('Error', 'Se produjo un error al guardar la pastilla. Por favor, inténtalo de nuevo.');
        } finally {
            setIsAddingPill(false);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <TopStroke />
            <View style={styles.container}>
                <Text style={styles.text}>Agregar pastilla</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de la pastilla"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setPillName(text)}
                        value={pillName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Dosis"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setPillDose(text)}
                        value={pillDose}
                        keyboardType="numeric" // Set keyboardType to "numeric"
                    />
                    <TouchableOpacity style={styles.input} onPress={showTimePicker}>
                        <Text style={{ color: 'gray' }}>{selectedTime ? selectedTime.toLocaleTimeString() : 'Seleccionar horario'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirm}
                        onCancel={hideTimePicker}
                    />  
                    <PickerSelect
                        value={selectedOption}
                        onValueChange={(value) => setSelectedOption(value)}
                        placeholder={{ label: 'Seleccionar casilla', value: null }}
                        items={[
                            { label: 'Casilla 1', value: 'Casilla 1' },
                            { label: 'Casilla 2', value: 'Casilla 2' },
                            { label: 'Casilla 3', value: 'Casilla 3' },
                            { label: 'Casilla 4', value: 'Casilla 4' },
                            { label: 'Casilla 5', value: 'Casilla 5' },
                            { label: 'Casilla 6', value: 'Casilla 6' },
                            { label: 'Casilla 7', value: 'Casilla 7' },
                            { label: 'Casilla 8', value: 'Casilla 8' }
                        ]}
                        style={{
                            inputIOS: styles.dropdown,
                            inputAndroid: styles.dropdown,
                            placeholder: { color: 'gray' },
                        }}
                        useNativeAndroidPickerStyle={false} // Add this line
                    />
                    <TouchableOpacity
                        style={[styles.addButton, { opacity: isAddingPill ? 0.5 : 1 }]}
                        onPress={handleAddPill}
                        disabled={isAddingPill}
                    >
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Button title="Eliminar todas las pastillas" onPress={handleDeleteAllPills} color={"#ffffff"} />
            <StatusBar style="inverted" />
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

    dropdown: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
    },

    addButton: {
        backgroundColor: '#3099F0',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
