import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from "@expo/vector-icons";

import Login from '../screens/Login';

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
        </TabBottom.Navigator>
    );
}      