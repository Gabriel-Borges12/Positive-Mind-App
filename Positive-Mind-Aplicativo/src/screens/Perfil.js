import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../../firebase'; // Certifique-se do caminho correto

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const currentUser = auth.currentUser;

        if (currentUser) {
          const db = getFirestore(firebaseApp);
          const email = currentUser.email;

          // Cria uma query para buscar o documento do usuário pelo email
          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('email', '==', email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Obtém o primeiro documento encontrado (se houver)
            const userData = querySnapshot.docs[0].data();
            setUser(userData);
          } else {
            console.log('Documento do usuário não encontrado!');
          }
        } else {
          console.log('Nenhum usuário autenticado encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer
      }>
      <Text>Carregando...</Text>
    </View>
  );
}

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Image
        source={require('../assets/productoOwnerBorges.jpeg')} // Substitua pela imagem de perfil ou ícone padrão
        style={styles.profileImage}
      />
    </View>
    <View style={styles.body}>
      <Text style={styles.label}>Nome de Usuário:</Text>
      <Text style={styles.info}>{user.nome || 'Usuário'}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{user.email}</Text>

      <Text style={styles.logout} onPress={handleLogout}>Sair</Text>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
},
header: {
  width: '100%',
  backgroundColor: '#25724D',
  padding: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
profileImage: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: '#CCCCCC',
},
body: {
  width: '90%',
  padding: 20,
  backgroundColor: '#FFFFFF',
  marginTop: -60,
  borderRadius: 10,
  alignItems: 'flex-start',
},
label: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333333',
},
info: {
  fontSize: 18,
  color: '#666666',
  marginBottom: 20,
},
logout: {
  fontSize: 16,
  color: '#00796b',
  marginTop: 20,
  textDecorationLine: 'underline',
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});

export default ProfileScreen;
