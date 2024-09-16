import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth'; // Caso esteja usando Firebase para autenticação

const slides = [
  {
    key: '1',
    title: 'Obrigado por nos apoiar.',
    text: 'Estamos aqui para fazer o mesmo com você!',
    image: require('../assets/obrigado.png')
  },
  {
    key: '2',
    title: 'Nosso aplicativo conta com diversos recursos.',
    text: 'Fique à vontade para usufruir.',
    image: require('../assets/recursos2.png'),
  },
  {
    key: '3',
    title: 'Ajudar sempre que pudermos.',
    text: 'Saúde mental não é mais questão de brincadeira e sim, preocupação.',
    image: require('../assets/pessoasteste.png'),
  }
];

export default function App({ navigation }) {
  const [showHome, setShowHome] = useState(false);
  const auth = getAuth(); // Obter a instância do auth para pegar o usuário

  useEffect(() => {
    // Verifica se o usuário já viu o tutorial
    const checkIfIntroSeen = async () => {
      const user = auth.currentUser; // Obter o usuário atual

      if (user) {
        const userId = user.uid; // Pegar o ID do usuário

        // Checar se o usuário já viu o tutorial, usando o ID do usuário como parte da chave
        const seenIntro = await AsyncStorage.getItem(`hasSeenIntro_${userId}`);
        if (seenIntro === 'true') {
          setShowHome(true); // Se já viu, navega direto para a Home
          navigation.replace('Home');
        }
      }
    };

    checkIfIntroSeen();
  }, [navigation, auth]);

  const handleDone = async () => {
    // Marca que o tutorial foi visto e navega para a Home
    const user = auth.currentUser; // Obter o usuário atual

    if (user) {
      const userId = user.uid; // Pegar o ID do usuário

      // Salvar a informação que o tutorial foi visto para o ID do usuário
      await AsyncStorage.setItem(`hasSeenIntro_${userId}`, 'true');
      setShowHome(true);
      navigation.replace('Home'); // Redireciona diretamente para a tela Home
    }
  };

  function renderSlides({ item }) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={item.image}
          style={{
            resizeMode: 'contain',
            width: '100%',
          }}
        />
        <Text style={{
        textAlign: 'center',
          paddingTop: 25,
          paddingBottom: 10,
          fontSize: 23,
          fontWeight: 'bold',
          color: '#86BAA0',
          alignSelf: 'center'
          
        }}>{item.title}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            color: '#b5b5b5',
            paddingHorizontal: 25,
            fontSize: 15,
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  }

  return (
    <AppIntroSlider
      renderItem={renderSlides}
      data={slides}
      activeDotStyle={{
        backgroundColor: '#86BAA0',
        width: 30,
      }}
      renderNextButton={() => (
        <Text style={{ fontSize: 18, color: '#86BAA0' }}>Próximo →</Text>
      )}
      renderPrevButton={() => (
        <Text style={{ fontSize: 18, color: '#86BAA0' }}>← Anterior</Text>
      )}
      renderDoneButton={() => (
        <Text style={{ fontSize: 18, color: '#86BAA0' }}>Acessar!</Text>
      )}
      showPrevButton={true} // Exibe o botão anterior
      onDone={handleDone} // Chama o método para salvar e navegar para a Home
    />
  );
}
