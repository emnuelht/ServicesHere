import React, {useState} from 'react';
import {View, Text, StatusBar, Image, TextInput, TouchableOpacity} from "react-native";
import CommandStyles from "../Styles/CommandStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Checkbox} from "react-native-paper";

const commandStyle = CommandStyles;

function Cadastro({ navigation }) {
    const [checked, setChecked] = useState(false);

    return (
        <View style={[commandStyle.container_login, { paddingTop: 15 }]}>
            <StatusBar backgroundColor={'#000'} barStyle="light-content" />
            <View style={commandStyle.container_logo}>
                <Image source={require("../../assets/images/logo_app.png")} style={{width: 50, height: 50}} />
                <Text style={{ fontWeight: 'bold' }}>Services<Text style={{ color: '#00a3ff' }}>Here</Text></Text>
            </View>

            <Text style={commandStyle.text_title_login}>Cadastre-se</Text>

            <View style={commandStyle.container_inputs}>
                <View>
                    <Text>Nome e Sobrenome <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                    <View style={[commandStyle.container_inputs__inputView]}>
                        <Icon style={[commandStyle.container_inputs__inputView__icon]} name={'person'} size={30} />
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="Digite seu nome aqui..."
                            value={''}
                            cursorColor={'#000'}
                            onFocus={() => {}}
                            onBlur={() => {}}
                            onChangeText={''}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View>
                    <Text>Telefone <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                    <View style={[commandStyle.container_inputs__inputView]}>
                        <Icon style={[commandStyle.container_inputs__inputView__icon]} name={'phone'} size={30} />
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="(98) 98765-4321"
                            value={''}
                            cursorColor={'#000'}
                            onFocus={() => {}}
                            onBlur={() => {}}
                            onChangeText={''}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View>
                    <Text>Email <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                    <View style={[commandStyle.container_inputs__inputView]}>
                        <Icon style={[commandStyle.container_inputs__inputView__icon]} name={'email'} size={30} />
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="usuario@gmail.com"
                            value={''}
                            cursorColor={'#000'}
                            onFocus={() => {}}
                            onBlur={() => {}}
                            onChangeText={''}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View>
                    <Text>Criar Senha <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                    <View style={[commandStyle.container_inputs__inputView]}>
                        <Icon style={[commandStyle.container_inputs__inputView__icon]} name={'email'} size={30} />
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="********"
                            value={''}
                            cursorColor={'#000'}
                            onFocus={() => {}}
                            onBlur={() => {}}
                            onChangeText={''}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View>
                    <Text>Confirmar Senha <Text style={{fontWeight: 'bold', color: '#f00'}}>*</Text></Text>
                    <View style={[commandStyle.container_inputs__inputView]}>
                        <Icon style={[commandStyle.container_inputs__inputView__icon]} name={'email'} size={30} />
                        <TextInput
                            style={commandStyle.container_inputs__inputView__inputText}
                            placeholder="********"
                            value={''}
                            cursorColor={'#000'}
                            onFocus={() => {}}
                            onBlur={() => {}}
                            onChangeText={''}
                            autoCapitalize="none"
                        />
                    </View>
                </View>

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

                <TouchableOpacity style={commandStyle.button} onPress={() => {}}>
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
                <TouchableOpacity style={{paddingHorizontal: 5, paddingVertical: 10}} onPress={() => navigation.navigate('Login')}><Text style={commandStyle.text_cadastro_login_button_text}>Cadastre-se aqui</Text></TouchableOpacity>
            </View>
        </View>
    );
}

export default Cadastro;