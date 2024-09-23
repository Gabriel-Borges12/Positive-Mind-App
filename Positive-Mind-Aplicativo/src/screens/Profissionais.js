import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../../firebase'; // Certifique-se de que o Firebase está configurado corretamente

const professionalsData = [
    { 
        id: '1', 
        name: 'Gabriel Borges', 
        rating: 5, 
        city: 'São Paulo', 
        image: 'https://via.placeholder.com/100', // substitua com a imagem correta
        phone: '(11) 98765-4321',
        age: 34,
        address: 'Av. Paulista, 1000',
        workingHours: 'Seg - Sex: 9h - 18h'
    },
    { 
        id: '2', 
        name: 'Mariane Letícia', 
        rating: 4.5, 
        city: 'Rio de Janeiro', 
        image: 'https://via.placeholder.com/100', // substitua com a imagem correta
        phone: '(21) 91234-5678',
        age: 29,
        address: 'Rua da Glória, 500',
        workingHours: 'Seg - Sáb: 10h - 17h'
    },
    { 
        id: '3', 
        name: 'Leonardo Lopes', 
        rating: 5, 
        city: 'Belo Horizonte', 
        image: 'https://via.placeholder.com/100', // substitua com a imagem correta
        phone: '(31) 92345-6789',
        age: 40,
        address: 'Av. Afonso Pena, 1200',
        workingHours: 'Seg - Qui: 8h - 16h'
    },
    { 
        id: '4', 
        name: 'Luis Augusto', 
        rating: 4.5, 
        city: 'Curitiba', 
        image: 'https://via.placeholder.com/100', // substitua com a imagem correta
        phone: '(41) 99876-5432',
        age: 37,
        address: 'Rua XV de Novembro, 800',
        workingHours: 'Seg - Sex: 9h - 19h'
    },
];

const App = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredProfessionals, setFilteredProfessionals] = useState(professionalsData);
    const [loading, setLoading] = useState(false);
    const [animation] = useState(new Animated.Value(1)); // Para o efeito de piscamento
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [userRating, setUserRating] = useState({});

    // Função para salvar a avaliação no Firestore
    const saveRating = async (userId, professionalId, rating) => {
        try {
            await firestore.collection('ratings').add({
                userId: userId, // Substitua pelo ID do usuário logado
                professionalId: professionalId,
                rating: rating,
                timestamp: new Date() // Adiciona o timestamp atual
            });
            console.log('Avaliação salva com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar a avaliação: ', error);
        }
    };

    // Efeito de piscar a barra de pesquisa
    useEffect(() => {
        const blink = () => {
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start(() => blink());
        };

        blink();
    }, []);

    const handleSearch = () => {
        setLoading(true);
        const filtered = professionalsData.filter(pro =>
            pro.name.toLowerCase().includes(searchText.toLowerCase()) ||
            pro.city.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProfessionals(filtered);
        setLoading(false);
    };

    const handleProfileView = (professional) => {
        setSelectedProfessional(professional);
        setModalVisible(true);
    };

    const handleRating = (professionalId, rating) => {
        const userId = 'uid123'; // Substitua pelo ID do usuário logado (use autenticação)
        setUserRating(prevRatings => ({
            ...prevRatings,
            [professionalId]: rating
        }));
        saveRating(userId, professionalId, rating); // Salva a avaliação no Firestore
        setModalVisible(false); // Fechar modal após avaliação
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.profilePic}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.starsContainer}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <Ionicons
                            key={i}
                            name="star"
                            size={20}
                            color={i < (userRating[item.id] || 0) ? '#FDD835' : '#C5C5C5'}
                        />
                    ))}
                </View>
                <TouchableOpacity 
                    style={styles.profileButton} 
                    onPress={() => handleProfileView(item)}
                >
                    <Text style={styles.profileButtonText}>Ver perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Encontre os melhores psicólogos da região</Text>
            <Animated.View style={[styles.searchContainer, { opacity: animation }]}>
                <TextInput
                    placeholder="Onde você está?"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search-outline" size={24} color="black" />
                </TouchableOpacity>
            </Animated.View>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            <FlatList
                data={filteredProfessionals}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            {/* Modal para exibir detalhes do psicólogo */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedProfessional && (
                            <>
                                <Text style={styles.modalTitle}>{selectedProfessional.name}</Text>
                                <Image 
                                    source={{ uri: selectedProfessional.image }} 
                                    style={styles.modalImage} 
                                />
                                <Text style={styles.modalText}>Telefone: {selectedProfessional.phone}</Text>
                                <Text style={styles.modalText}>Idade: {selectedProfessional.age} anos</Text>
                                <Text style={styles.modalText}>Endereço: {selectedProfessional.address}</Text>
                                <Text style={styles.modalText}>Horário de serviço: {selectedProfessional.workingHours}</Text>
                                
                                <Text style={styles.modalText}>Avalie este profissional:</Text>
                                <View style={styles.starsContainer}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => handleRating(selectedProfessional.id, i + 1)}
                                        >
                                            <Ionicons
                                                name="star"
                                                size={30}
                                                color={i < (userRating[selectedProfessional.id] || 0) ? '#FDD835' : '#C5C5C5'}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity 
                                    style={styles.closeButton} 
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    profilePic: {
        marginRight: 16,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    cardContent: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    profileButton: {
        marginTop: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    profileButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 6,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#FF5A5F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    closeButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default App;
