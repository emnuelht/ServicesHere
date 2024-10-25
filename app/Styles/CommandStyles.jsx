import { StyleSheet } from 'react-native';

const CommandStyles = StyleSheet.create({
    container_login: {
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        height: '100%',
    },

    container_logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    safeAreaView: {
        width: '100%',
        height: '100%',
    },

    logo_app: {
        width: 70,
        height: 70,
    },

    text_title_login: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00a3ff',
        textAlign: 'center',
        marginTop: 20
    },

    container_inputs: {
        marginTop: 40,
        gap: 20,
    },

    container_inputs__inputView: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 5,
        width: '100%',
        borderColor: 'rgba(255,255,255,0)',
        borderWidth: 1.5,

        // Shadow para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        // Sombra para Android
        elevation: 2,
    },

    container_inputs__inputView__inputText: {
        flex: 1,
        fontSize: 18,
        color: '#000',
    },

    container_inputs__inputView__inputTextInput__focus: {
        borderColor: '#00a3ff',
        borderWidth: 1.5,
    },

    container_inputs__inputView__icon__focus: {
        color: '#00a3ff',
        opacity: 1,
    },

    container_inputs__inputView__icon: {
        opacity: .5,
    },

    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#00a3ff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        // Shadow para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        // Sombra para Android
        elevation: 2,
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },

    container_ou: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 30,
        marginBottom: 10,
    },

    barra: {
        width: '45%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.22)'
    },

    text_cadastro_login: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text_cadastro_login_button_text: {
        color: '#00a3ff',
        fontWeight: 'bold',
    },

    errorInput: {
        borderColor: 'red',
    },

    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default CommandStyles;