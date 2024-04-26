import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import TabBottomRoutes from './src/routes/Routes';

export default function App() {
  return (
    <NavigationContainer>
      <TabBottomRoutes />
    </NavigationContainer>
  );
}