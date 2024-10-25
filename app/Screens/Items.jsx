import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, Modal} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'


export function CustomAlertClose({ setModalVisible, modalVisible, title, message }) {
    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertTitle}>{title}</Text>
                        <Text style={styles.alertMessage}>{message}</Text>
                        <Button title="Fechar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export function Toolbar({ navigation, title, color }) {
    return (
        <View style={[styles.container, color === 0 ? styles.backgroundColor1 : styles.backgroundColor2]}>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Icon name='arrow-back' size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.containerText}>{title}</Text>
            <Icon name='arrow-back' size={30} style={{opacity: 0}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,

        // Shadow para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        // Sombra para Android
        elevation: 2,
    },
     backgroundColor1: {
         backgroundColor: '#00a3ff',
     },
     backgroundColor2: {
         backgroundColor: '#ffffff',
     },
     containerText: {
         flex: 1,
         textAlign: 'center',
         color: '#fff',
         fontSize: 18,
         fontWeight: 'bold',
     },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',  // Título em vermelho
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
});