import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase'; // Certifique-se do caminho correto

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          console.log('Usuário não encontrado!');
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
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
        <Text style={styles.info}>{user.nome}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
