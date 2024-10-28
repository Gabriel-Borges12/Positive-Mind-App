import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BreathingExercise() {
    const navigation = useNavigation();
    const [step, setStep] = useState('Inspire');
    const [counter, setCounter] = useState(4);
    const [modalVisible, setModalVisible] = useState(false); // Estado do modal

    useEffect(() => {
        const timer = setInterval(() => {
            if (counter === 1) {
                if (step === 'Inspire') {
                    setStep('Segure');
                    setCounter(7);
                } else if (step === 'Segure') {
                    setStep('Expire');
                    setCounter(8);
                } else {
                    setStep('Inspire');
                    setCounter(4);
                }
            } else {
                setCounter(counter - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [counter, step]);

    return (
        <View style={styles.container}>
            <Text style={styles.stepText}>{step}</Text>
            <Text style={styles.counterText}>{counter}</Text>

            <TouchableOpacity 
                style={styles.helpButton} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.helpText}>?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Os exercícios de respiração ajudam a relaxar, diminuir a ansiedade e aumentar a concentração. 
                            Inspire profundamente, segure por um momento e expire lentamente.
                        </Text>
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F5E9', // Cor suave para o fundo
    },
    stepText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1C5739',
    },
    counterText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#25724D',
        marginTop: 10,
    },
    helpButton: {
        position: 'absolute',
        top: 40,
        right: 30,
        backgroundColor: '#71BE99',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpText: {
        fontSize: 24,
        color: '#FFFFFF',
    },
    backButton: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: '#1C5739',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#1C5739',
    },
    closeButton: {
        backgroundColor: '#71BE99',
        borderRadius: 8,
        padding: 10,
    },
});
