import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import CommandStyles from "../../Styles/CommandStyles";
import {Network} from "../../config/Network";
import Async from "../../config/Async";

function FormServices({ navigation, route }) {
    const id = route.params.id;
    const [titulo, setTitulo] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [orcamento, setOrcamento] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [palavraChave, setPalavraChave] = React.useState("");
    const [contatos, setContatos] = React.useState("");

    const [tituloFocus, setTituloFocus] = React.useState("");
    const [descricaoFocus, setDescricaoFocus] = React.useState("");
    const [orcamentoFocus, setOrcamentoFocus] = React.useState("");
    const [localFocus, setLocalFocus] = React.useState("");
    const [palavraChaveFocus, setPalavraChaveFocus] = React.useState("");
    const [contatosFocus, setContatosFocus] = React.useState("");

    const [errors, setErrors] = React.useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const dadosUser = async () => {
            try {
                if (id) {
                    const response = await new Network().viewService(id);

                    if (response.success) {
                        setTitulo(response.fetch.titulo);
                        setDescricao(response.fetch.descricao);
                        setOrcamento(response.fetch.orcamento);
                        setLocal(response.fetch.local);
                        setPalavraChave(response.fetch.palavra_chave);
                        setContatos(response.fetch.contatos);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        dadosUser().then();
    }, []);

    const veryDados = () => {
        let newErrors = {};
        let returns = true;

        if (titulo.trim() === '') {
            newErrors.titulo = 'Titulo é obrigatório';
            returns = false;
        }
        if (descricao.trim() === '') {
            newErrors.descricao = 'Descricao é obrigatório';
            returns = false;
        }
        if (orcamento.trim() === '') {
            newErrors.orcamento = 'Orçamento é obrigatório';
            returns = false;
        }
        if (local.trim() === '') {
            newErrors.local = 'Localidade é obrigatória';
            returns = false;
        }
        if (palavraChave.trim() === '') {
            newErrors.palavraChave = 'Palavra Chave é obrigatória';
            returns = false;
        }
        if (contatos.trim() === '') {
            newErrors.contatos = 'Contatos é obrigatória';
            returns = false;
        }

        setErrors(newErrors);
        return returns;
    }

    const ButtonForm = ({title, color, marginVal, actionPress}) => {
        return (
            <TouchableOpacity style={{
                width: '45%',
                padding: 15,
                backgroundColor: color,
                borderRadius: 5,
                alignItems: 'center',
                margin: marginVal,

                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,
            }} onPress={actionPress}>
                <Text style={CommandStyles.buttonText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    const saveForm = async () => {
        if (veryDados()) {
            setLoading(true);
            try {
                const token = await new Async().getToken('login-email');
                const dataUsuario = await new Network().dataUsuario(token);
                const result = await new Network().setService(!!id, id ? id : dataUsuario.data._id, titulo, descricao, orcamento, local, palavraChave, contatos);
                if (result.success) {
                    setTimeout(() => {
                        navigation.replace('MyServices');
                    }, 2000);
                } else {
                    setLoading(false);
                    Alert.alert('Ops algo deu errado! Por favor tente novamente.');
                }
            } catch (error) {
                setLoading(false);
                Alert.alert('Ops algo deu errado! Por favor tente novamente.');
            }
        }
    }

    const funPalavraChave = (palavra) => {
        if (palavra !== undefined) {
            return palavra.split(' ').map((word, index) => (
                (index < palavra.split(' ').length - 1) ?
                    <Text
                        key={index}
                        style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            backgroundColor: 'rgb(0,177,255)',
                            color: '#fff'
                        }}
                    >
                        {word}
                    </Text>
                    :
                    null
            ));
        }
    }

    const limitPalavraChave = (palavra) => {
        if (palavra !== undefined) {
            if (palavra.split(' ').length > 5) {
                return true;
            }
        }
        return false;
    }

    if (loading) {
        return (
            <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar backgroundColor={'#000'} barStyle="light-content"/>
                <ActivityIndicator size="large" color="#00a3ff" />
            </View>
        );
    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={{fontSize: 25, fontWeight: '600', marginBottom: 20, textAlign: 'center', backgroundColor: '#00a3ff', paddingVertical: 20, color: '#fff',
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 5,}}>Informações de Login</Text>
            <SafeAreaView>
                <ScrollView>
                    <View style={{padding: 20, marginBottom: 100}}>
                        <View style={{flexDirection: 'column', gap: 20}}>
                            <View>
                                <Text style={{fontSize: 17}}>Titulo</Text>
                                <View style={[CommandStyles.container_inputs__inputView, tituloFocus && CommandStyles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={CommandStyles.container_inputs__inputView__inputText}
                                        placeholder="ex: Preciso de um Especialista para Ajustar meu Computador!"
                                        value={titulo}
                                        maxLength={100}
                                        cursorColor={'#000'}
                                        onFocus={() => setTituloFocus(true)}
                                        onBlur={() => setTituloFocus(false)}
                                        onChangeText={setTitulo}
                                        autoCapitalize="none"
                                    />
                                </View>
                                {errors.titulo && <Text style={CommandStyles.errorText}>{errors.titulo}</Text>}
                            </View>

                            <View>
                                <Text style={{fontSize: 17}}>Descrição</Text>
                                <View style={[CommandStyles.container_inputs__inputView, descricaoFocus && CommandStyles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={CommandStyles.container_inputs__inputView__inputText}
                                        placeholder="ex: Estou procurando um profissional de TI com..."
                                        value={descricao}
                                        cursorColor={'#000'}
                                        onFocus={() => setDescricaoFocus(true)}
                                        onBlur={() => setDescricaoFocus(false)}
                                        onChangeText={setDescricao}
                                        multiline={true}
                                        autoCapitalize="none"
                                    />
                                </View>
                                {errors.descricao && <Text style={CommandStyles.errorText}>{errors.descricao}</Text>}
                            </View>

                            <View>
                                <Text style={{fontSize: 17}}>Orçamento</Text>
                                <View style={[CommandStyles.container_inputs__inputView, orcamentoFocus && CommandStyles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={CommandStyles.container_inputs__inputView__inputText}
                                        placeholder="ex: Orçamento: 10R$ - 40R$. Valor negociável."
                                        value={orcamento}
                                        cursorColor={'#000'}
                                        maxLength={100}
                                        onFocus={() => setOrcamentoFocus(true)}
                                        onBlur={() => setOrcamentoFocus(false)}
                                        onChangeText={setOrcamento}
                                        multiline={true}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            {errors.orcamento && <Text style={CommandStyles.errorText}>{errors.orcamento}</Text>}

                            <View>
                                <Text style={{fontSize: 17}}>Localidade</Text>
                                <View style={[CommandStyles.container_inputs__inputView, localFocus && CommandStyles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={CommandStyles.container_inputs__inputView__inputText}
                                        placeholder="ex: Arari - MA"
                                        value={local}
                                        cursorColor={'#000'}
                                        maxLength={60}
                                        onFocus={() => setLocalFocus(true)}
                                        onBlur={() => setLocalFocus(false)}
                                        onChangeText={setLocal}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            {errors.local && <Text style={CommandStyles.errorText}>{errors.local}</Text>}

                            <View>
                                <Text style={{fontSize: 17}}>Palavra chave</Text>
                                <Text style={{fontSize: 15, color: '#787878'}}>A palavra-chave é um meio alternativo para identificar e localizar alguém ou algo específico em uma pesquisa, facilitando o acesso rápido ao conteúdo desejado.{'\n'}As chaves tem que ser separadas por espaço.</Text>
                                <View style={[CommandStyles.container_inputs__inputView, palavraChaveFocus && CommandStyles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={CommandStyles.container_inputs__inputView__inputText}
                                        placeholder="ex: Pedreiro, Engenheiro, Manutenção,..."
                                        value={palavraChave}
                                        cursorColor={'#000'}
                                        onFocus={() => setPalavraChaveFocus(true)}
                                        onBlur={() => setPalavraChaveFocus(false)}
                                        onChangeText={(val) => {
                                            if (!limitPalavraChave(val)) {
                                                setPalavraChave(val);
                                                setErrors({palavraChave: ''});
                                            } else {
                                                setErrors({palavraChave: 'Tamanho máximo alcançado!'});
                                            }
                                        }}
                                        autoCapitalize="none"
                                    />
                                </View>
                                <View style={{flexDirection: 'row', gap: 5, flexWrap: 'wrap', marginTop: 5}}>
                                    {funPalavraChave(palavraChave)}
                                </View>
                            </View>
                            {errors.palavraChave && <Text style={CommandStyles.errorText}>{errors.palavraChave}</Text>}

                            <View>
                                <Text style={{fontSize: 17}}>Contatos</Text>
                                <View style={[CommandStyles.container_inputs__inputView, contatosFocus && CommandStyles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={CommandStyles.container_inputs__inputView__inputText}
                                        placeholder="ex: usuario@gmail.com, insta:..."
                                        value={contatos}
                                        cursorColor={'#000'}
                                        onFocus={() => setContatosFocus(true)}
                                        onBlur={() => setContatosFocus(false)}
                                        onChangeText={setContatos}
                                        multiline={true}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            {errors.contatos && <Text style={CommandStyles.errorText}>{errors.contatos}</Text>}


                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10, marginTop: 50}}>
                            <ButtonForm title={'FECHAR'} color={'#9a9a9a'} marginVal={0} actionPress={() => navigation.goBack()} />
                            <ButtonForm title={'SALVAR'} color={'#00a3ff'} marginVal={0} actionPress={saveForm} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default FormServices;