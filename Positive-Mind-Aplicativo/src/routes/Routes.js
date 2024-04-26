import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from "@expo/vector-icons";

import Login from '../screens/Login';
import Login from '../screens/Home';

const TabBottom = createBottomTabNavigator();

// função macro do Bottom
function TabBottomRoutes() {
    return (
        <TabBottom.Navigator
            initialRouteName="Login"
            screenOptions={{
                tabBarActiveTintColor: "#86BAA0",
                tabBarInactive: "#86BAA0"
            }}>
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
        </TabBottom.Navigator>
    );
}      