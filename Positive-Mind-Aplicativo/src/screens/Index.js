import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SobreScreen = () => {
    const navigation = useNavigation();
    const [words] = useState(["Inovação", "Saúde", "Amor", "Relaxante"]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} horizontal={false}>
                <View style={styles.innerContainer}>
                    <View style={styles.navbar}>
                        <Image source={require('../assets/logopadrao.png')} style={styles.logo} />
                        <View style={styles.navSpace}>
                            <Text style={styles.navHome}>Quem somos?</Text>
                            <Text style={styles.navHome}>Entrar</Text>
                        </View>
                    </View>

                    <View style={styles.banner}>
                        <Image source={require('../assets/BannerPaginaIndex.png')} style={styles.bannerImage} />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.heading}>Como está sua saúde mental?</Text>
                        <Text style={styles.paragraph}>Já parou para pensar no assunto? Alguma vez refletiu se os seus pensamentos, ideias e sentimentos estão em harmonia? Sabe a diferença entre saúde mental e doença ou transtorno mental?</Text>
                    </View>

                    <View style={styles.infoContent}>
                        <View style={[styles.infoBlock, styles.customBackground]}>
                            <Text style={[styles.infoText, { color: '#ffff' }]}>De acordo com a OMS, cerca de 10% da população mundial sofre com transtornos mentais.</Text>
                        </View>
                        <View style={[styles.infoBlock, styles.customBackground]}>
                            <Text style={[styles.infoText, { color: '#ffff' }]}>Na América Latina, quase 16 milhões de jovens entre 10 e 19 anos têm algum transtorno mental.</Text>
                        </View>
                        <View style={[styles.infoBlock, styles.customBackground]}>
                            <Text style={[styles.infoText, { color: '#ffff' }]}>Estresse, genética e nutrição são fatores que contribuem para transtornos mentais.</Text>
                        </View>
                        <Image source={require('../assets/mocaPensante.png')} style={styles.infoImage} />
                    </View>



                    <View style={styles.resources}>
                        <Text style={styles.resourcesText}>O desequilíbrio emocional facilita o surgimento de doenças mentais.</Text>
                        <View style={styles.resourcesBox}>
                            <Text style={styles.resourcesBoxText}>Com o nosso site, você consegue explorar nossa variedade de recursos, incluindo dicas práticas para o dia a dia e ferramentas interativas.</Text>
                            <Text style={styles.resourcesBoxText}>Você está pronto para fazer isso?</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>Positive Mind é</Text>
                            <View style={styles.scrollWrapper}>
                                <Text style={styles.scrollText}>{words[currentWordIndex]}</Text>
                            </View>
                            <Text style={styles.cardNote}>
                                Estamos aqui para te ajudar!{" "}
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.cardLink}>Entrar.</Text>
                                </TouchableOpacity>{"\n\n"}
                                Está pronto?{"\n"}
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.cardLink}>Conheça nosso projeto!</Text>
                                </TouchableOpacity>
                            </Text>

                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    {/* Seu código do footer aqui */}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    customBackground: {
        backgroundColor: '#86BAA0', // cor de fundo personalizada
    },
    innerContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#86BAA0',
    },
    logo: {
        width: 120,
        height: 40,
    },
    navSpace: {
        flexDirection: 'row',
    },
    navHome: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    banner: {
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 180,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#184b30',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 20,
    },
    info: {
        backgroundColor: '#1C5739',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    infoHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    infoContent: {
        alignItems: 'center',
    },
    infoBlock: {
        flex: 1,
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#86BAA0', // cor de fundo padrão
        borderRadius: 8,
    },
    infoText: {
        color: '#ffff', // Nova cor
        marginBottom: 10,
        lineHeight: 24,
    },
    infoImage: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
    },
    resources: {
        backgroundColor: '#184b30',
        padding: 20,
    },
    resourcesText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    resourcesBox: {
        backgroundColor: '#1C5739',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    resourcesBoxText: {
        color: '#fff',
        marginBottom: 10,
        lineHeight: 24,
    },
    card: {
        backgroundColor: '#F8F8F8',
        padding: 20,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#184b30',
    },
    scrollWrapper: {
        marginTop: 10,
        alignItems: 'center',
    },
    scrollText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#86BAA0',
    },
    cardNote: {
        marginTop: 10,
        color: '#555',
        lineHeight: 24,
    },
    cardLink: {
        color: '#86BAA0',
        textDecorationLine: 'underline',
    },
    // footer: {
    //     height: 100,
    //     backgroundColor: '#86BAA0',
    // },
});

export default SobreScreen;