import React, { useEffect } from 'react';
import TopStroke from '../../components/TopStroke';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pill from '../../components/Pill';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Button, Alert } from 'react-native';
import { Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('window');

export default function Home() {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [pillList, setPillList] = useState([]);
    const [selectedPill, setSelectedPill] = useState(null);

    const fetchPills = async () => {
        try {
            const storedPillList = await AsyncStorage.getItem('pillList');
            if (storedPillList !== null) {
                const parsedPillList = JSON.parse(storedPillList);
                setPillList(parsedPillList);
            }
        } catch (error) {
            console.error('Error fetching pills:', error);
        }
    };

    const handleDeleteAllPills = async () => {
        try {
            await AsyncStorage.clear();
            setPillList([]);
            fetchPills();
            console.log('Todas las pastillas han sido eliminadas');
        } catch (error) {
            console.error('Error eliminando las pastillas:', error);
        }
    }

    const handlePillPress = (pill) => {
        setSelectedPill(pill);
    };

    const handleDeletePill = async (pill) => {
        try {
            const confirmDelete = await new Promise((resolve) => {
                Alert.alert(
                    'Confirmar eliminación',
                    '¿Estás seguro de que deseas eliminar esta pastilla?',
                    [
                        { text: 'Cancelar', onPress: () => resolve(false) },
                        { text: 'Eliminar', onPress: () => resolve(true) },
                    ]
                );
            });
            if (confirmDelete) {
                await AsyncStorage.setItem('pillList', JSON.stringify(pillList.filter((item) => item !== selectedPill)));
                console.log('La pastilla ha sido eliminada');
                setSelectedPill(null);
                fetchPills();
            } else {
                console.log('Eliminación cancelada');
            }
        } catch (error) {
            console.error('Error eliminando la pastilla:', error);
        }
    }


    const handleCloseModal = () => {
        setSelectedPill(null);
    };

    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'Lemonada': require('../../../assets/fonts/Lemonada-Regular.ttf'),
            });
            setFontLoaded(true);
        }
        loadFont();
        if (!fontLoaded) {
            return; 
        }
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            fetchPills();
        }, [])
    );

    return (
        <View style={styles.mainContainer}>
            <TopStroke />
            <View style={styles.container}>
                <Text style={styles.text}>Mis pastillas</Text>
                {pillList.length === 0 ? (
                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>Aun no tienes ninguna pastilla</Text>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../assets/empty.png')} style={styles.image} />
                        </View>
                    </View>
                ) : (
                    <ScrollView style={styles.pillsContainer}>
                        {pillList.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handlePillPress(item)}>
                                <Pill key={index} name={item.name} dose={item.dose} time={item.time} option={item.option} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                <StatusBar style="inverted" />
                <View style={styles.button}>
                    <Button title="Eliminar todas las pastillas" onPress={handleDeleteAllPills} color={"#C4CBD4"} />
                </View>
            </View>

            <Modal visible={selectedPill !== null} animationType="slide">
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={styles.modalContainer}>
                        {selectedPill && (
                            <View>
                                <View style={styles.buttonModal}>
                                    <Button title="X" onPress={handleCloseModal} color={"#000000"} />
                                </View>
                                <View style={styles.infoTitleModal}>
                                    <Text style={styles.titleModal}>Información de la pastilla</Text>
                                    <Image source={require('../../../assets/pill.png')} style={styles.imageModal} />
                                </View >
                                <View style={styles.modalInfoContainer}>
                                    <Text >Nombre: {selectedPill.name}</Text>
                                    <Text >Dosis: {selectedPill.dose}</Text>
                                    <Text >Hora : {selectedPill.time}</Text>
                                    <Text >Opción: {selectedPill.option}</Text>
                                </View>
                                <View style={styles.buttonDeleteModal}>
                                    <Button title="Eliminar pastilla" onPress={handleDeletePill} color={"#000000"} />
                                </View>
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#B1D4FE',
    },

    container: {
        backgroundColor: '#B1D4FE',
        alignItems: 'center',
    },

    pillsContainer: {
        height: '65%',
    },

    strokeContainer: {
        width: width,
    },

    text: {
        paddingTop: 40,
        fontSize: 30,
        fontWeight: 'bold',
        bottom: 30,
        fontFamily: 'Arial',
    },

    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '65%',

    },

    message: {
        fontSize: 20,
        marginBottom: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#ffffffff',
    },

    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 350,
        height: 350,
    },

    // ! Modal styles ============================================================

    modalContainer: {
        flex: 1,
        backgroundColor: '#B1D4FE',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalInfoContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },

    infoTitleModal: {
        alignItems: 'center',

    },

    titleModal: {
        paddingTop: 40,
        fontSize: 30,
        fontWeight: 'bold',
        bottom: 30,
        color: '#ffffffff',
    },

    imageModal: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonModal: {
        backgroundColor: '#3099F0',
        borderRadius: 10,
        width: 50,

    },

    buttonDeleteModal: {
        backgroundColor: '#Ff0000',
        borderRadius: 10,
    },

    button: {
        marginTop: 20,
        backgroundColor: '#Ff0000',
        borderRadius: 10,

    },
});

