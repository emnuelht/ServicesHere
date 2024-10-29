import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Image, Alert} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import CommandStyles from "../Styles/CommandStyles";
import {Network} from "../config/Network";
import {CustomAlertInternet} from "./Items";
import Async from "../config/Async";


const checkConnection = async () => {
    return await Network.isConnected();
};

const Toolbar = ({ navigation }) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#00a3ff', padding: 10}}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon name='menu' size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold',}}>ServiçosHere</Text>
            <Icon name='menu' size={30} style={{opacity: 0}} />
        </View>
    );
}

export default function Home({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    checkConnection().then(result => {
        if (result) {
            new Async().getToken('login-email').then((token) => {
                new Network().dataUsuario(token).then((result) => {
                    if (result.success) {
                        if (result.data.confirm_code === 0) {
                            new Network().setConfirmCode(token).then();
                        }
                    } else {
                        Alert.alert('Ops algo deu errado! Por favor tente novamente.',
                            '',
                            [
                                {
                                    text: 'Tentar novamente',
                                    onPress: () => {navigation.replace('Home');},
                                }
                            ],
                            {cancelable: false},);
                    }
                })
            })
        } else {
            setModalVisible(true);
        }
    })
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <Toolbar navigation={navigation} />

            <SafeAreaView >
                <ScrollView>
                    <StatusBar backgroundColor={'#000'} barStyle="light-content" />

                    <View style={{backgroundColor: '#00a3ff', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 50, borderBottomStartRadius: 100, borderBottomEndRadius: 100, borderBottomColor: '#000', marginTop: -10,
                        // Shadow para iOS
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.25,
                        shadowRadius: 2,

                        // Sombra para Android
                        elevation: 5,}}>
                        <View style={CommandStyles.container_logo}>
                            <Image source={require("../../assets/images/logo_app.png")} style={CommandStyles.logo_app} />
                            <Text style={{ fontWeight: 'bold' }}>Services<Text style={{ color: '#fff' }}>Here</Text></Text>
                        </View>

                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, marginTop: 40}}>Seja bem-vindo ao nosso app de serviços! Aqui você poderá encontrar oportunidades de trabalho que combinam com você, ou contratar profissionais para te ajudar, tudo na cidade onde você mora.</Text>
                    </View>

                    <Text style={{textAlign: 'center', color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 100,}}>Como podemos te ajudar hoje?</Text>

                    <View style={{paddingHorizontal: 20}}>
                        <Icon name='work' size={30} style={{textAlign: 'center', marginTop: 50, marginBottom: 20}}/>
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Está procurando trabalho?</Text>
                        <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 20}}>Seja um emprego fixo ou temporário, aqui você encontra diversas oportunidades. Navegue e descubra a vaga ideal para você!</Text>
                        <TouchableOpacity style={CommandStyles.button} onPress={() => navigation.navigate('Services')}>
                            <Text style={CommandStyles.buttonText}>PROCURAR SERVIÇOS</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{paddingHorizontal: 20, marginTop: 10, marginBottom: 150}}>
                        <Icon name='person' size={30} style={{textAlign: 'center', marginTop: 50, marginBottom: 20}}/>
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Precisa de um profissional?</Text>
                        <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 20}}>Encontre trabalhadores qualificados para serviços temporários ou fixos. A solução ideal para sua demanda está a um clique de distância!</Text>
                        <TouchableOpacity style={CommandStyles.button} onPress={() => navigation.navigate('Professionals')}>
                            <Text style={CommandStyles.buttonText}>PROCURAR PROFISSIONAIS</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomAlertInternet icon={'wifi-off'} color={'#000000'} title={'Sem Internet'} message={'Por favor, verifique sua conexão e tente novamente!\nSe o erro persistir tente sair e entrar novamente.'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}