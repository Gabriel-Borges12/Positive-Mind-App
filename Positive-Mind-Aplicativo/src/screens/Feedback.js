import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const options = [
  { id: '1', emoji: '😄', color: '#A8E6CF' },
  { id: '2', emoji: '😊', color: '#DCEDC1' },
  { id: '3', emoji: '😐', color: '#FFD3B6' },
  { id: '4', emoji: '🙁', color: '#FFAAA5' },
  { id: '5', emoji: '😞', color: '#FF8B94' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://your-image-url.com/photo.jpg' }} // Substitua pela URL da sua imagem
          style={styles.profileImage} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.question}>Como você está se sentindo hoje?</Text>
        
        <FlatList
          data={options}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.optionButton, { backgroundColor: item.color }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </View>

      <Text style={styles.date}>Hoje é Quarta, 27/07</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  question: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 20,
  },
  optionButton: {
    width: '80%',
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  date: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginVertical: 10,
  },
});
