import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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

export default function CarListScreen() {
    const router = useRouter();
    const [carros, setCarros] = useState<[string, Carro][]>([]); 

    const getStoredCars = async () => {
        try {
            const storedCars = await AsyncStorage.getItem('carros');
            if (storedCars) {
                const parsedCars: { [key: string]: Carro } = JSON.parse(storedCars);
                setCarros(Object.entries(parsedCars)); 
            }
        } catch (error) {
            console.log('Erro ao recuperar carros:', error);
        }
    };

    useEffect(() => {
        getStoredCars();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Veículos adicionados</Text>

            {carros.length === 0 ? (
                <Text style={styles.noData}>Nenhum carro guardado.</Text>
            ) : (
                <FlatList
                    data={carros}
                    keyExtractor={(item) => item[0]} 
                    renderItem={({ item }) => (
                        <View style={styles.carItem}>
                            <TouchableOpacity onPress={() => router.push('/screens/carInfo')}>
                                <Text style={styles.carText}>Matrícula: {item[0]}</Text>
                                <Text style={styles.carText}>Marca: {item[1].marca}</Text>
                                <Text style={styles.carText}>Modelo: {item[1].modelo}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        color: 'white',
        marginBottom: 30,
        marginTop: 60,
    },
    noData: {
        color: '#ccc',
        fontSize: 18,
    },
    carItem: {
        backgroundColor: '#1f1f1f',
        padding: 15,
        marginVertical: 10,
        borderRadius: 20,
        width: '100%',
    },
    carText: {
        color: 'white',
        fontSize: 20,
    },
});
