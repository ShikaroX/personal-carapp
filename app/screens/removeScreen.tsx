import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


export default function RemoveScreen() {
    const [matricula, setMatricula] = useState('')

    const handleRemover = async () => {
        if (!matricula) {
            Alert.alert('Erro', 'Insira a matrícula do veículo!')
            return;
        }

        try {
            const storedCars = await AsyncStorage.getItem('carros');
            let carros = storedCars ? JSON.parse(storedCars) : {};

            if (carros.hasOwnProperty(matricula)) {
                delete carros[matricula];
                await AsyncStorage.setItem('carros', JSON.stringify(carros))
                Alert.alert('Sucesso', 'Veículo removido com sucesso!');
                setMatricula('')
            } else {
                Alert.alert('Erro', 'Veículo não registado!');
            }
        } catch (error) {
            console.log('Erro ao remover veículo: ', error);
            Alert.alert('Erro', 'Ocorreu um erro ao remover o veículo!')
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remover veículo</Text>
      <TextInput style={styles.input} placeholder='XX-XX-XX' placeholderTextColor='#cccccc' value={matricula} onChangeText={setMatricula}/>
        <TouchableOpacity style={styles.buttonRemove} onPress={handleRemover} >
            <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        backgroundColor: '#000',
        width: '100%'
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 80,
    },
    input: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        color: 'white',
    },
    buttonRemove: {
        backgroundColor: '#570d0d',
        padding: 16,
        width: '50%',
        marginTop: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }

})