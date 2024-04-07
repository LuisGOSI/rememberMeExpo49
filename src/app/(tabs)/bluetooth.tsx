import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import TopStroke from '../../components/TopStroke';


const { width } = Dimensions.get('window');

import {
    Canvas,
    Circle,
    Image,
    useClockValue,
    useComputedValue,
    useImage,
} from "@shopify/react-native-skia";


export default function Contact() {

    const PulseIndicator = () => {
        const clock1 = useClockValue();
        const pill = useImage(require("../../../assets/pill.png"));

        const interval = 1250;

        const scale = useComputedValue(() => {
            return ((clock1.current % interval) / interval) * 130;
        }, [clock1]);

        const opacity = useComputedValue(() => {
            return 0.9 - (clock1.current % interval) / interval;
        }, [clock1]);

        const scale2 = useComputedValue(() => {
            return (((clock1.current + 400) % interval) / interval) * 130;
        }, [clock1]);

        const opacity2 = useComputedValue(() => {
            return 0.9 - ((clock1.current + 400) % interval) / interval;
        }, [clock1]);

        if (!pill) {
            return <View />;
        }

        return (
            <Canvas style={{ height: 300, width: 300 }}>
                <Circle cx={150} cy={150} r={50} opacity={1} color="#FF6060"></Circle>
                <Circle cx={150} cy={150} r={scale} opacity={opacity} color="#FF6060" />
                <Circle cx={150} cy={150} r={scale2} opacity={opacity2} color="#FF6060" />
                <Image
                    image={pill}
                    fit="contain"
                    x={110}
                    y={110}
                    width={80}
                    height={80}
                />
            </Canvas>
        );
    };


    return (
        <View style={styles.mainContainer}>
            <TopStroke />
            <View style={styles.container}>

                <View style={styles.TitleWrapper}>
                    <>
                        <PulseIndicator />
                        <Text style={styles.TitleText}>Pastillero conectado </Text>
                        <TouchableOpacity
                            style={styles.ctaButton}
                        >
                            <Text style={styles.ctaButtonText}>
                                Sincronizar pastillero
                            </Text>
                        </TouchableOpacity>
                    </>
                </View>
                <TouchableOpacity
                    style={styles.ctaButton}
                >
                    <Text style={styles.ctaButtonText}>
                        Desconectar
                    </Text>
                </TouchableOpacity>
            </View>
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
    TitleWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    TitleText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 20,
        color: "black",
    },
    Text: {
        fontSize: 25,
        marginTop: 15,
    },
    ctaButton: {
        backgroundColor: "#FF6060",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginBottom: 5,
        borderRadius: 8,
        width: width - 40,
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});
