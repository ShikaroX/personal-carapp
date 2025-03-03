import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à CarApp!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => router.push('/screens/addScreen')}>
          <Text style={styles.buttonText}>Adicionar veículo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRemove} onPress={() => router.push('/screens/removeScreen')}>
          <Text style={styles.buttonText}>Remover veículo</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 120, 
  },

  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 1,
  },

  buttonContainer: {
    flex: 1,  
    justifyContent: 'center',
    marginBottom: 450,
  },

  buttonAdd: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
  },

  buttonRemove: {
    backgroundColor: '#570d0d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
