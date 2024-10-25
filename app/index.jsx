import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {StatusBar, View, Text} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Login from "./Screens/Login";
import Cadastro from "./Screens/Cadastro";
import Termos from "./Screens/Termos";
import ConfirmCode from "./Screens/ConfirmCode";
import Home from "./Screens/Home";
import Services from "./Screens/ScreensDrawer/Services";
import Professional from "./Screens/ScreensDrawer/Professional";
import ViewServices from "./Screens/ScreensDrawer/ViewServices";
import FormServices from "./Screens/ScreensDrawer/FormServices";
import MyServices from "./Screens/ScreensDrawer/MyServices";
import ViewProfessionals from "./Screens/ScreensDrawer/ViewProfessionals";
import FormProfessionals from "./Screens/ScreensDrawer/FormProfessionals";
import Support from "./Screens/ScreensDrawer/Support";
import Profile from "./Screens/ScreensDrawer/Profile";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Termos" component={Termos} />
            <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="ViewServices" component={ViewServices} />
            <Stack.Screen name="FormServices" component={FormServices} />
            <Stack.Screen name="MyServices" component={MyServices} />
            <Stack.Screen name="Professionals" component={Professional} />
            <Stack.Screen name="ViewProfessionals" component={ViewProfessionals} />
            <Stack.Screen name="FormProfessionals" component={FormProfessionals} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView>
            <View>
                <Icon name="person" size={30} color="#fff" />
                <Text>Usuário</Text>
            </View>
            <DrawerItem
                label={() => <Text>Home</Text>}
                icon={() => <Icon name={'home'} size={20} />}
                onPress={() => props.navigation.navigate('HomeScreen')}
            />
        </DrawerContentScrollView>
    );
};

function App() {
    return (
        <NavigationContainer independent={true}>
            <StatusBar backgroundColor={'#000'} barStyle="light-content" />
            <Drawer.Navigator initialRouteName={"Index"} screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name={"Index"} component={StackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;