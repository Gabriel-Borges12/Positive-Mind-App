import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/banner.png')} style={[styles.banner, { height: screenHeight * 0.2 }]} />
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>Você não está sozinho(a).</Text>
        <Text style={styles.title}>Recursos</Text>
      </View>

      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/iconpsicologo.png')} style={styles.image} />
          <Text style={styles.subtitle}>Psicólogo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/iconmotivation.png')} style={styles.image} />
          <Text style={styles.subtitle}>Motivação</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/iconrelaxar.png')} style={styles.image} />
          <Text style={styles.subtitle}>Comunidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/icontranstornomental.jpg')} style={styles.image} />
          <Text style={styles.subtitle}>Sobre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  banner: {
    position: 'absolute',
    top: 0,
    width: screenWidth,
    resizeMode: 'cover',
  },
  titleContainer: {
    marginTop: screenHeight * 0.2 + 10, 
    alignItems: 'center',
    marginBottom: 20, 
  },
  title: {
    color: '#1C5739',
    fontSize: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10, 
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  image: {
    width: 60, 
    height: 60, 
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
