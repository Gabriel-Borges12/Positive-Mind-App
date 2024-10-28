import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../firebase'; // Caminho correto para seu arquivo firebase.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localização para português do Brasil

const DiarioEmocional = () => {
  const [currentDate, setCurrentDate] = useState(moment().format('LL')); // Data atual no formato "LL" em pt-BR
  const [content, setContent] = useState(''); // Conteúdo do diário
  const [selectedEmotion, setSelectedEmotion] = useState(''); // Emoção selecionada
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const userId = auth.currentUser.uid; // Obtém o ID do usuário logado

  // Função para carregar a entrada do diário para o dia atual
  const loadDiaryEntry = async (date) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'diaries', userId, 'entries', date); // Firestore referência
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setContent(data.content || ''); // Se houver conteúdo, define-o
        setSelectedEmotion(data.emotion || ''); // Se houver emoção, define-a
      } else {
        setContent(''); // Se não houver entrada para esse dia, inicializa com vazio
        setSelectedEmotion(''); // Reseta emoção se não houver entrada
      }
    } catch (error) {
      console.error('Erro ao carregar o diário: ', error);
      Alert.alert('Erro', 'Erro ao carregar a entrada do diário.');
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar o conteúdo do diário e a emoção
  const saveDiaryEntry = async () => {
    try {
      const docRef = doc(db, 'diaries', userId, 'entries', currentDate); // Firestore referência para salvar
      await setDoc(docRef, {
        content: content,
        emotion: selectedEmotion, // Salvando a emoção selecionada
        date: currentDate,
      });
      Alert.alert('Sucesso', 'Entrada do diário salva!');
    } catch (error) {
      console.error('Erro ao salvar a entrada do diário: ', error);
      Alert.alert('Erro', 'Erro ao salvar a entrada do diário.');
    }
  };

  // Carregar o diário ao iniciar
  useEffect(() => {
    loadDiaryEntry(currentDate);
  }, [currentDate]);

  // Navegar para o dia anterior
  const goToPreviousDay = () => {
    const previousDate = moment(currentDate, 'LL').subtract(1, 'days').format('LL');
    setCurrentDate(previousDate);
  };

  // Navegar para o próximo dia (caso seja diferente de hoje)
  const goToNextDay = () => {
    const nextDate = moment(currentDate, 'LL').add(1, 'days').format('LL');
    if (!moment(nextDate, 'LL').isAfter(moment())) {
      setCurrentDate(nextDate);
    }
  };

  // Função para definir emoção selecionada
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  // Função para retornar a cor do botão de emoção
  const getEmotionButtonStyle = (emotion) => {
    switch (emotion) {
      case 'Feliz':
        return selectedEmotion === 'Feliz' ? styles.happyButton : styles.emotionButton;
      case 'Triste':
        return selectedEmotion === 'Triste' ? styles.sadButton : styles.emotionButton;
      case 'Ansioso':
        return selectedEmotion === 'Ansioso' ? styles.anxiousButton : styles.emotionButton;
      case 'Calmo':
        return selectedEmotion === 'Calmo' ? styles.calmButton : styles.emotionButton;
      case 'Irritado':
        return selectedEmotion === 'Irritado' ? styles.angryButton : styles.emotionButton;
      default:
        return styles.emotionButton;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{currentDate}</Text>

      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <>
            <TextInput
              style={styles.textInput}
              multiline
              value={content}
              onChangeText={setContent}
              placeholder="Escreva sua entrada de hoje aqui..."
            />

            {/* Campo de Emoções */}
            <View style={styles.emotionContainer}>
              <Text style={styles.emotionLabel}>Como você está se sentindo hoje?</Text>
              <View style={styles.emotionButtons}>
                {['Feliz', 'Triste', 'Ansioso', 'Calmo', 'Irritado'].map((emotion) => (
                  <TouchableOpacity
                    key={emotion}
                    style={getEmotionButtonStyle(emotion)}
                    onPress={() => handleEmotionSelect(emotion)}
                  >
                    <Text
                      style={[
                        styles.emotionButtonText,
                        selectedEmotion === emotion && styles.selectedEmotionButtonText,
                      ]}
                    >
                      {emotion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={goToPreviousDay}>
          <Text style={styles.navButtonText}>Dia Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveDiaryEntry}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, moment(currentDate, 'LL').isSame(moment(), 'day') && styles.disabledButton]}
          onPress={goToNextDay}
          disabled={moment(currentDate, 'LL').isSame(moment(), 'day')}
        >
          <Text style={styles.navButtonText}>Próximo Dia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  textInput: {
    height: 200,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  emotionContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  emotionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emotionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emotionButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  happyButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFD700', // Amarelo para "Feliz"
    borderWidth: 1,
    borderColor: '#CCC',
  },
  sadButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1E90FF', // Azul escuro para "Triste"
    borderWidth: 1,
    borderColor: '#CCC',
  },
  anxiousButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFA500', // Laranja para "Ansioso"
    borderWidth: 1,
    borderColor: '#CCC',
  },
  calmButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#A9A9A9', // Cinza para "Calmo"
    borderWidth: 1,
    borderColor: '#CCC',
  },
  angryButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FF4500', // Vermelho para "Irritado"
    borderWidth: 1,
    borderColor: '#CCC',
  },
  emotionButtonText: {
    fontSize: 16,
  },
  selectedEmotionButtonText: {
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
});

export default DiarioEmocional;
