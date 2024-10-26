import React, {useState} from 'react';
import {ActivityIndicator, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommandStyles from "../Styles/CommandStyles";
import Async from "../config/Async";

const commandStyle = CommandStyles;

export default function ConfirmCode({ navigation }) {
    const [inputCode, setInputCode] = useState('');
    const [inputCodeFocus, setInputCodeFocus] = useState(false);
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const funSubmit = () => {
        setErrors('');
        if (inputCode.trim().length === 0) {
            setErrors('Campo Obrigatório!');
        } else {
            new Async().getToken('login-code').then(result => {
                if (result === inputCode) {
                    setLoading(true);

                    setTimeout(() => {
                        navigation.replace('Home');
                    }, 3000);
                } else {
                    setErrors('Código incorreto!');
                }
            });
        }
    }

    if (loading) {
        return (
            <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar backgroundColor={'#000'} barStyle="light-content" />
                <ActivityIndicator size="large" color="#00a3ff" />
            </View>
        );
    }

    return (
        <View style={[commandStyle.container_login, {paddingTop: 100}]}>
            <StatusBar backgroundColor={'#000'} barStyle="light-content" />

            <Icon style={{textAlign: 'center', opacity: .7}} name={'email'} size={40} color={'#000'} />

            <Text style={{fontSize: 23, textAlign: 'center', marginTop: 10, fontWeight: 'bold',}}>Enviamos um código para você!</Text>
            <Text style={{fontSize: 17, textAlign: 'center',}}>Por favor, verifique sua caixa de email, caso não encontre, procure na caixa de span. </Text>

            <View style={commandStyle.container_inputs}>

                <View>
                    <Text>Código</Text>
                    <View style={[commandStyle.container_inputs__inputView, inputCodeFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="123456"
                            value={inputCode}
                            keyboardType={'numeric'}
                            cursorColor={'#000'}
                            onFocus={() => {setInputCodeFocus(true)}}
                            onBlur={() => {setInputCodeFocus(false)}}
                            onChangeText={setInputCode}
                            autoCapitalize="none"
                        />
                    </View>
                    {errors && <Text style={commandStyle.errorText}>{errors}</Text>}
                </View>

                <TouchableOpacity style={commandStyle.button} onPress={funSubmit}>
                    <Text style={commandStyle.buttonText}>VERIFICAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}