import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ActivityIndicator, Alert
} from "react-native";
import CommandStyles from "../Styles/CommandStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Checkbox} from "react-native-paper";
import {Network} from "../config/Network";
import Async from "../config/Async";
import {CustomAlertInternet} from "./Items";

const commandStyle = CommandStyles;

function Cadastro({ navigation }) {
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nomeFocus, setNomeFocus] = React.useState(false);
    const [telefoneFocus, setTelefoneFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);

    const [showVisibility, setShowVisibility] = useState(true);
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const formatPhone = (text) => {
        let cleaned = ('' + text).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return text;
    };

    const checkConnection = async () => {
        return await Network.isConnected();
    };

    const emailExists = async () => {
        const network = await new Network().dataUsuario(email);
        if (network.success) {
            if (network.data !== '') {
                return true;
            }
        } else {
            Alert.alert('Ops algo deu errado! Por favor tente novamente.',
                '',
                [
                    {
                        text: 'Tentar novamente',
                        onPress: () => {navigation.replace('Cadastro');},
                    }
                ],
                {cancelable: false},);
        }
        return false;
    }

    const loadData = () => {
        setLoading(true);

        setTimeout(async () => {
            const network = await new Network().cadastro(nome, telefone, email, password);
            if (network.success) {
                const async = await new Async().createToken('login-code', JSON.stringify(network.code));
                if (async) {
                    navigation.navigate('ConfirmCode', {email: email});
                } else {
                    setLoading(false);
                    Alert.alert('OPS, Algo deu errado, por favor tente novamente\nSe caso esse error permanecer, entre em contato com o suporte.');
                }
            } else {
                setLoading(false);
                Alert.alert('OPS, Algo deu errado, por favor tente novamente\nSe caso esse error permanecer, entre em contato com o suporte.');
            }
        }, 1000);
    };

    const veryDados = async () => {
        let newErrors = {};
        let returns = true;

        if (!checked) {
            newErrors.checkBox = 'Campo Obrigatório!';
            returns = false;
        }
        if (nome.trim() === '') {
            newErrors.nome = 'Nome é obrigatório';
            returns = false;
        }
        if (telefone.trim() === '') {
            newErrors.telefone = 'Telefone é obrigatório';
            returns = false;
        }
        if (email.trim() === '') {
            newErrors.email = 'Email é obrigatório';
            returns = false;
        }
        const result = await emailExists();
        if (result) {
            newErrors.email = 'Esse email já existe!';
            returns = false;
        }
        if (password.trim() === '') {
            newErrors.password = 'Senha é obrigatória';
            returns = false;
        }
        if (confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
            returns = false;
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
            returns = false;
        }

        setErrors(newErrors);
        return returns;
    }

    const funSubmit = () => {
        checkConnection().then((result) => {
            if (result) {
                veryDados().then(result => {
                    if (result) {
                        loadData();
                    }
                });
            } else {
                setModalVisible(true);
            }
        })
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
        <SafeAreaView>
            <ScrollView style={[commandStyle.container_login, { paddingTop: 15 }]}>
                <StatusBar backgroundColor={'#000'} barStyle="light-content" />
                <View style={commandStyle.container_logo}>
                    <Image source={require("../../assets/images/logo_app.png")} style={{width: 50, height: 50}} />
                    <Text style={{ fontWeight: 'bold' }}>Services<Text style={{ color: '#00a3ff' }}>Here</Text></Text>
                </View>

                <Text style={commandStyle.text_title_login}>Cadastre-se</Text>

                <View style={commandStyle.container_inputs}>
                    <View>
                        <Text>Nome e Sobrenome <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                        <View style={[commandStyle.container_inputs__inputView, nomeFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                            <Icon style={[commandStyle.container_inputs__inputView__icon, nomeFocus && commandStyle.container_inputs__inputView__icon__focus]} name={'person'} size={30} />
                            <TextInput
                                style={commandStyle.container_inputs__inputView__inputText}
                                placeholder="Digite seu nome aqui..."
                                value={nome}
                                cursorColor={'#000'}
                                onFocus={() => setNomeFocus(true)}
                                onBlur={() => setNomeFocus(false)}
                                onChangeText={(val) => setNome(val)}
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.nome && <Text style={commandStyle.errorText}>{errors.nome}</Text>}
                    </View>

                    <View>
                        <Text>Telefone <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                        <View style={[commandStyle.container_inputs__inputView, telefoneFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                            <Icon style={[commandStyle.container_inputs__inputView__icon, telefoneFocus && commandStyle.container_inputs__inputView__icon__focus]} name={'phone'} size={30} />
                            <TextInput
                                style={commandStyle.container_inputs__inputView__inputText}
                                placeholder="(98) 98765-4321"
                                value={telefone}
                                keyboardType={'numeric'}
                                maxLength={15}
                                cursorColor={'#000'}
                                onFocus={() => setTelefoneFocus(true)}
                                onBlur={() => {setTelefoneFocus(false)}}
                                onChangeText={(val) => setTelefone(formatPhone(val))}
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.telefone && <Text style={commandStyle.errorText}>{errors.telefone}</Text>}
                    </View>

                    <View>
                        <Text>Email <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                        <View style={[commandStyle.container_inputs__inputView, emailFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                            <Icon style={[commandStyle.container_inputs__inputView__icon, emailFocus && commandStyle.container_inputs__inputView__icon__focus]} name={'email'} size={30} />
                            <TextInput
                                style={commandStyle.container_inputs__inputView__inputText}
                                placeholder="usuario@gmail.com"
                                value={email}
                                cursorColor={'#000'}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                onChangeText={(val) => setEmail(val)}
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.email && <Text style={commandStyle.errorText}>{errors.email}</Text>}
                    </View>

                    <View>
                        <Text>Criar Senha <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                        <View style={[commandStyle.container_inputs__inputView, passwordFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                            <Icon style={[commandStyle.container_inputs__inputView__icon, passwordFocus && commandStyle.container_inputs__inputView__icon__focus]} name={'password'} size={30} />
                            <TextInput
                                style={commandStyle.container_inputs__inputView__inputText}
                                placeholder="********"
                                value={password}
                                cursorColor={'#000'}
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                onChangeText={(val) => setPassword(val)}
                                secureTextEntry={showVisibility}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setShowVisibility(!showVisibility)}>
                                <Icon style={[commandStyle.container_inputs__inputView__icon, passwordFocus && commandStyle.container_inputs__inputView__icon__focus]}
                                      name={showVisibility ? 'visibility' : 'visibility-off'}
                                      size={30} />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={commandStyle.errorText}>{errors.password}</Text>}
                    </View>

                    <View>
                        <Text>Confirmar Senha <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                        <View style={[commandStyle.container_inputs__inputView, confirmPasswordFocus && commandStyle.container_inputs__inputView__inputTextInput__focus]}>
                            <Icon style={[commandStyle.container_inputs__inputView__icon, confirmPasswordFocus && commandStyle.container_inputs__inputView__icon__focus]} name={'password'} size={30} />
                            <TextInput
                                style={commandStyle.container_inputs__inputView__inputText}
                                placeholder="********"
                                value={confirmPassword}
                                cursorColor={'#000'}
                                onFocus={() => setConfirmPasswordFocus(true)}
                                onBlur={() => setConfirmPasswordFocus(false)}
                                onChangeText={(val) => setConfirmPassword(val)}
                                secureTextEntry={true}
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.confirmPassword && <Text style={commandStyle.errorText}>{errors.confirmPassword}</Text>}
                    </View>

                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => { setChecked(!checked) }}
                                color={'#00a3ff'}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                <Text>Concordo com os</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Termos')}>
                                    <Text style={{color: '#00a3ff', fontWeight: 'bold', textDecorationLine: 'underline'}}>termos de uso e de privacidade</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errors.checkBox && <Text style={commandStyle.errorText}>{errors.checkBox}</Text>}
                    </View>

                    <TouchableOpacity style={commandStyle.button} onPress={funSubmit}>
                        <Text style={commandStyle.buttonText}>CADASTRAR-ME</Text>
                    </TouchableOpacity>
                </View>

                <View style={commandStyle.container_ou}>
                    <View style={commandStyle.barra}></View>
                    <Text>Ou</Text>
                    <View style={commandStyle.barra}></View>
                </View>

                <View style={commandStyle.text_cadastro_login}>
                    <Text>Ainda não tem uma conta?</Text>
                    <TouchableOpacity style={{paddingHorizontal: 5, paddingVertical: 10}} onPress={() => navigation.navigate('Login')}><Text style={commandStyle.text_cadastro_login_button_text}>Logar</Text></TouchableOpacity>
                </View>

                <CustomAlertInternet icon={'wifi-off'} color={'#000000'} title={'Sem Internet'} message={'Por favor, verifique sua conexão e tente novamente!\nSe o erro persistir tente sair e entrar novamente.'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Cadastro;