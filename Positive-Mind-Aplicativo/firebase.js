// firebase.js
import firestore from '@react-native-firebase/firestore';

export const firebaseFirestore = firestore();

// Verificar se está conectado
export const isFirestoreConnected = async () => {
  try {
    await firebaseFirestore.settings({ timestampsInSnapshots: true });
    console.log('Firestore está conectado!');
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao Firestore:', error);
    return false;
  }
};
