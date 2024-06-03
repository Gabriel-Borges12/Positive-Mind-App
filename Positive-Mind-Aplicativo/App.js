// App.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabBottomRoutes from './src/routes/Routes';
import { isFirestoreConnected } from './firebase';

const App = () => {
  useEffect(() => {
    const checkFirestoreConnection = async () => {
      const isConnected = await isFirestoreConnected();
      if (isConnected) {
        console.log('Estamos conectados ao Firestore!');
      } else {
        console.log('Não foi possível conectar ao Firestore.');
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


// import 'react-native-gesture-handler';


// import { NavigationContainer } from '@react-navigation/native';
// import TabBottomRoutes from './src/routes/Routes';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <TabBottomRoutes />
//     </NavigationContainer>
//   );
// }

// // firebase.js
// import firestore from '@react-native-firebase/firestore';

// // export default firestore();

// // App.js
// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import firestore from './firebase';

// const App = () => {
//   useEffect(() => {
//     // Adicionar um documento
//     const addUser = async () => {
//       try {
//         await firestore.collection('users').add({
//           first: 'Ada',
//           last: 'Lovelace',
//           born: 1815,
//         });
//         console.log('Document successfully written!');
//       } catch (error) {
//         console.error('Error writing document: ', error);
//       }
//     };

//     addUser();
//   }, []);

//   return (
//     <View>
//       <Text>Firestore</Text>
//     </View>
//   );
// };


