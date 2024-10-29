import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    SafeAreaView,
    ScrollView, TextInput, Alert, BackHandler
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Async from "../../config/Async";
import {Network} from "../../config/Network";
import {Checkbox} from "react-native-paper";
import {CustomAlertClose, CustomAlertInternet} from "../Items";
import CommandStyles from "../../Styles/CommandStyles";

const network = new Network();
const styles = CommandStyles;

function Profile({ navigation }) {
    const [nome, setNome] = React.useState('carregando...');
    const [telefone, setTelefone] = React.useState('carregando...');
    const [email, setEmail] = React.useState('carregando...');
    const [genero, setGenero] = React.useState('carregando...');

    const [nomeFocus, setNomeFocus] = React.useState(false);
    const [telefoneFocus, setTelefoneFocus] = React.useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);

    const [activeProfile, setActiveProfile] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [sobreMim, setSobreMim] = React.useState('');
    const [editSobreMim, setEditSobreMim] = React.useState(false);
    const [editLogin, setEditLogin] = React.useState(false);

    const [profissaoFocus, setProfissaoFocus] = React.useState(false);
    const [valorServicoFocus, setValorServicoFocus] = React.useState(false);
    const [experienciaFocus, setExperienciaFocus] = React.useState(false);
    const [habilidadeFocus, setHabilidadeFocus] = React.useState(false);
    const [horarioFocus, setHorarioFocus] = React.useState(false);
    const [localFocus, setLocalFocus] = React.useState(false);
    const [contatosFocus, setContatosFocus] = React.useState(false);
    const [cursosFocus, setCursosFocus] = React.useState(false);

    const [profissao, setProfissao] = React.useState('');
    const [valorServico, setValorServico] = React.useState('');
    const [experiencia, setExperiencia] = React.useState('');
    const [habilidade, setHabilidade] = React.useState('');
    const [horario, setHorario] = React.useState('');
    const [local, setLocal] = React.useState('');
    const [contatos, setContatos] = React.useState('');
    const [cursos, setCursos] = React.useState('');
    const [errors, setErrors] = useState({});

    const generos = [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Feminino', value: 'Feminino' },
        { label: 'Outro', value: 'Outro' },
        { label: 'Prefiro não declarar', value: 'Prefiro não declarar' },
    ];

    useEffect(() => {
        const dadosUser = async () => {
            try {
                const token = await new Async().getToken('login-email');
                const response = await network.dataUsuario(token);

                if (response.success) {
                    setNome(response.data.nome);
                    setTelefone(response.data.telefone);
                    setEmail(token);
                    setGenero(response.data.genero);
                    setActiveProfile(response.data.profissional !== 0);
                    setSobreMim({sobre: response.data.sobre_mim});

                    setProfissao(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).profissao : '');
                    setValorServico(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).valorServico : '');
                    setExperiencia(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).experiencia : '');
                    setHabilidade(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).habilidade : '');
                    setHorario(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).horario : '');
                    setLocal(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).local : '');
                    setContatos(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).contatos : '');
                    setCursos(response.data.sobre_mim && response.data.sobre_mim.length > 0 ? JSON.parse(response.data.sobre_mim).cursos : '');
                } else {
                    Alert.alert('Ops algo deu errado! Por favor tente novamente.',
                        '',
                        [
                            {
                                text: 'Tentar novamente',
                                onPress: () => {navigation.replace('Profile');},
                            }
                        ],
                        {cancelable: false},);
                }
            } catch (error) {
                console.log(error);
            }
        }
        dadosUser().then();

        if (editSobreMim || editLogin) {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    setEditSobreMim(false);
                    setEditLogin(false);
                    return true;
                }
            );
            return () => backHandler.remove();
        }
    }, [editSobreMim, editLogin]);

    const Toolbar = ({ navigation }) => {
        return (
            <View style={styles.toolbarContainer}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon style={{margin: 10}} name={'menu'} size={30} color={'#fff'} />
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <View style={[styles.photoProfile, {
                        // Shadow para iOS
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.25,
                        shadowRadius: 2,

                        // Sombra para Android
                        elevation: 5,
                    }]}>
                        <Icon name={'person'} size={40} color={'#000'} />
                    </View>
                    <Text style={styles.textToolbar}>{nome}</Text>
                    <Text style={{fontSize: 16, color: '#fff'}}>{email}</Text>
                </View>
            </View>
        );
    }

    const MyCheckbox = () => {
        useEffect(() => {
            const fetchData = async () => {
                const result = await network.activeProfissional(email, activeProfile ? 1 : 0);
                if (!result.success) {
                    Alert.alert('Ops algo deu errado! Por favor tente novamente.',
                        '',
                        [
                            {
                                text: 'Tentar novamente',
                                onPress: () => {navigation.replace('Professionals');},
                            }
                        ],
                        {cancelable: false},);
                }
            }
            fetchData().then();
        }, [activeProfile]);

        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                    status={activeProfile ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setActiveProfile(!activeProfile);
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                        }, 1000);
                    }}
                    color={'#00a3ff'}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Text>Ativar conta como Profissional</Text>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Icon name={'info-outline'} size={25} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const InformacoesLogin = () => {
        return (
            <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 7, marginHorizontal: 20,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,}}>
                <View>
                    <Text style={{borderLeftColor: '#00a3ff', borderLeftWidth: 5, paddingLeft: 15, fontSize: 20, fontWeight: '600', marginBottom: 10,}}>Informações de Login</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Nome: </Text><Text style={{fontSize: 17}}>{nome}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Telefone: </Text><Text style={{fontSize: 17}}>{telefone}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Email: </Text><Text style={{fontSize: 17}}>{email}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Gênero: </Text><Text style={{fontSize: 17}}>{genero}</Text></View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{
                            width: '50%',
                            padding: 10,
                            backgroundColor: '#00a3ff',
                            borderRadius: 5,
                            alignItems: 'center',
                            marginTop: 20,

                            // Shadow para iOS
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 2,

                            // Sombra para Android
                            elevation: 2,
                        }} onPress={() => {
                            setEditLogin(true);
                            setErrors('');
                        }}>
                            <Text style={styles.buttonText}>EDITAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const SobreMim = () => {
        return (
            <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 7, marginHorizontal: 20, marginBottom: 320,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,}}>
                <View>
                    <Text style={{borderLeftColor: '#00a3ff', borderLeftWidth: 5, paddingLeft: 15, fontSize: 20, fontWeight: '600', marginBottom: 10,}}>Sobre Mim</Text>
                    {
                        sobreMim.sobre && sobreMim.sobre.length > 0 ?
                            (
                                <View style={{flexDirection: 'column'}}>

                                    {
                                        JSON.parse(sobreMim.sobre).profissao.trim() !== '' &&
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Profissão: </Text>
                                            <Text>{JSON.parse(sobreMim.sobre).profissao}</Text>
                                        </View>
                                    }
                                    {
                                        JSON.parse(sobreMim.sobre).valorServico.trim() !== '' &&
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Valor por serviço: </Text>
                                            <Text>{JSON.parse(sobreMim.sobre).valorServico}</Text>
                                        </View>
                                    }
                                    {
                                        JSON.parse(sobreMim.sobre).experiencia.trim() !== '' &&
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Experiência: </Text>
                                            <Text>{JSON.parse(sobreMim.sobre).experiencia}</Text>
                                        </View>
                                    }
                                    {
                                        JSON.parse(sobreMim.sobre).habilidade.trim() !== '' &&
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Habilidades: </Text>
                                            <Text>{JSON.parse(sobreMim.sobre).habilidade}</Text>
                                        </View>
                                    }
                                    {
                                        JSON.parse(sobreMim.sobre).local.trim() !== '' &&
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Minha localidade: </Text>
                                            <Text>{JSON.parse(sobreMim.sobre).local}</Text>
                                        </View>
                                    }
                                    {
                                        JSON.parse(sobreMim.sobre).contatos.trim() !== '' &&
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Contatos: </Text>
                                            <Text>{JSON.parse(sobreMim.sobre).contatos}</Text>
                                        </View>
                                    }
                                    {
                                        JSON.parse(sobreMim.sobre).cursos.trim() !== '' &&
                                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>Certificações ou cursos: </Text>
                                            <Text>{JSON.parse(sobreMim.sobre).cursos}</Text>
                                        </View>
                                    }

                                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                                        <TouchableOpacity style={{
                                            marginTop: 20,
                                            width: '50%',
                                            padding: 10,
                                            backgroundColor: '#00a3ff',
                                            borderRadius: 5,
                                            alignItems: 'center',

                                            // Shadow para iOS
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 2,

                                            // Sombra para Android
                                            elevation: 2,
                                        }} onPress={() => {setEditSobreMim(true)}}>
                                            <Text style={styles.buttonText}>EDITAR</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                            : (
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <TouchableOpacity style={{
                                        width: '50%',
                                        padding: 10,
                                        backgroundColor: '#00a3ff',
                                        borderRadius: 5,
                                        alignItems: 'center',

                                        // Shadow para iOS
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 2,

                                        // Sombra para Android
                                        elevation: 2,
                                    }} onPress={() => {setEditSobreMim(true)}}>
                                        <Text style={styles.buttonText}>ADICIONAR</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                    }
                </View>
            </View>
        );
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
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    const saveInfoLogin = async () => {
        let newErrors = {};

        setErrors('');
        if (nome.trim() === '') {
            newErrors.nome = 'Nome é obrigatório';
        } else if (telefone.trim() === '') {
            newErrors.telefone = 'Telefone é obrigatório';
        } else {
            setErrors('');
            setLoading(true);
            try {
                const result = await network.setInfoLogin(email, nome, telefone, genero);
                if (result) {
                    setEditSobreMim(false);
                    setTimeout(() => {
                        navigation.replace('Profile');
                    }, 2000);
                } else {
                    Alert.alert('Ops algo deu errado! Por favor tente novamente.');
                }
            } catch (error) {
                console.error(error);
            }
        }
        setErrors(newErrors);
    }

    const saveSobreMim = async () => {
        setLoading(true);
        try {
            const items = JSON.stringify({profissao: profissao, valorServico: valorServico, experiencia: experiencia, habilidade: habilidade, horario: horario, local: local, contatos: contatos, cursos: cursos});
            const result = await network.setSobreMim(email, items);
            if (result) {
                setEditSobreMim(false);
                setTimeout(() => {
                    navigation.replace('Profile');
                }, 2000);
            } else {
                Alert.alert('Ops algo deu errado! Por favor tente novamente.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const formatPhone = (text) => {
        let cleaned = ('' + text).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return text;
    };

    if (loading) {
        return (
            <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar backgroundColor={'#000'} barStyle="light-content"/>
                <ActivityIndicator size="large" color="#00a3ff" />
            </View>
        );
    }

    if (editLogin) {
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
                                    <Text style={{fontSize: 17}}>Nome</Text>
                                    <View style={[styles.container_inputs__inputView, nomeFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="Digite seu Nome"
                                            value={nome}
                                            cursorColor={'#000'}
                                            onFocus={() => setNomeFocus(true)}
                                            onBlur={() => setNomeFocus(false)}
                                            onChangeText={setNome}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Telefone</Text>
                                    <View style={[styles.container_inputs__inputView, telefoneFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="(98) 98765-4321"
                                            keyboardType={'numeric'}
                                            value={telefone}
                                            cursorColor={'#000'}
                                            maxLength={15}
                                            onFocus={() => setTelefoneFocus(true)}
                                            onBlur={() => setTelefoneFocus(false)}
                                            onChangeText={(val) => setTelefone(formatPhone(val))}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Email</Text>
                                    <View style={[styles.container_inputs__inputView, emailFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={[styles.container_inputs__inputView__inputText, {color: '#acacac'}]}
                                            placeholder="usuario@gmail.com"
                                            value={email}
                                            editable={false}
                                            cursorColor={'#000'}
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                            onChangeText={setEmail}
                                            multiline={true}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 17, marginBottom: 10}}>Gênero</Text>
                                    {generos.map((gender) => (
                                        <TouchableOpacity
                                            key={gender.value}
                                            onPress={() => setGenero(gender.value)}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginBottom: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    borderRadius: 10,
                                                    borderWidth: 2,
                                                    borderColor: '#00a3ff',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 10,
                                                    fontSize: 17,
                                                }}
                                            >
                                                {genero === gender.value && (
                                                    <View
                                                        style={{
                                                            height: 10,
                                                            width: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#00a3ff',
                                                        }}
                                                    />
                                                )}
                                            </View>
                                            <Text style={{ fontSize: 16 }}>{gender.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

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

    if (editSobreMim) {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{fontSize: 25, fontWeight: '600', marginBottom: 20, textAlign: 'center', backgroundColor: '#00a3ff', paddingVertical: 20, color: '#fff',
                    // Shadow para iOS
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,

                    // Sombra para Android
                    elevation: 5,}}>Sobre Mim</Text>
                <SafeAreaView>
                    <ScrollView>
                        <View style={{padding: 20, marginBottom: 100}}>
                            <View style={{flexDirection: 'column', gap: 20}}>
                                <View>
                                    <Text style={{fontSize: 17}}>Profissão</Text>
                                    <View style={[styles.container_inputs__inputView, profissaoFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="ex: Eu sou..."
                                            value={profissao}
                                            cursorColor={'#000'}
                                            onFocus={() => setProfissaoFocus(true)}
                                            onBlur={() => setProfissaoFocus(false)}
                                            onChangeText={setProfissao}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Valor por serviço</Text>
                                    <View style={[styles.container_inputs__inputView, valorServicoFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="ex: Diária de ...R$"
                                            value={valorServico}
                                            cursorColor={'#000'}
                                            onFocus={() => setValorServicoFocus(true)}
                                            onBlur={() => setValorServicoFocus(false)}
                                            onChangeText={setValorServico}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Experiência</Text>
                                    <View style={[styles.container_inputs__inputView, experienciaFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="ex: Fale sobre sua experiência"
                                            value={experiencia}
                                            cursorColor={'#000'}
                                            onFocus={() => setExperienciaFocus(true)}
                                            onBlur={() => setExperienciaFocus(false)}
                                            onChangeText={setExperiencia}
                                            multiline={true}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Habilidades</Text>
                                    <View style={[styles.container_inputs__inputView, habilidadeFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="ex: Fale sobre suas habilidades"
                                            value={habilidade}
                                            cursorColor={'#000'}
                                            onFocus={() => setHabilidadeFocus(true)}
                                            onBlur={() => setHabilidadeFocus(false)}
                                            onChangeText={setHabilidade}
                                            multiline={true}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Horário de trabalho</Text>
                                    <View style={[styles.container_inputs__inputView, horarioFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="ex: De segunda a sexta, das 7hrs as 11hrs e das 13hrs até as 17hrs."
                                            value={horario}
                                            cursorColor={'#000'}
                                            onFocus={() => setHorarioFocus(true)}
                                            onBlur={() => setHorarioFocus(false)}
                                            onChangeText={setHorario}
                                            multiline={true}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Minha localidade</Text>
                                    <View style={[styles.container_inputs__inputView, localFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="ex: Arari - MA"
                                            value={local}
                                            cursorColor={'#000'}
                                            onFocus={() => setLocalFocus(true)}
                                            onBlur={() => setLocalFocus(false)}
                                            onChangeText={setLocal}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 17}}>Contatos</Text>
                                    <View style={[styles.container_inputs__inputView, contatosFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="ex: Email - Redes Sociais..."
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

                                <View>
                                    <Text style={{fontSize: 17}}>Certificações ou cursos</Text>
                                    <View style={[styles.container_inputs__inputView, cursosFocus && styles.container_inputs__inputView__inputTextInput__focus]}>
                                        <TextInput
                                            style={styles.container_inputs__inputView__inputText}
                                            placeholder="(Opcional)"
                                            value={cursos}
                                            cursorColor={'#000'}
                                            onFocus={() => setCursosFocus(true)}
                                            onBlur={() => setCursosFocus(false)}
                                            onChangeText={setCursos}
                                            multiline={true}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10, marginTop: 50}}>
                                <ButtonForm title={'FECHAR'} color={'#9a9a9a'} marginVal={0} actionPress={() => setEditSobreMim(false)} />
                                <ButtonForm title={'SALVAR'} color={'#00a3ff'} marginVal={0} actionPress={saveSobreMim} />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={{width: '100%', height: '100%'}}>
            <Toolbar navigation={navigation} />
            <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
                <MyCheckbox />
            </View>

            <SafeAreaView>
                <ScrollView>
                    <View style={{flexDirection: 'column', gap: 20, marginVertical: 30}}>
                        <InformacoesLogin />
                        <SobreMim />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <CustomAlertClose modalVisible={modalVisible} setModalVisible={setModalVisible} title={'Conta Profissional'} icon={'person'} message={'Ao selecionar essa opção, sua conta será marcada como profissional e ficará visível para outros usuários, permitindo que eles visualizem seu perfil.'}/>
            <CustomAlertInternet icon={'wifi-off'} color={'#000000'} title={'Sem Internet'} message={'Por favor, verifique sua conexão e tente novamente!\nSe o erro persistir tente sair e entrar novamente.'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </View>
    );

}

export default Profile;