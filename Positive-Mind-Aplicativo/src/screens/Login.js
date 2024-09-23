import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebase';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '61713422871', // Substitua pelo seu Client ID
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      navigation.navigate('PassoAPasso', { screen: 'PassoAPasso' });
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          Alert.alert('Login Cancelado');
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert('Uma operação de login já está em andamento');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert('Serviços do Google Play não estão disponíveis');
          break;
        default:
          Alert.alert('Erro ao fazer login com Google');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        setEmail('');
        setPassword('');
        navigation.navigate('PassoAPasso', { screen: 'PassoAPasso' });
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login: ', error);
      let errorMessage = '';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'E-mail inválido.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'E-mail ou senha incorretos.';
          break;
        default:
          errorMessage = 'Ocorreu um erro ao tentar fazer login.';
      }
      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>Positive Mind</Text>
      </View>
      <Image source={banner} style={styles.banner} />

      <View style={styles.bottomContainer}>
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
            <Text style={styles.forgotPassword} onPress={() => navigation.navigate('RedefinirSenha')}>
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>ou</Text>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
            <Image source={googleIcon} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Entrar com o Google</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            É novo por aqui? <Text style={styles.signupLink} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
          </Text>
        </View>
      </View>
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
    paddingTop: 20,
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
    height: 200,
    resizeMode: 'contain',
    marginTop: 60,
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
    borderColor: '#25724D',
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
