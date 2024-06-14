// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler';


// import { Ionicons } from "@expo/vector-icons";

// import Login from '../screens/Login';
// import Home from '../screens/Home';
// import Motivacao from '../screens/Motivacao';
// import Index from '../screens/Index';
// import Cadastro from '../screens/Cadastro';

// const TabBottom = createBottomTabNavigator();

// // função macro do Bottom
// export default function TabBottomRoutes() {
//     return (
        
//         <TabBottom.Navigator
//             initialRouteName="Login"
//             screenOptions={{
//                 tabBarActiveTintColor: "#86BAA0",
//                 tabBarInactive: "#86BAA0"
//             }}>
//                  <TabBottom.Screen
//                 name="Login"
//                 component={Login}
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ focused, size, color }) => {
//                         if (focused) {
//                             return (
//                                 <Ionicons
//                                     size={size}
//                                     color={"#86BAA0"}
//                                     name='aperture' />
//                             );
//                         }
//                         return (
//                             <Ionicons
//                                 size={size}
//                                 color={"#86BAA0"}
//                                 name='aperture-outline' />
//                         );
//                     }
//                 }} />
//                 <TabBottom.Screen
//                 name="Cadastro"
//                 component={Cadastro}
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ focused, size, color }) => {
//                         if (focused) {
//                             return (
//                                 <Ionicons
//                                     size={size}
//                                     color={"#86BAA0"}
//                                     name='albums' />
//                             );
//                         }
//                         return (
//                             <Ionicons
//                                 size={size}
//                                 color={"#86BAA0"}
//                                 name='albums-outline' />
//                         );
//                     }
//                 }} />
//                 <TabBottom.Screen
//                 name="Index"
//                 component={Index}
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ focused, size, color }) => {
//                         if (focused) {
//                             return (
//                                 <Ionicons
//                                     size={size}
//                                     color={"#86BAA0"}
//                                     name='albums' />
//                             );
//                         }
//                         return (
//                             <Ionicons
//                                 size={size}
//                                 color={"#86BAA0"}
//                                 name='albums-outline' />
//                         );
//                     }
//                 }} />
//                 <TabBottom.Screen
//                 name="Home"
//                 component={Home}
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ focused, size, color }) => {
//                         if (focused) {
//                             return (
//                                 <Ionicons
//                                     size={size}
//                                     color={"#86BAA0"}
//                                     name='home' />
//                             );
//                         }
//                         return (
//                             <Ionicons
//                                 size={size}
//                                 color={"#86BAA0"}
//                                 name='home-outline' />
//                         );
//                     }
//                 }} />
//                  <TabBottom.Screen
//                 name="Motivacao"
//                 component={Motivacao}
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ focused, size, color }) => {
//                         if (focused) {
//                             return (
//                                 <Ionicons
//                                     size={size}
//                                     color={"#86BAA0"}
//                                     name='bonfire' />
//                             );
//                         }
//                         return (
//                             <Ionicons
//                                 size={size}
//                                 color={"#86BAA0"}
//                                 name='bonfire-outline' />
//                         );
//                     }
//                 }} />
//         </TabBottom.Navigator>
//     );
// }      

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Motivacao from '../screens/Motivacao';
import Index from '../screens/Index';
import Cadastro from '../screens/Cadastro';
import Tutorial from '../screens/Tutorial';

const Stack = createStackNavigator();
const TabBottom = createBottomTabNavigator();

// Navegação para as telas de autenticação (Login e Cadastro)
function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
             <Stack.Screen
                name="Tutorial"
                component={Tutorial}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

// Navegação para as telas principais do aplicativo (Home, Motivacao, Index)
function MainTabs() {
    return (
        <TabBottom.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#86BAA0',
                inactiveTintColor: '#D3D3D3',
            }}
        >
            <TabBottom.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <TabBottom.Screen
                name="Motivacao"
                component={Motivacao}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'bonfire' : 'bonfire-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <TabBottom.Screen
                name="Index"
                component={Index}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'albums' : 'albums-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </TabBottom.Navigator>
    );
}

// Componente principal que decide qual navegação mostrar baseado no estado de autenticação
export default function AppNavigation({ isAuthenticated }) {
    return (
        <Stack.Navigator headerMode="none">
            {isAuthenticated ? (
                <Stack.Screen name="MainTabs" component={MainTabs} />
            ) : (
                <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
}
