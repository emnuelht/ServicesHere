import React from "react";
import {SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";

function FormServices() {
    const [titulo, setTitulo] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [orcamento, setOrcamento] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [contatos, setContatos] = React.useState([]);

    const [tituloFocus, setTituloFocus] = React.useState("");
    const [descricaoFocus, setDescricaoFocus] = React.useState("");
    const [orcamentoFocus, setOrcamentoFocus] = React.useState("");
    const [localFocus, setLocalFocus] = React.useState("");
    const [contatosFocus, setContatosFocus] = React.useState("");

    const [errors, setErrors] = React.useState({});

    const veryDados = async () => {
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
        if (contatos.trim() === '') {
            newErrors.confirmPassword = 'Contatos é obrigatória';
            returns = false;
        }

        setErrors(newErrors);
        return returns;
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
                                <View style={[styles.container_inputs__inputView, tituloFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={styles.container_inputs__inputView__inputText}
                                        placeholder="Digite seu Nome"
                                        value={titulo}
                                        cursorColor={'#000'}
                                        onFocus={() => setTituloFocus(true)}
                                        onBlur={() => setTituloFocus(false)}
                                        onChangeText={setTitulo}
                                        autoCapitalize="none"
                                    />
                                </View>
                                {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}
                            </View>

                            <View>
                                <Text style={{fontSize: 17}}>Descrição</Text>
                                <View style={[styles.container_inputs__inputView, descricaoFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={styles.container_inputs__inputView__inputText}
                                        placeholder="(98) 98765-4321"
                                        keyboardType={'numeric'}
                                        value={descricao}
                                        cursorColor={'#000'}
                                        maxLength={15}
                                        onFocus={() => setDescricaoFocus(true)}
                                        onBlur={() => setDescricaoFocus(false)}
                                        onChangeText={setDescricao}
                                        autoCapitalize="none"
                                    />
                                </View>
                                {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}
                            </View>

                            <View>
                                <Text style={{fontSize: 17}}>Orçamento</Text>
                                <View style={[styles.container_inputs__inputView, orcamentoFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={[styles.container_inputs__inputView__inputText, {color: '#acacac'}]}
                                        placeholder="10R$ - 40R$... Podemos negociar o valor..."
                                        value={orcamento}
                                        cursorColor={'#000'}
                                        onFocus={() => setOrcamentoFocus(true)}
                                        onBlur={() => setOrcamentoFocus(false)}
                                        onChangeText={setOrcamento}
                                        multiline={true}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            {errors.orcamento && <Text style={styles.errorText}>{errors.orcamento}</Text>}

                            <View>
                                <Text style={{fontSize: 17}}>Localidade</Text>
                                <View style={[styles.container_inputs__inputView, localFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={[styles.container_inputs__inputView__inputText, {color: '#acacac'}]}
                                        placeholder="Arari - MA"
                                        value={local}
                                        cursorColor={'#000'}
                                        onFocus={() => setLocalFocus(true)}
                                        onBlur={() => setLocalFocus(false)}
                                        onChangeText={setLocal}
                                        multiline={true}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            {errors.local && <Text style={styles.errorText}>{errors.local}</Text>}

                            <View>
                                <Text style={{fontSize: 17}}>Contatos</Text>
                                <View style={[styles.container_inputs__inputView, contatosFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                    <TextInput
                                        style={[styles.container_inputs__inputView__inputText, {color: '#acacac'}]}
                                        placeholder="usuario@gmail.com, meu insta ..."
                                        value={contatos}
                                        cursorColor={'#000'}
                                        onFocus={() => setContatosFocus(true)}
                                        onBlur={() => setContatosFocus(false)}
                                        onChangeText={setLocal}
                                        multiline={true}
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            {errors.contatos && <Text style={styles.errorText}>{errors.contatos}</Text>}


                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10, marginTop: 50}}>
                            <ButtonForm title={'FECHAR'} color={'#9a9a9a'} marginVal={0} actionPress={() => setEditLogin(false)} />
                            <ButtonForm title={'SALVAR'} color={'#00a3ff'} marginVal={0} actionPress={saveInfoLogin} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default FormServices;