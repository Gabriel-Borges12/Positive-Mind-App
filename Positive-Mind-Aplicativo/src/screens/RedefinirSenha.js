import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/image5.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>Positive Mind</Text>
      </View>
      <Image source={require('../assets/imagemMental.jpg')} style={[styles.image, styles.centeredImage]} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Redefinir senha</Text>
        <Text style={styles.subtitle}>
          Digite seu email e enviaremos um email para você informando como recuperá-la.
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Image source={require('../assets/email.png')} style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="exemplo@teste.com" 
              placeholderTextColor="#9fa5aa"
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginLink}>
        <Text style={styles.loginButtonText}onPress={() => navigation.navigate('Login')}>Lembrou sua senha? Faça o Login!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF4F4',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logoImage: {
    width: 30, 
    height: 30, 
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A6351',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  centeredImage: {
    alignSelf: 'center', // Centraliza a imagem horizontalmente
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 50, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#7E7E7E',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: '#E1E1E1',
    borderWidth: 1,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#3A6351',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#3A6351',
  },
});

export default ResetPasswordScreen;
