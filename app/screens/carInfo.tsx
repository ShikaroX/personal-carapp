import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, KeyboardAvoidingView, Platform } from 'react-native';
// @ts-ignore
import { useLocalSearchParams } from 'expo-router';

interface Carro {
  ano: number;
  cor: string;
  quilometros: number;
  combustivel: string;
  propietario: string;
}

interface Nota {
  data: string;
  texto: string;
}

export default function CarInfo() {
  const { matricula } = useLocalSearchParams();
  const [carro, setCarro] = useState<Carro | null>(null);
  const [notas, setNotas] = useState<Nota[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [dataNota, setDataNota] = useState('');
  const [textoNota, setTextoNota] = useState('');

  useEffect(() => {
    const getStoredCar = async () => {
      try {
        const storedCars = await AsyncStorage.getItem('carros');
        if (storedCars) {
          const parsedCars: { [key: string]: Carro } = JSON.parse(storedCars);
          if (parsedCars[matricula]) {
            setCarro(parsedCars[matricula]);
          }
        }

        const storedNotas = await AsyncStorage.getItem(`notas_${matricula}`);
        if (storedNotas) {
          setNotas(JSON.parse(storedNotas));
        }
      } catch (error) {
        console.log('Erro ao recuperar veículo ou notas:', error);
      }
    };

    getStoredCar();
  }, [matricula]);

  const validarData = (data: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(data);
  };

  const adicionarNota = async () => {
    if (!validarData(dataNota) || textoNota.trim() === '') {
      alert('Por favor, insira uma data válida no formato DD/MM/AAAA e um texto.');
      return;
    }

    const novaNota: Nota = { data: dataNota, texto: textoNota };
    const novasNotas = [...notas, novaNota];

    setNotas(novasNotas);
    await AsyncStorage.setItem(`notas_${matricula}`, JSON.stringify(novasNotas));

    setDataNota('');
    setTextoNota('');
    setModalVisible(false);
  };

  const apagarNota = async (index: number) => {
    const novasNotas = notas.filter((_, i) => i !== index);
    setNotas(novasNotas);
    await AsyncStorage.setItem(`notas_${matricula}`, JSON.stringify(novasNotas));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Informações sobre o veículo</Text>

        {carro ? (
          <View style={styles.infoContainer}>
            <View style={styles.oddSpace}>
              <Text style={styles.carText}>Ano: {carro.ano}</Text>
            </View>
            <Text style={styles.carText}>Cor: {carro.cor}</Text>
            <View style={styles.oddSpace}>
              <Text style={styles.carText}>Combustível: {carro.combustivel}</Text>
            </View>
            <Text style={styles.carText}>Quilômetros: {carro.quilometros} km</Text>
            <View style={styles.oddSpace}>
              <Text style={styles.carText}>Proprietário: {carro.propietario}</Text>
            </View>

            <Text style={styles.subtitle}>Notas:</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>+ Adicionar Nota</Text>
            </TouchableOpacity>

            <FlatList
              data={notas}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.noteItem}>
                  <Text style={styles.noteText}>{item.data}: {item.texto}</Text>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => apagarNota(index)}>
                    <Text style={styles.deleteButtonText}>Apagar</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.carText}>Nenhuma nota adicionada.</Text>}
            />
          </View>
        ) : (
          <Text style={styles.carText}>Veículo não encontrado!</Text>
        )}

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Nota</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Data (DD/MM/AAAA)"
                placeholderTextColor="#aaa"
                keyboardType="default"
                value={dataNota}
                onChangeText={setDataNota}
                maxLength={10} 
              />
              
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Escreva a nota..."
                placeholderTextColor="#aaa"
                multiline
                value={textoNota}
                onChangeText={setTextoNota}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={adicionarNota}>
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    width: '100%',
  },
  infoContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 25,
    color: 'white',
    marginTop: 30,
    marginBottom: 10,
  },
  oddSpace: {
    backgroundColor: '#353536',
    width: '100%',
  },
  carText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  noteItem: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#444',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  inputMultiline: {
    backgroundColor: '#444',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
});
