import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialImages = ['🌞', '🌜', '🌟', '🌈', '⚡', '🔥'];
const levels = [4, 6, 8, 10, 12]; // Números de pares de cartas para cada nível

export default function MemoryGame() {
  const navigation = useNavigation();
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    startLevel();
  }, [level]);

  const startLevel = () => {
    const newCards = [
      ...initialImages.slice(0, levels[level]),
      ...initialImages.slice(0, levels[level]),
    ].sort(() => Math.random() - 0.5);
    setCards(newCards);
    setSelected([]);
    setMatched([]);
  };

  const handleSelect = (index) => {
    if (selected.length < 2 && !selected.includes(index)) {
      setSelected([...selected, index]);
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 1000);
      }
    }
  }, [selected]);

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };

  const handleBackToHome = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nível {level + 1}</Text>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <Text style={styles.backButtonText}>Voltar para Home</Text>
      </TouchableOpacity>

      <FlatList
        data={cards}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.card, matched.includes(index) && styles.matched]}
            onPress={() => !matched.includes(index) && handleSelect(index)}
          >
            <Text style={styles.cardText}>
              {selected.includes(index) || matched.includes(index) ? item : '?'}
            </Text>
          </TouchableOpacity>
        )}
      />

      {matched.length === cards.length && (
        <TouchableOpacity style={styles.nextLevelButton} onPress={handleNextLevel}>
          <Text style={styles.nextLevelButtonText}>🎉 Próximo Nível</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1F5FE', // Fundo suave
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1C5739', // Verde escuro
  },
  card: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: '#25724D', // Verde médio
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cardText: {
    fontSize: 32,
    color: '#FFFFFF', // Texto branco para melhor contraste
  },
  matched: {
    backgroundColor: '#71BE99', // Verde claro quando pareado
  },
  backButton: {
    padding: 10,
    backgroundColor: '#71BE99', // Verde claro
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nextLevelButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4CAF50', // Cor para o botão de próximo nível (verde)
    borderRadius: 10,
  },
  nextLevelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
