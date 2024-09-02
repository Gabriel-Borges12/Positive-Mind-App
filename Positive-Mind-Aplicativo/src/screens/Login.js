import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase'; // Certifique-se de importar seu Firestore corretamente

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

  // Animations with React Native Animated API
  const logoAnimation = new Animated.Value(0);
  const bannerAnimation = new Animated.Value(0);
  const bottomContainerAnimation = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(bannerAnimation, {
      toValue: 1,
      duration: 1000,
      delay: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(bottomContainerAnimation, {
      toValue: 1,
      duration: 1000,
      delay: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email), where("senha", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Login bem-sucedido
        navigation.navigate('Home', { screen: 'Home' });
      } else {
        // Exibe uma mensagem de erro ao usuário
        Alert.alert('Erro', 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login: ", error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoAnimation }]}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>Positive Mind</Text>
      </Animated.View>
      <Animated.Image
        source={banner}
        style={[styles.banner, { opacity: bannerAnimation }]}
      />

      <Animated.View
        style={[styles.bottomContainer, { opacity: bottomContainerAnimation }]}
      >
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
            <Text style={styles.buttonText}>Entrar</Text>
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
      </Animated.View>
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
