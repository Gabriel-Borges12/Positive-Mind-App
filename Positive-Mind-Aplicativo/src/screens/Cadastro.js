import React, { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { firebaseApp } from '../../firebase.js';

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, 'users');

  async function mkUser() {
    try {
      await addDoc(userCollectionRef, {
        nome,
        email,
        senha,
      });

      // Navega para a tela de alerta após o cadastro bem-sucedido
      navigation.navigate('AlertCadastro');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      // Exibe uma mensagem de erro ao usuário se o cadastro falhar
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animatable.Image
          animation="flipInY"
          source={require('../assets/logobrancasemfundo.png')}
          style={styles.logo}
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.form}>
        <TextInput
          style={[styles.input, { borderColor: '#A9A9A9' }]}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { borderColor: '#A9A9A9' }]}
          placeholder="Usuário"
          placeholderTextColor="#A9A9A9"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={[styles.input, { borderColor: '#A9A9A9' }]}
          placeholder="Senha"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={mkUser}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Já tem conta? Faça o Login!</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Text style={styles.footerText}>© Positive Mind</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25724D',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  form: {
    width: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000000',
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#71BE99',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginButton: {
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000',
    fontSize: 14,
  },
  footerText: {
    marginTop: 30,
    color: '#D9D9D9',
    fontSize: 12,
  },
});

export default Cadastro;
