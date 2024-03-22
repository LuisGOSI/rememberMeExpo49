import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
const { width} = Dimensions.get('window');
import TopStroke from '../../components/TopStroke';
import Pill from '../../components/Pill';


export default function home() {
    return (
        <View style={styles.mainContainer}>
            <TopStroke/>
            <View style={styles.container}>
                <Text style={styles.text} >Mis pastillas</Text>
                <ScrollView style={styles.pillsContainer}>
                    <Pill name={undefined} frequency={undefined} quantity={undefined} />
                </ScrollView>
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
    },

});

