import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'; // Troquei Button por TouchableOpacity

export default function App() {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/logopadrao.png')} style={styles.logo} />
      <Text style={styles.agradecimento}>Bem Vindo!</Text>
      <Text style={styles.cadastro}>Não tem uma conta? Inscreva-se</Text>

      <TextInput style={styles.inputs} placeholder="Nome de usuário ou Email" />
      <TextInput style={styles.inputs} placeholder="Senha" secureTextEntry={true} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.link}>
        Esqueceu a senha? <Text style={styles.helpLink}>Obtenha ajuda</Text> para redefinir sua senha.
      </Text>

      <Text style={styles.healthMessage}>Priorize sua saúde mental</Text> {/* Adicionando a nova frase */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agradecimento: {
    fontSize: 24,
    marginBottom: 20,
  },
  cadastro: {
    fontSize: 15,
    marginBottom: 18
  },
  inputs: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#86BAA0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  link: {
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  helpLink: {
    color: '#86BAA0',
    textDecorationLine: 'none',
  },
  healthMessage: {
    backgroundColor: '#86BAA0', // Cor verde
    color: '#fff', // Cor do texto
    fontSize: 18,
    padding: 25, // Aumentando o padding
    borderRadius: 40,
    marginTop: 20,
  },
  logoContainer: {
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Para ajustar o tamanho da imagem
  },
});
