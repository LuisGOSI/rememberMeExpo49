import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopStroke from '../../components/TopStroke';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PickerSelect from 'react-native-picker-select';
import * as Notifications from 'expo-notifications';
import { Button, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AddPill() {
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [pillName, setPillName] = useState('');
    const [pillDose, setPillDose] = useState('');
    const [pillList, setPillList] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedFrequency, setSelectedFrequency] = useState(null);
    const [repeatInterval, setRepeatInterval] = useState('');
    const [isAddingPill, setIsAddingPill] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [userEmail, setUserEmail] = useState('');;

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        try {
            setSelectedTime(date);
        }
        catch (error) {
            console.error('Error seleccionando la hora:', error);
            Alert.alert('Error', 'Se produjo un error al seleccionar la hora. Por favor, inténtalo de nuevo.');
        }
        hideDatePicker();
    };

    const handleDeleteAllPills = async () => {
        try {
            await AsyncStorage.clear();
            await Notifications.cancelAllScheduledNotificationsAsync();
            setPillList([]);
            console.log('Todas las pastillas han sido eliminadas');
        } catch (error) {
            console.error('Error eliminando las pastillas:', error);
        }
    }

    function uniqueId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    const handleNotification = async (time, space, frequency, repeatTimes, id) => {
        const identifier = id;
        let trigger;
        switch (frequency) {
            case 'daily':
                trigger = { hour: time.getHours(), minute: time.getMinutes(), repeats: true, intervalMs: repeatTimes };
                break;
            case 'weekly':
                trigger = { hour: time.getHours(), minute: time.getMinutes(), repeats: true, weekday: 1, intervalMs: repeatTimes };
                break;
            case 'monthly':
                trigger = { hour: time.getHours(), minute: time.getMinutes(), repeats: true, day: time.getDate(), intervalMs: repeatTimes };
                break;
            default:
                throw new Error('Frecuencia de notificación no válida');
        }
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Hora de tomar la pastilla',
                    body: `No olvides tomar tu pastilla de la casilla ${space}`,
                    sound: true,
                },
                trigger,
                identifier,
            });
        } catch (error) {
            console.error('Error programando la notificación:', error);
            Alert.alert('Error', 'Se produjo un error al programar la notificación. Por favor, inténtalo de nuevo.');
        }
    };

    const handleAddPill = async () => {
        try {
            if (!pillName || !pillDose || !selectedTime || !selectedOption || !selectedFrequency || !repeatInterval) {
                Alert.alert('Campos incompletos', 'Por favor complete todos los campos.');
                return;
            }
    
            setIsAddingPill(true);
    
            const newPill = {
                id: uniqueId(),
                name: pillName,
                dose: pillDose,
                time: selectedTime.toString(),
                option: selectedOption,
                frequency: selectedFrequency,
                repeatInterval: repeatInterval,
            };
    
            const updatedPillList = [...pillList, newPill]; // Aquí se cambió la forma de concatenar las listas
            setPillList(updatedPillList);
            await AsyncStorage.setItem('pillList' + userEmail, JSON.stringify(updatedPillList)); // Se guarda la lista actualizada
    
            await handleNotification(selectedTime, selectedOption, selectedFrequency, repeatInterval, newPill.id,);
    
            Alert.alert('Pastilla agregada', 'La pastilla ha sido agregada correctamente.');
            setPillName('');
            setPillDose('');
            setSelectedTime(null);
            setSelectedOption(null);
            setSelectedFrequency(null);
            setRepeatInterval('');
            console.log('Pastilla guardada:', newPill);
    
        } catch (error) {
            console.error('Error guardando la pastilla:', error);
            Alert.alert('Error', 'Se produjo un error al guardar la pastilla. Por favor, inténtalo de nuevo.');
        } finally {
            setIsAddingPill(false);
        }
    }

    useEffect(() => {
        const loadPillList = async () => {
            try {
                const storedPillList = await AsyncStorage.getItem('pillList' + userEmail);
                if (storedPillList) {
                    setPillList(JSON.parse(storedPillList));
                }
            } catch (error) {
                console.error('Error cargando las pastillas:', error);
            }
        };

        const getEmail = async () => {
            try {
                let email = await AsyncStorage.getItem('userEmail');
                setUserEmail(email);
            } catch (error) {
                console.error('Error obteniendo el correo electrónico:', error);
            }
        };

        getEmail();
        loadPillList();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const loadPillList = async () => {
                try {
                    const storedPillList = await AsyncStorage.getItem('pillList' + userEmail);
                    if (storedPillList) {
                        setPillList(JSON.parse(storedPillList));
                    }
                } catch (error) {
                    console.error('Error cargando las pastillas:', error);
                }
            };
    
            loadPillList();
        }, [userEmail])
    );


    return (
        <View style={styles.mainContainer}>
            <TopStroke />
            <View style={styles.container}>
                <Text style={styles.text}>Agregar pastilla</Text>
                <ScrollView style={styles.formContainer}>
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
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                        <Text style={{ color: 'gray' }}>{selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Seleccionar horario'}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        mode="time"
                        isVisible={isDatePickerVisible}
                        is24Hour={true}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <PickerSelect
                        value={selectedOption}
                        onValueChange={(value) => setSelectedOption(value)}
                        placeholder={{ label: 'Seleccionar casilla', value: null }}
                        items={[
                            { label: 'Roja', value: 'Roja' },
                            { label: 'Verde', value: 'Verde' },
                            { label: 'Azul', value: 'Azul' },
                            { label: 'Naranja', value: 'Naranja' },
                            { label: 'Blanca', value: 'Blanca' },
                            { label: 'Rosa', value: 'Rosa' },
                            { label: 'Amarilla', value: 'Amarilla' },
                            { label: 'Morada', value: 'Morada' }
                        ]}
                        style={{
                            inputIOS: styles.dropdown,
                            inputAndroid: styles.dropdown,
                            placeholder: { color: 'gray' },
                        }}
                        useNativeAndroidPickerStyle={false}
                    />
                    <PickerSelect
                        value={selectedFrequency}
                        onValueChange={(value) => setSelectedFrequency(value)}
                        placeholder={{ label: 'Seleccionar frecuencia', value: null }}
                        items={[
                            { label: 'Diario', value: 'daily' },
                            { label: 'Semanal', value: 'weekly' },
                            { label: 'Mensual', value: 'monthly' },
                        ]}
                        style={{
                            inputIOS: styles.dropdown,
                            inputAndroid: styles.dropdown,
                            placeholder: { color: 'gray' },
                        }}
                        useNativeAndroidPickerStyle={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Intervalo de repetición (días)"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setRepeatInterval((text))}
                        value={repeatInterval}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={[styles.addButton, { opacity: isAddingPill ? 0.5 : 1 }]}
                        onPress={handleAddPill}
                        disabled={isAddingPill}
                    >
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {/* <Button title="Eliminar todas las pastillas" onPress={handleDeleteAllPills} color={"#ffffff"} /> */}
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


