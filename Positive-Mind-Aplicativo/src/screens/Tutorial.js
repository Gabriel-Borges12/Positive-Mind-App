import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const App = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image source={require('../assets/mental 1.png')} style={styles.headerImage} />
          <View style={styles.overlay} />
          <Text style={styles.title}>Como está sua saúde mental?</Text>
        </View>

        <View style={styles.section}>
          <Image source={require('../assets/Ellipse 3.png')} style={styles.sectionImage} />
          <Text style={[styles.text, styles.centerText]}>
            Já parou para pensar no assunto? Alguma vez refletiu se os seus pensamentos, ideias e sentimentos estão em harmonia?
          </Text>
        </View>

        <View style={styles.sectionRow}>
          <Image source={require('../assets/Ellipse 4.png')} style={styles.sectionImageSmall} />
          <Text style={[styles.text, styles.centerText]}>
            Sabe a diferença entre saúde mental e doença ou transtorno mental?
          </Text>
        </View>

        <View style={styles.sectionRow}>
          <Image source={require('../assets/Ellipse 5.png')} style={styles.sectionImageSmall} />
          <Text style={[styles.text, styles.centerText]}>
            Entenda mais sobre os transtornos mentais, se conecte!
          </Text>
        </View>

        <View style={styles.section}>
          <Image source={require('../assets/ImagemAplicativoPM 3.png')} style={styles.sectionImage} />
          <Text style={styles.sectionTitle}>Transtornos Mentais</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            De acordo com a OMS, cerca de 10% da população mundial sofre com transtornos mentais.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Na América Latina, quase 16 milhões de jovens entre 10 e 19 anos têm algum transtorno mental.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Estresse, genética, nutrição, infecções e exposição a perigos ambientais são fatores que contribuem para os transtornos mentais.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Mais informações</Text>
          <View style={styles.iconRow}>
            <Image source={require('../assets/Ellipse 8.png')} style={styles.icon} />
            <Image source={require('../assets/Ellipse 9.png')} style={styles.icon} />
            <Image source={require('../assets/Ellipse 10.png')} style={styles.icon} />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => { /* ação ao pular */ }}>
        <Text style={styles.buttonText}>Pular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  scrollViewContent: {
    paddingBottom: 150,
  },
  header: {
    width: screenWidth,
    height: screenHeight * 0.4,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 20,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 20,
  },
  sectionImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  sectionImageSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#4f4f4f',
    textAlign: 'left',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00796b',
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;