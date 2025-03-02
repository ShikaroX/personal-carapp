import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { useRouter } from 'expo-router';

interface Carro {
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    quilometros: number; 
    combustivel: string;
    propietario: string;
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
    const [combustivel, setCombustivel] = useState('');
    const [propietario, setPropietario] = useState('');

    const handleCarData = async () => {
        if (!matricula || !marca || !modelo || !ano || !cor || !quilometros || !combustivel || !propietario) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }

        const newCar: Carro = {
            marca,
            modelo,
            ano: parseInt(ano),
            cor,
            quilometros: parseInt(quilometros),
            combustivel,
            propietario,
        };

        try {
            const storedCars = await AsyncStorage.getItem('carros');
            let carros: { [key: string]: Carro } = storedCars ? JSON.parse(storedCars) : {}; 

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
            setCombustivel('');
            setPropietario('');

        } catch (error) {
            console.log('Erro ao guardar veículo:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Adicionar veículo</Text>

                <Text style={styles.subtitle}>Matrícula</Text> 
                <TextInput style={styles.input} placeholder='XX-XX-XX' placeholderTextColor='#cccccc' value={matricula} onChangeText={setMatricula} />

                <Text style={styles.subtitle}>Marca</Text>
                <TextInput style={styles.input} value={marca} onChangeText={setMarca} />

                <Text style={styles.subtitle}>Modelo</Text>
                <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

                <Text style={styles.subtitle}>Ano</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={ano} onChangeText={setAno} />

                <Text style={styles.subtitle}>Cor</Text>  
                <TextInput style={styles.input} value={cor} onChangeText={setCor} />

                <Text style={styles.subtitle}>Quilômetros</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={quilometros} onChangeText={setQuilometros} />

                <Text style={styles.subtitle}>Combustível</Text>
                <TextInput style={styles.input} value={combustivel} onChangeText={setCombustivel} />

                <Text style={styles.subtitle}>Proprietário</Text>
                <TextInput style={styles.input} value={propietario} onChangeText={setPropietario} />

                <TouchableOpacity style={styles.buttonAdd} onPress={handleCarData}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonBack} onPress={() => router.push('/')}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        width: '100%',
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
    subtitle: {
        color: 'white',
        fontSize: 15,
        alignItems: 'center',
        backgroundColor: '#000',
        marginBottom: 7,
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

