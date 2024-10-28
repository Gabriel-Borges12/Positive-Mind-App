import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const muscleGroups = [
  'Pés', 'Pernas', 'Mãos', 'Braços', 'Ombros', 'Pescoço', 'Rosto'
];

export default function MuscleRelaxation() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animação para transição do texto

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIndex((prev) => (prev + 1) % muscleGroups.length);
    });
  };

  const handleRestart = () => setIndex(0);

  const handleBackToHome = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relaxamento Muscular</Text>

      <Animated.Text style={[styles.instruction, { opacity: fadeAnim }]}>
        Contraia e relaxe: <Text style={styles.highlight}>{muscleGroups[index]}</Text>
      </Animated.Text>

      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {index < muscleGroups.length - 1 ? 'Próximo' : 'Reiniciar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={handleBackToHome}
      >
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', // cor suave para o fundo
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C5739',
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 24,
    fontWeight: '500',
    color: '#25724D',
    textAlign: 'center',
    marginBottom: 40,
  },
  highlight: {
    color: '#71BE99',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  nextButton: {
    backgroundColor: '#71BE99',
  },
  backButton: {
    backgroundColor: '#1C5739',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
