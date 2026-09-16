import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { database } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Componente Add para agregar un nuevo usuario
const Add = ({ navigation }) => {
    // Estado inicial del usuario
    const [usuario, setusuario] = useState({
        nombre: '',
        fecha: '',
        carnet: '',
        url: '',
    });

    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
        navigation.goBack();
    };

    // Función para agregar el usuario a Firestore
    const agregarusuario = async () => {
        console.log('--- Botón presionado: intentando agregar usuario ---');
        console.log('Datos del usuario a guardar:', usuario);
        console.log('Referencia a la base de datos:', database);

        try {
            const docRef = await addDoc(collection(database, 'usuarios'), { ...usuario });
            console.log('Se guardo:', docRef.id);

            Alert.alert('Usuario agregado', 'El usuario se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            Alert.alert('Error', `Ocurrió un error al agregar el usuario: ${error.message || error}`);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={styles.title}>Agregar usuario</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>nombre:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setusuario({ ...usuario, nombre: text })}
                        value={usuario.nombre}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha nacimiento:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setusuario({ ...usuario, fecha: text })}
                        value={usuario.fecha}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>carnet:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setusuario({ ...usuario, carnet: text })}
                        value={usuario.carnet}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>URL:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setusuario({ ...usuario, url: text })}
                        value={usuario.url}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={agregarusuario}>
                    <Text style={styles.buttonText}>Agregar usuario</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={goToHome}>
                    <Text style={styles.buttonText}>Volver a home</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Add;

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#ffffff',
    },
    input: {
        height: 40,
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        width: '100%',
    },
    button: {
        backgroundColor: '#1b5e20',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#ffffff',
    },
    inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#1e1e1e',
        marginBottom: 16,
        borderRadius: 8,
    },
});