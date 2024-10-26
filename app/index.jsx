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
import CommandStyles from "./Styles/CommandStyles";
import Config from "./config/Config";
import Async from "./config/Async";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const commandStyle = CommandStyles;

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Config">
            <Stack.Screen name="Config" component={Config} />
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
            <View style={commandStyle.drawerHeader}>
                <Icon style={commandStyle.drawerHeaderIcon} name="person" size={30} color="#fff" />
                <Text style={commandStyle.drawerHeaderText}>Usuário</Text>
            </View>
            <DrawerItem
                label={() => <Text>Perfil</Text>}
                icon={() => <Icon name={'person'} size={20} />}
                onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
                label={() => <Text>Home</Text>}
                icon={() => <Icon name={'home'} size={20} />}
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
                label={() => <Text>Serviços</Text>}
                icon={() => <Icon name={'work'} size={20} />}
                onPress={() => props.navigation.navigate('Services')}
            />
            <DrawerItem
                label={() => <Text>Profissionais</Text>}
                icon={() => <Icon name={'group'} size={20} />}
                onPress={() => props.navigation.navigate('Professionals')}
            />
            <DrawerItem
                label={() => <Text>Suporte</Text>}
                icon={() => <Icon name={'support-agent'} size={20} />}
                onPress={() => props.navigation.navigate('Support')}
            />
            <DrawerItem
                label={() => <Text>Sair da conta</Text>}
                icon={() => <Icon name={'logout'} size={20} />}
                onPress={() => {
                    new Async().removeToken('login-email').then((token) => {
                        if (token) {
                            props.navigation.navigate('Config');
                        }
                    });
                }}
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