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

    const handleOpenModal = () => {
        setModalVisible(true); 
    };

    const handleCloseModal = () => {
        setModalVisible(false); 
    };

    const handleSaveChanges = async () => {
        try {
            const updatedPill = {
                id: id,
                name: editedName,
                dose: editedDose,
                time: editedTime,
                option: editedOption,
                frequency: editedFrequency,
                repeatInterval: editedRepeatInterval,
            };

            // Obtener la lista de pastillas del almacenamiento local
            const storedPillList = await AsyncStorage.getItem('pillList');
            let pillList = [];
            if (storedPillList) {
                pillList = JSON.parse(storedPillList);
            }

            // Actualizar la pastilla en la lista
            const updatedPillList = pillList.map(pill => {
                if (pill.id === id) {
                    return updatedPill;
                } else {
                    return pill;
                }
            });

            // Guardar la lista actualizada en el almacenamiento local
            await AsyncStorage.setItem('pillList', JSON.stringify(updatedPillList));
            console.log('Cambios guardados:', updatedPill);
            setModalVisible(false); 
        } catch (error) {
            console.error('Error guardando cambios:', error);
        }
    };

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
                <TouchableOpacity style={styles.editButton} onPress={handleOpenModal}>
                    <Feather name="edit" size={24} color="#0AB8F7" />
                </TouchableOpacity>
            </View>
            {/* <Modal visible={modalVisible} animationType='slide' transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Editar pastilla</Text>
                        <TextInput
                            style={styles.input}
                            value={editedName}
                            onChangeText={text => setEditedName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedDose}
                            onChangeText={text => setEditedDose(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedTime}
                            onChangeText={text => setEditedTime(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedOption}
                            onChangeText={text => setEditedOption(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedFrequency}
                            onChangeText={text => setEditedFrequency(text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedRepeatInterval}
                            onChangeText={text => setEditedRepeatInterval(text)}
                        />
                        <Button title="Guardar cambios" onPress={handleSaveChanges} />
                        <Button title="Cancelar" onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal> */}
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

    editButton: {
        justifyContent: 'center',
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
