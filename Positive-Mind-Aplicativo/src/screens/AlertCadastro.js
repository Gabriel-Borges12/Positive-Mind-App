import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing, Image } from 'react-native';

export default function App({ route }) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  
  // Substituindo com um estado de exemplo. Se o e-mail do usuário for obtido de outro lugar, você pode passar como prop.
  const { userEmail } = route.params;
  
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -600,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={[styles.alertBox, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.header}>
          <Image source={require('../assets/image5.png')} style={styles.logo} />
          <Text style={styles.companyName}>Positive Mind</Text>
        </View>
        <Text style={styles.title}>Seu cadastro foi feito com sucesso!</Text>
      
        <Image source={require('../assets/telaInicial.png')} style={styles.image} />
        <Text style={styles.subtitle}>Enviamos um e-mail de confirmação para</Text>
        
        {/* Mostrar o e-mail do usuário */}
        <Text style={styles.email}>{userEmail}</Text>
      </Animated.View>
      
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.button} onPress={startAnimation}>
          <Text style={styles.arrow} onPress={() => navigation.navigate('Login')}>↑</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7FFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertBox: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    opacity: 1, 
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
