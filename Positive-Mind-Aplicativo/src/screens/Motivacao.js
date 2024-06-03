import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Motivacao({ navigation }) {
    const frases = [
        "Acredite em si mesmo e tudo será possível.",
        "O sucesso nasce do querer, da determinação e persistência.",
        "Se você traçar metas absurdamente altas e falhar, seu fracasso será muito melhor que o sucesso de todos.",
        "Não tenha medo da mudança. Coisas boas se vão para que melhores possam vir.",
        "A persistência é o caminho do êxito.",
        "Só existe um êxito: a capacidade de viver a vida do seu jeito."
    ];

    const exibirFraseAleatoria = () => {
        const randomIndex = Math.floor(Math.random() * frases.length);
        const frase = frases[randomIndex];
        return frase;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <View style={styles.containerFrases}>
                        <Text style={styles.fraseDoDia}>"{exibirFraseAleatoria()}"</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botao}>
                        <Text style={styles.textoBotao}>Voltar para a Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
           
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },
    header: {
        maxWidth: '100%',
        backgroundColor: '#86BAA0',
    },
    titulo: {
        fontFamily: 'Josefin Sans',
        fontSize: 24,
        color: '#333',
        marginLeft: 20,
        marginTop: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#86BAA0',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    fraseDoDia: {
        fontFamily: 'Josefin Sans',
        fontSize: 20,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    containerFrases: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    botao: {
        backgroundColor: '#FFF',
        borderColor: '#86BAA0',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    textoBotao: {
        color: '#86BAA0',
        fontFamily: 'Josefin Sans',
        fontSize: 16,
    },
    footer: {
        width: '100%',
        backgroundColor: '#86BAA0',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerContent: {
        flex: 1,
    },
    textoFooter: {
        color: '#FFF',
        fontFamily: 'Josefin Sans',
        fontSize: 12,
        marginBottom: 10,
    },
    textoFooterLink: {
        color: '#FFF',
        fontFamily: 'Josefin Sans',
        fontSize: 12,
        marginBottom: 5,
        textDecorationLine: 'underline',
    },
});
