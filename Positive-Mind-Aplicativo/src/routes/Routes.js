import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';


import { Ionicons } from "@expo/vector-icons";

import Login from '../screens/Login';
import Home from '../screens/Home';
import Motivacao from '../screens/Motivacao';
import Index from '../screens/Index';

const TabBottom = createBottomTabNavigator();

// função macro do Bottom
export default function TabBottomRoutes() {
    return (
        <TabBottom.Navigator
            initialRouteName="Login"
            screenOptions={{
                tabBarActiveTintColor: "#86BAA0",
                tabBarInactive: "#86BAA0"
            }}>
                 <TabBottom.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    size={size}
                                    color={"#86BAA0"}
                                    name='aperture' />
                            );
                        }
                        return (
                            <Ionicons
                                size={size}
                                color={"#86BAA0"}
                                name='aperture-outline' />
                        );
                    }
                }} />
                <TabBottom.Screen
                name="Index"
                component={Index}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    size={size}
                                    color={"#86BAA0"}
                                    name='albums' />
                            );
                        }
                        return (
                            <Ionicons
                                size={size}
                                color={"#86BAA0"}
                                name='albums-outline' />
                        );
                    }
                }} />
                <TabBottom.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    size={size}
                                    color={"#86BAA0"}
                                    name='home' />
                            );
                        }
                        return (
                            <Ionicons
                                size={size}
                                color={"#86BAA0"}
                                name='home-outline' />
                        );
                    }
                }} />
                 <TabBottom.Screen
                name="Motivacao"
                component={Motivacao}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    size={size}
                                    color={"#86BAA0"}
                                    name='bonfire' />
                            );
                        }
                        return (
                            <Ionicons
                                size={size}
                                color={"#86BAA0"}
                                name='bonfire-outline' />
                        );
                    }
                }} />
        </TabBottom.Navigator>
    );
}      