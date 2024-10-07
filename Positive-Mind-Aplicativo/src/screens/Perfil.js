import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase'; // Certifique-se do caminho correto
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa o ícone

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // Estado para a imagem de perfil
  const [userDocId, setUserDocId] = useState(null); // Guardar o ID do documento do usuário

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
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUser(userData);
            setUserDocId(userDoc.id);

            // Defina a imagem de perfil do Firestore, se houver
            if (userData.profileImage) {
              setProfileImage(userData.profileImage);
            }
          } else {
            console.log('Documento do usuário não encontrado!');
          }
        } else {
          console.log('Nenhum usuário autenticado encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
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

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri); // Atualiza a imagem no estado

      // Faça o upload para o Firebase Storage
      await uploadImageToFirebase(imageUri);
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    try {
      const auth = getAuth(firebaseApp);
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `profileImages/${currentUser.uid}.jpg`);

      // Converte a imagem URI em blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Faz o upload da imagem
      await uploadBytes(storageRef, blob);

      // Obtém a URL de download
      const downloadURL = await getDownloadURL(storageRef);

      // Atualiza a URL da imagem no Firestore
      await updateProfileImageURL(downloadURL);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const updateProfileImageURL = async (url) => {
    try {
      const db = getFirestore(firebaseApp);

      if (!userDocId) {
        console.error('ID do documento do usuário não encontrado!');
        return;
      }

      const userDocRef = doc(db, 'users', userDocId);
      await updateDoc(userDocRef, { profileImage: url });
      setProfileImage(url);

      console.log('URL da imagem de perfil atualizada no Firestore');
    } catch (error) {
      console.error('Erro ao atualizar a URL da imagem:', error);
    }
  };

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
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImagePick} style={styles.imageWrapper}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <View style={styles.iconWrapper}>
              <Icon name="edit" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Nome de Usuário:</Text>
        <Text style={styles.info}>{user.nome || 'Usuário'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>

        <Text style={styles.logout} onPress={handleLogout}>
          Sair
        </Text>
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
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: -60,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#CCCCCC',
    borderWidth: 4,
    borderColor: '#fff',
  },
  placeholderImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#CCCCCC',
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#00796b',
    borderRadius: 50,
    padding: 6,
  },
  body: {
    width: '90%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
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
