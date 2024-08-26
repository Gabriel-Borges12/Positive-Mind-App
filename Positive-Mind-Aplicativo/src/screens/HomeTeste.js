import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;

const frases = [
  "Acredite em si mesmo e tudo será possível.",
  "O sucesso nasce do querer, da determinação e persistência.",
  "Se você traçar metas absurdamente altas e falhar, seu fracasso será muito melhor que o sucesso de todos.",
  "Não tenha medo da mudança. Coisas boas se vão para que melhores possam vir.",
  "A persistência é o caminho do êxito.",
  "Só existe um êxito: a capacidade de viver a vida do seu jeito."
];

export default function Home({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo(a) de volta</Text>
        <Text style={styles.username}>Gabriel</Text>
        <Image source={require('../assets/iconp.jpg')} style={styles.profileImage} />
      </View>

      <View style={styles.motivationalContainer}>
        <Text style={styles.motivationalText}>Frase Diária Motivadora</Text>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          loop={true}
          autoplay={true}
          autoplayTimeout={5}
          paginationStyle={styles.paginationStyle}
          activeDotColor="#fff"
        >
          {frases.map((frase, index) => (
            <View style={styles.slide} key={index}>
              <Text style={styles.motivationalQuote}>"{frase}"</Text>
            </View>
          ))}
        </Swiper>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.imageButton}>
          <Image source={require('../assets/logo-site.png')} style={styles.imageButtonImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações sobre saúde mental</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/health.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Gabriel Borges</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/health.jpg')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exercícios e Técnicas</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/peoplereunion.jpg')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/peoplereunion.jpg')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recomendado para você</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/guy.jpg')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/guy.jpg')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 16,
    color: '#333',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  motivationalContainer: {
    backgroundColor: '#1C5739',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  motivationalText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wrapper: {
    width: screenWidth * 0.8,  // Ajusta o tamanho do swiper
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,  // Ajuste para garantir que o texto não saia da tela
  },
  motivationalQuote: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,  // Melhorar a legibilidade
  },
  paginationStyle: {
    bottom: 10,
  },
  imageButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  section: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
