import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Animação para a logo da empresa
  const logoScale = useSharedValue(0.8);  // Escala inicial maior
  const logoOpacity = useSharedValue(0);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  useEffect(() => {
    logoScale.value = withSequence(
      withTiming(1.5, { duration: 1200, easing: Easing.out(Easing.exp) }),  // Aumentei o valor máximo
      withTiming(1.3, { duration: 600 }),  // Mantém um tamanho grande
      withTiming(1.4, { duration: 500 })   // Pequeno ajuste para dar movimento final
    );
    logoOpacity.value = withTiming(1, { duration: 1000 });

    setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);  // Tempo de transição até a próxima tela
  }, [navigation]);

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Erro</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(27, 115, 73)', 'rgb(27, 118, 73)']}  // Verde sólido aplicado
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.section}>
          <Text style={styles.title}>
            Cuidando da sua mente!
          </Text>  {/* Texto reposicionado para cima */}
          <Animated.Image
            style={[styles.logoEmpresa, logoAnimatedStyle]}  // Logo abaixo do texto, aumentada
            source={require('../assets/logobrancasemfundo.png')}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoEmpresa: {
    width: 300,  // Logo BEM maior
    height: 300,  // Proporção maior
    marginTop: 5,  // Espaço após o texto
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,  // Fonte diminuída para 16
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,  // Espaço entre o texto e a logo
  },
});

export default SplashScreen;
