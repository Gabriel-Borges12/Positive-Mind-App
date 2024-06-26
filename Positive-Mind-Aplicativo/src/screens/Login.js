import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import logo from '../assets/image5.png';
import banner from '../assets/telaInicial.png';
import googleIcon from '../assets/google.png';
import emailIcon from '../assets/icons8-nova-mensagem-50.png';
import passwordIcon from '../assets/icons8-lock-50.png';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    // Simulação de validação de login
    if (email === 'userteste@gmail.com' && password === '1234') {
      navigation.navigate('MainTabs', { screen: 'Home' });
    } else {
      Alert.alert('Erro', 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animatable.Image  
          animation="flipInY"
          source={logo} 
          style={styles.logo} />
        <Animatable.Text  
          animation="flipInY" 
          style={styles.logoText}>Positive Mind</Animatable.Text>
      </View>
      <Animatable.Image  
        animation="flipInY"
        source={banner} 
        style={styles.banner} />

      <Animatable.View delay={600} animation="fadeInUp" style={styles.bottomContainer}>
        <View style={styles.whiteContainer}>
          <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <Image source={emailIcon} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>
          </View>
          <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Image source={passwordIcon} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword} onPress={() => navigation.navigate('RedefinirSenha')}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('Home')}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>ou</Text>
          <TouchableOpacity style={styles.googleButton}>
            <Image source={googleIcon} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Entrar com o Google</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            É novo por aqui? <Text style={styles.signupLink} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F5F2',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20, // Espaçamento para acomodar a logo
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  banner: {
    width: '100%',
    height: 200, // Altura reduzida para mover a imagem para cima
    resizeMode: 'contain',
    marginTop: 60, // Movido para cima
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  whiteContainer: {
    width: '95%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputContainerFocused: {
    borderColor: '#25724D', // Cor quando o input está focado
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#555',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    paddingLeft: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#71BE99',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#71BE99', 
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1B7349',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginBottom: 10,
    color: '#555',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#555',
  },
  signupText: {
    color: '#555',
  },
  signupLink: {
    color: '#71BE99', 
    fontWeight: 'bold',
  },
});

export default LoginScreen;
