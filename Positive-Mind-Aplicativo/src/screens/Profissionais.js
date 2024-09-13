import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const professionalsData = [
    { id: '1', name: 'Gabriel Borges', rating: 5, city: 'São Paulo' },
    { id: '2', name: 'Mariane Letícia', rating: 4.5, city: 'Rio de Janeiro' },
    { id: '3', name: 'Leonardo Lopes', rating: 5, city: 'Belo Horizonte' },
    { id: '4', name: 'Luis Augusto', rating: 4.5, city: 'Curitiba' },
];

const App = () => {
    const [city, setCity] = useState('');
    const [filteredProfessionals, setFilteredProfessionals] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCitySearch = async (text) => {
        setCity(text);
        if (text.length > 2) {
            setLoading(true);
            try {
                const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
                    params: { namePrefix: text },
                    headers: {
                        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                });
                setCities(response.data.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        } else {
            setCities([]);
        }
    };

    const handleCitySelect = (selectedCity) => {
        setCity(selectedCity);
        const filtered = professionalsData.filter(pro => pro.city.toLowerCase() === selectedCity.toLowerCase());
        setFilteredProfessionals(filtered);
        setCities([]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.profilePic} />
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.starsContainer}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <Ionicons
                            key={i}
                            name="star"
                            size={20}
                            color={i < item.rating ? '#FDD835' : '#C5C5C5'}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Text style={styles.profileButtonText}>Ver perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Encontre os melhores psicólogos da região</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Onde você está?"
                    style={styles.searchInput}
                    value={city}
                    onChangeText={handleCitySearch}
                />
                <Ionicons name="location-outline" size={24} color="black" />
            </View>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            <FlatList
                data={cities}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCitySelect(item.city)}>
                        <Text style={styles.cityItem}>{item.city}, {item.country}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                style={styles.cityList}
            />
            <FlatList
                data={filteredProfessionals}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7EF',
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#C5C5C5',
        marginRight: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    starsContainer: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    profileButton: {
        backgroundColor: '#A5D6A7',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginTop: 4,
    },
    profileButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    cityItem: {
        padding: 10,
        fontSize: 16,
    },
    cityList: {
        maxHeight: 150,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: '#F0F0F0',
    },
});

export default App;
