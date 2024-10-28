import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HealthDetail({ route, navigation }) {
  const { title, content } = route.params;

  return (
    <View style={styles.container}>
      {/* Título e botão de voltar */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo detalhado */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.contentText}>{content}</Text>

        {/* Informações adicionais */}
        <Text style={styles.additionalInfoTitle}>Informações adicionais</Text>
        <Text style={styles.additionalInfoText}>
          Aqui estão mais detalhes sobre {title.toLowerCase()} para ajudar a entender melhor como lidar com essa condição.
          Considere sempre buscar ajuda profissional e utilizar recursos de apoio disponíveis.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#00796b',
    padding: 8,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});
