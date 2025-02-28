import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { useRouter } from 'expo-router'; 

interface Carro {
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    quilometros: number;
}

export default function AddScreen() {
    console.log('AddScreen Loaded');
    const router = useRouter();

    const [matricula, setMatricula] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');
    const [quilometros, setQuilometros] = useState('');

    const handleCarData = async () => {
        if (!matricula || !marca || !modelo || !ano || !cor || !quilometros) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }

        const newCar: Carro = {
            marca,
            modelo,
            ano: parseInt(ano),
            cor,
            quilometros: parseInt(quilometros),
        };

        try {
            const storedCars = await AsyncStorage.getItem('carros');
            let carros: { [key: string]: Carro } = storedCars ? JSON.parse(storedCars) : {}; // Tipagem explícita

            carros[matricula] = newCar;

            await AsyncStorage.setItem('carros', JSON.stringify(carros));

            Alert.alert('Sucesso', 'Veículo adicionado com sucesso!');
            console.log('Carro guardado:', newCar);

            setMatricula('');
            setMarca('');
            setModelo('');
            setAno('');
            setCor('');
            setQuilometros('');
        } catch (error) {
            console.log('Erro ao guardar veículo:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar veículo</Text>

            <TextInput
                style={styles.input}
                placeholder='Matrícula (XX-XX-XX)'
                placeholderTextColor='#cccccc'
                value={matricula}
                onChangeText={setMatricula}
            />
            <TextInput
                style={styles.input}
                placeholder='Marca'
                placeholderTextColor='#cccccc'
                value={marca}
                onChangeText={setMarca}
            />
            <TextInput
                style={styles.input}
                placeholder='Modelo'
                placeholderTextColor='#cccccc'
                value={modelo}
                onChangeText={setModelo}
            />
            <TextInput
                style={styles.input}
                placeholder='Ano'
                placeholderTextColor='#cccccc'
                keyboardType="numeric"
                value={ano}
                onChangeText={setAno}
            />
            <TextInput
                style={styles.input}
                placeholder='Cor'
                placeholderTextColor='#cccccc'
                value={cor}
                onChangeText={setCor}
            />
            <TextInput
                style={styles.input}
                placeholder='Quilómetros'
                placeholderTextColor='#cccccc'
                keyboardType="numeric"
                value={quilometros}
                onChangeText={setQuilometros}
            />

            <TouchableOpacity style={styles.buttonAdd} onPress={handleCarData}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBack} onPress={() => router.push('/')}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 30,
    },
    input: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        color: 'white',
    },
    buttonAdd: {
        backgroundColor: '#4469cf',
        padding: 16,
        width: '50%',
        marginTop: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonBack: {
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
    },
});
