import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase';
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controle da edição
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const currentUser = auth.currentUser;

        if (currentUser) {
          const db = getFirestore(firebaseApp);
          const email = currentUser.email;
          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('email', '==', email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUser(userData);
            setUserDocId(userDoc.id);

            if (userData.profileImage) {
              setProfileImage(userData.profileImage);
            }
            setUserName(userData.nome || '');
            setUserEmail(userData.email || '');
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
      setProfileImage(imageUri);

      await uploadImageToFirebase(imageUri);
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    try {
      const auth = getAuth(firebaseApp);
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('Usuário não autenticado');
        return;
      }

      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `profileImages/${currentUser.uid}.jpg`);

      // Baixar a imagem da URI e converter para Blob
      const response = await fetch(imageUri);
      if (!response.ok) {
        console.error('Erro ao baixar a imagem para upload');
        return;
      }
      const blob = await response.blob();

      // Fazer upload da imagem para o Firebase Storage
      await uploadBytes(storageRef, blob);
      console.log('Upload da imagem realizado com sucesso');

      // Obter a URL da imagem carregada
      const downloadURL = await getDownloadURL(storageRef);
      console.log('URL da imagem:', downloadURL);

      // Atualizar a URL da imagem no Firestore
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

  // Verificar se o nome já existe no Firestore
  const checkIfUsernameExists = async (newUserName) => {
    const db = getFirestore(firebaseApp);
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('nome', '==', newUserName));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Retorna true se houver um usuário com o mesmo nome
  };

  const handleSaveChanges = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      const currentUser = auth.currentUser;

      if (!userDocId) {
        console.error('ID do documento do usuário não encontrado!');
        return;
      }

      // Verifica se o novo nome de usuário já existe
      if (userName !== user.nome) {
        const usernameExists = await checkIfUsernameExists(userName);
        if (usernameExists) {
          Alert.alert('Erro', 'Nome de usuário já existe. Por favor, escolha outro.');
          return;
        }
      }

      const userDocRef = doc(db, 'users', userDocId);

      await updateDoc(userDocRef, {
        nome: userName,
        email: userEmail,
      });

      // Atualiza o email no Firebase Authentication
      if (currentUser.email !== userEmail) {
        await currentUser.updateEmail(userEmail);
      }

      setIsEditing(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
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
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
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
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
          />
        ) : (
          <Text style={styles.info}>{userName}</Text>
        )}

        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userEmail}
            onChangeText={setUserEmail}
          />
        ) : (
          <Text style={styles.info}>{userEmail}</Text>
        )}

        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 220,
    backgroundColor: '#25724D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: -50,
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
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
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
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
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
  input: {
    fontSize: 18,
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  editButton: {
    backgroundColor: '#25724D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#25724D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#25724D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
