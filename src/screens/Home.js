// Importación de bibliotecas y componentes necesarios
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { database, auth } from '../config/firebase'; // Importa la configuración de la base de datos y autenticación de Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import CardProductos from '../components/CardProductos'; // Importa el componente de tarjeta de producto

// Definición del componente principal Home
const Home = ({ navigation }) => {
    // Definición del estado local para almacenar los productos
    const [productos, setProductos] = useState([]);

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        // Define una consulta a la colección 'productos' en Firestore, ordenada por el campo 'creado' en orden descendente
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
        
        // Escucha cambios en la consulta de Firestore en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                // Empuja cada documento con su ID a la lista de docs
                docs.push({ id: doc.id, ...doc.data() });
            });
            // Actualiza el estado de productos con los datos recibidos
            setProductos(docs);
        });

        // Limpieza de la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    // Función para navegar a la pantalla 'Add'
    const goToAdd = () => { 
        navigation.navigate('Add');
    }

    const goToLogin = () => { 
        navigation.navigate('Login');
    }

    // Función que renderiza cada item de la lista
    const renderItem = ({ item }) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            vendido={item.vendido}
        />
    );

    // Renderiza la interfaz del componente Home
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Dashboard, sesión: {auth.currentUser?.email || 'Sin sesión'}
            </Text>


            {/* Botón para navegar a la pantalla de agregar productos */}
            <TouchableOpacity
                style={styles.Button}
                onPress={goToAdd}>
                <Text style={styles.ButtonText}>Agregar usuarios</Text>
            </TouchableOpacity>

        </View>
    );
};


// Exporta el componente Home como predeterminado
export default Home;

// Estilos para el componente Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#ffffff',
    },
    Subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color:'#81c784'
    },
    Button: {
        backgroundColor: '#1b5e20',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 20,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
    },
});
