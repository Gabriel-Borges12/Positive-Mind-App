import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const DiarioEmocional = ({ route }) => {
  const [situacoes, setSituacoes] = useState({});
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (route.params?.novaSituacao) {
      const novaSituacao = route.params.novaSituacao;
      setSituacoes((prevSituacoes) => {
        const novasSituacoes = { ...prevSituacoes };
        if (!novasSituacoes[novaSituacao.data]) {
          novasSituacoes[novaSituacao.data] = [];
        }
        novasSituacoes[novaSituacao.data].push(novaSituacao);
        return novasSituacoes;
      });
    }
  }, [route.params?.novaSituacao]);

  const handleAddSituacao = () => {
    navigation.navigate('AdicionarSituacao', { dataSelecionada });
  };

  const handleSituacaoClick = (situacao) => {
    navigation.navigate('AdicionarSituacao', { situacao });
  };

  const handleDayPress = (day) => {
    setDataSelecionada(day.dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diário Emocional</Text>
      </View>
      
      <Calendar
        style={styles.calendar}
        onDayPress={handleDayPress}
        markedDates={{
          [dataSelecionada]: { selected: true, selectedColor: '#7FD0A5' },
          ...Object.keys(situacoes).reduce((acc, key) => {
            acc[key] = { marked: true, dotColor: situacoes[key][0].cor };
            return acc;
          }, {}),
        }}
        theme={{
          backgroundColor: '#f0f4f7',
          calendarBackground: '#fff',
          textSectionTitleColor: '#2d4150',
          selectedDayBackgroundColor: '#7FD0A5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: 'orange',
          monthTextColor: 'black',
        }}
      />
      
      <ScrollView style={styles.situations}>
        {situacoes[dataSelecionada]?.map((situacao) => (
          <TouchableOpacity key={situacao.id} onPress={() => handleSituacaoClick(situacao)}>
            <View style={[styles.situationContainer, { backgroundColor: situacao.cor }]}>
              <Text style={styles.situationText}>{situacao.titulo}</Text>
              <Switch value={situacao.importante} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.botaoAdicionar} onPress={handleAddSituacao}>
        <Text style={styles.textoBotao}>Adicionar Situação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  calendar: {
    marginBottom: 20,
  },
  situations: {
    flex: 1,
  },
  situationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  situationText: {
    fontSize: 16,
    color: '#ffffff',
  },
  botaoAdicionar: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default DiarioEmocional;
