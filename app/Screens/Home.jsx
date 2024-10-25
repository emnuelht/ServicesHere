import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const Toolbar = () => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#00a3ff', padding: 10}}>
            <TouchableOpacity onPress={() => {}}>
                <Icon name='menu' size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold',}}>ServiçosHere</Text>
            <Icon name='menu' size={30} style={{opacity: 0}} />
        </View>
    );
}

export default function Home() {
    return (
        <View>
            <Toolbar />
            <View style={{backgroundColor: '#00a3ff', paddingHorizontal: 20, paddingTop: 70, paddingBottom: 50}}>
                <Text style={{textAlign: 'center', color: '#fff', fontSize: 20,}}>Seja bem-vindo ao nosso app de serviços! Aqui você poderá encontrar oportunidades de trabalho que combinam com você, ou contratar profissionais para te ajudar, tudo na cidade onde você mora.</Text>
            </View>

            <Text style={{textAlign: 'center', color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 50,}}>Como podemos te ajudar hoje?</Text>

            <Icon name='work' size={30} style={{textAlign: 'center', marginTop: 50, marginBottom: 20}}/>
            <Text style={{textAlign: 'center', marginHorizontal: 20, fontSize: 18}}>Está procurando trabalho? Seja um emprego fixo ou temporário, aqui você encontra diversas oportunidades. Navegue e descubra a vaga ideal para você!</Text>
            <TouchableOpacity onPress={() => {}}>
                <Text>PROCURAR SERVIÇOS</Text>
            </TouchableOpacity>
        </View>
    );
}