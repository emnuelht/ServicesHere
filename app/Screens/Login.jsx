import React, { useState } from 'react';
import {View, Image, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import CommandStyles from "../Styles/CommandStyles";
import Icon from "react-native-vector-icons/MaterialIcons";

const commandStyle = CommandStyles;

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showVisibility, setShowVisibility] = useState(true);

    const [emailFocus, setEmailFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);

    const [errors, setErrors] = React.useState({});

    const [loading, setLoading] = useState(false);

    const veryDados = () => {
        let erros = {};
        let returns = true;
        if (email.trim() === '') {
            erros.email = 'Campo Obrigatório!';
            returns = false;
        }
        if (password.trim() === '') {
            erros.password = 'Campo Obrigatório!';
            returns = false;
        }

        setErrors(erros);
        return returns
    }

    const funSubmit = () => {
        if (veryDados()) {
            if (email === 'emanuel' && password === '123') {
                setLoading(true);

                setTimeout(() => {
                    navigation.replace('Home');
                }, 3000);
            } else {
                setErrors({credentials: 'Credenciais incorretas!'})
            }
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

            <View style={commandStyle.container_logo}>
                <Image source={require("../../assets/images/logo_app.png")} style={commandStyle.logo_app} />
                <Text style={{ fontWeight: 'bold' }}>Services<Text style={{ color: '#00a3ff' }}>Here</Text></Text>
            </View>

            <Text style={commandStyle.text_title_login}>Bem-Vindo de volta!</Text>

            <View style={commandStyle.container_inputs}>

                <View>
                    <Text>Email</Text>
                    <View style={[commandStyle.container_inputs__inputView, emailFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                        <Icon style={[commandStyle.container_inputs__inputView__icon, emailFocus && commandStyle.container_inputs__inputView__icon__focus]} name={'email'} size={30} />
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="usuario@gmail.com"
                            value={email}
                            cursorColor={'#000'}
                            onFocus={() => {setEmailFocus(true)}}
                            onBlur={() => {setEmailFocus(false)}}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>
                    {errors.email && <Text style={commandStyle.errorText}>{errors.email}</Text>}
                </View>

                <View>
                    <Text>Senha</Text>
                    <View style={[commandStyle.container_inputs__inputView, passwordFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                        <Icon style={[commandStyle.container_inputs__inputView__icon, passwordFocus && commandStyle.container_inputs__inputView__icon__focus]} name={'password'} size={30} />
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="******"
                            value={password}
                            cursorColor={'#000'}
                            onFocus={() => {setPasswordFocus(true)}}
                            onBlur={() => {setPasswordFocus(false)}}
                            onChangeText={setPassword}
                            secureTextEntry={showVisibility}
                        />
                        <TouchableOpacity onPress={() => setShowVisibility(!showVisibility)}>
                            <Icon style={[commandStyle.container_inputs__inputView__icon, passwordFocus && commandStyle.container_inputs__inputView__icon__focus]}
                                  name={showVisibility ? 'visibility' : 'visibility-off'}
                                  size={30} />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={commandStyle.errorText}>{errors.password}</Text>}
                    {errors.credentials && <Text style={commandStyle.errorText}>{errors.credentials}</Text>}
                </View>

                <TouchableOpacity style={commandStyle.button} onPress={funSubmit}>
                    <Text style={commandStyle.buttonText}>ENTRAR</Text>
                </TouchableOpacity>
            </View>

            <View style={commandStyle.container_ou}>
                <View style={commandStyle.barra}></View>
                <Text>Ou</Text>
                <View style={commandStyle.barra}></View>
            </View>

            <View style={commandStyle.text_cadastro_login}>
                <Text>Ainda não tem uma conta?</Text>
                <TouchableOpacity style={{paddingHorizontal: 5, paddingVertical: 10}} onPress={() => navigation.navigate('Cadastro')}><Text style={commandStyle.text_cadastro_login_button_text}>Cadastre-se aqui</Text></TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;
