import React, { useState } from "react";
import { View, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Animated} from 'react-native';

export default function App() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const usuarioLogado = "Luis";

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <Animated.View
        style={[
          styles.header,
          {
            height: scrollY.interpolate({
              inputRange:[10, 160, 185],
              outputRange:[140, 20, 0],
              extrapolate: 'clamp',
            }),
            opacity: scrollY.interpolate({
              inputRange:[1, 75, 170],
              outputRange:[1, 1, 0]
            })
          }
        ]}
      >
        <Image
          source={require('./src/assets/logo-site.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.textoBemVindo}>Seja bem-vindo, {usuarioLogado}</Text>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event([{
          nativeEvent:{
            contentOffset: {y: scrollY }
          },
        }], {useNativeDriver: false})}
      >
        <View style={styles.box}>
          <Image
            source={require('./src/assets/banner.png')} 
            style={{ flex: 1, width: '100%', height: '100%', borderRadius: 5 }}
            resizeMode="contain" // Alterado para "contain" para ajustar a imagem dentro da box
          />
        </View>

        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#86BAA0",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ffff",
  },
  logo: {
    width: 50,
  },
  textoBemVindo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  box: {
    height: 300,
    backgroundColor:"#DDD",
    margin: 7,
    borderRadius: 5
  },
});
