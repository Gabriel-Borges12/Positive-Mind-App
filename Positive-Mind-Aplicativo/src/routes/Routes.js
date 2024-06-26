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
import RedefinirSenha from '../screens/RedefinirSenha'; //
import AlertCadastro from '../screens/AlertCadastro';

const Stack = createStackNavigator();
const TabBottom = createBottomTabNavigator();

// Navegação para as telas de autenticação (Login e Cadastro)
function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Tutorial" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tutorial"
                component={Tutorial}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
            />
            <Stack.Screen
                name="Home"
                component={TabBottomRoutes}
            />
            <Stack.Screen
                name="AlertCadastro"
                component={AlertCadastro}
            />
             <Stack.Screen
                name="RedefinirSenha"
                component={RedefinirSenha}
            />
        </Stack.Navigator>
    );
}

// Navegação para as telas principais do aplicativo (Home, Motivacao, Index)
function TabBottomRoutes() {
    return (
        <TabBottom.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={TabBottomRoutes} />
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
}
