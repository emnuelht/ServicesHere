import React from "react";
import {View} from "react-native";
import Async from "./Async";


function Config({ navigation }) {
    new Async().getToken('login-email').then(token => {
        if (token) {
            navigation.replace('Home');
        } else {
            navigation.replace('Login');
        }
    });
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}></View>
    );
}

export default Config;