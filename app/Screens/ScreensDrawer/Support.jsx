import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Linking, Alert} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommandStyles from "../../Styles/CommandStyles";


const commandStyle = CommandStyles;

const openURL = async () => {
    const url = 'https://wa.me/5598985972447';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert('Error! Por favor tente novamente.');
    }
};

const Toolbar = ({ navigation }) => {
    return (
        <View style={styles.toolbarContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={{margin: 10}} name={'arrow-back'} size={30} color={'#fff'} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <Icon name={'support-agent'} size={50} color={'#fff'} />
                <Text style={styles.textToolbar}>Suporte</Text>
            </View>
        </View>
    );
}

function Support({ navigation }) {
    return (
        <View>
            <Toolbar navigation={navigation} />

            <View style={styles.container}>
                <Text style={styles.text}>Caso tenha algum problema, entre em contato com a gente, clicando no botão abaixo.</Text>
                <TouchableOpacity style={commandStyle.button} onPress={openURL}>
                    <Text style={commandStyle.buttonText}>ENTRAR EM CONTATO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    toolbarContainer: {
        backgroundColor: '#00a3ff',
        flexDirection: 'column',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    textToolbar: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    container: {
        marginHorizontal: 20,
        gap: 20,
    },
    text: {
        fontSize: 20,
        marginTop: 50,
        textAlign: 'center',
    }
});

export default Support;