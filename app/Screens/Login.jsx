import React, {useEffect, useState} from 'react';
import {View, Image, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import CommandStyles from "../Styles/CommandStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import Async from "../config/Async";
import {Network} from "../config/Network";
import {CustomAlertClose, CustomAlertInternet} from "./Items";

const commandStyle = CommandStyles;

function Login({ navigation }) {
    const [isConnected, setIsConnected] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showVisibility, setShowVisibility] = useState(true);

    const [emailFocus, setEmailFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);

    const [errors, setErrors] = React.useState({});

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const asyncStorage = new Async();

    useEffect(() => {
        const checkConnection = async () => {
            const connected = await Network.isConnected();
            setIsConnected(connected);
        };

        checkConnection().then();
    }, []);

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

    const gerarNumeroAleatorio = () => {
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    }

    const funSubmit = () => {
        if (isConnected) {
            if (veryDados()) {
                const fetchData = async () => {
                    const network = await new Network().login(email, password);
                    if (network.success) {
                        setLoading(true);
                        setTimeout(async () => {
                            if (network.confirm === 0) {
                                Alert.alert(
                                    'Confirmação Necessária ',
                                    'Para continuar, precisamos que você confirme sua conta. Verifique o código que enviamos para o seu e-mail e confirme sua conta.',
                                    [
                                        {text: 'Ir', onPress: () => {
                                                const code = gerarNumeroAleatorio();
                                                new Network().mailer(email, code).then(result => {
                                                    if (result.success) {
                                                        new Async().createToken('login-code', JSON.stringify(code)).then(token => {
                                                            if (token) {
                                                                navigation.navigate('ConfirmCode', {email: email});
                                                            } else {
                                                                Alert.alert('Error, por favor tente novamente.');
                                                            }
                                                        })
                                                    } else {
                                                        navigation.replace('Login');
                                                        Alert.alert('Error, por favor tente novamente.');
                                                    }
                                                });
                                            }},
                                        {text: 'Cancelar', onPress: () => {navigation.replace('Login')}},
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                const asyncResult = await asyncStorage.createToken('login-email', email);
                                if (asyncResult) {
                                    navigation.replace('Home');
                                } else {
                                    setErrors({credentials: 'Ops Algo deu errado, tente novamente!'});
                                }
                            }
                        }, 2000);
                    } else {
                        setErrors({credentials: 'Credenciais incorretas!'});
                    }
                }
                fetchData().then();
            }
        } else {
            setModalVisible(true);
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

            <CustomAlertInternet icon={'wifi-off'} color={'#000000'} title={'Sem Internet'} message={'Por favor, verifique sua conexão e tente novamente!\nSe o erro persistir tente sair e entrar novamente.'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </View>
    );
}

export default Login;
