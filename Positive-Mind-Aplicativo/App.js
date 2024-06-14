import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabBottomRoutes from './src/routes/Routes';
import { isFirestoreConnected } from './firebase'; // Verifique o caminho de importação aqui

const App = () => {
  useEffect(() => {
    const checkFirestoreConnection = async () => {
      try {
        const isConnected = await isFirestoreConnected();
        if (isConnected) {
          console.log('Estamos conectados ao Firestore!');
        } else {
          console.log('Não foi possível conectar ao Firestore.');
        }
      } catch (error) {
        console.error('Erro ao verificar conexão com Firestore:', error);
      }
    };

    checkFirestoreConnection();
  }, []);

  return (
    <NavigationContainer>
      <TabBottomRoutes />
    </NavigationContainer>
  );
};

export default App;
