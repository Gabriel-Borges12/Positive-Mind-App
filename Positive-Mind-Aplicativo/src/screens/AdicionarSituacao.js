import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

const AdicionarSituacao = ({ route, navigation }) => {
  const { situacao, dataSelecionada } = route.params || {};
  const [titulo, setTitulo] = useState(situacao?.titulo || '');
  const [descricao, setDescricao] = useState(situacao?.descricao || '');
  const [cor, setCor] = useState(situacao?.cor || '#ff6666');
  const [data, setData] = useState(
    situacao?.data instanceof Date ? situacao.data : new Date(situacao?.data) || new Date(dataSelecionada)
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const coresEmocionais = ['#66ccff', '#66ff66', '#ffff66', '#ff6666', '#ff66ff', '#ffcc66'];

  const handleSave = async () => {
    const novaSituacao = {
      id: situacao ? situacao.id : new Date().getTime(),
      titulo,
      descricao,
      cor,
      data: data.toISOString().split('T')[0],
      importante: false,
    };

    try {
      if (situacao) {
        // Atualizar uma situação existente
        await firestore().collection('situacoes').doc(situacao.id.toString()).update(novaSituacao);
      } else {
        // Adicionar uma nova situação
        await firestore().collection('situacoes').add(novaSituacao);
      }
      navigation.navigate('DiarioEmocional', { novaSituacao });
    } catch (error) {
      console.error('Erro ao salvar a situação:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    if (currentDate instanceof Date) {
      setShowDatePicker(false);
      setData(currentDate);
    } else {
      console.error('Selected date is not a valid Date object.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escreva aqui suas anotações</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, styles.descricaoInput]}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.subtitle}>Cor emocional</Text>
      <View style={styles.coresContainer}>
        {coresEmocionais.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.corCirculo, { backgroundColor: color }, cor === color && styles.corSelecionada]}
            onPress={() => setCor(color)}
          />
        ))}
      </View>

      <Text style={styles.subtitle}>Data</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dataText}>{data.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.botaoAdicionar} onPress={handleSave}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  descricaoInput: {
    height: 100,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1B5E20',
  },
  coresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  corCirculo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  corSelecionada: {
    borderWidth: 3,
    borderColor: '#1B5E20',
  },
  dataText: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 30,
  },
  botaoAdicionar: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default AdicionarSituacao;