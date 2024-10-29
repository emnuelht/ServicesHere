import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Linking, Alert} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommandStyles from "../../Styles/CommandStyles";


const styles = CommandStyles;

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
                <TouchableOpacity style={styles.button} onPress={openURL}>
                    <Text style={styles.buttonText}>ENTRAR EM CONTATO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Support;