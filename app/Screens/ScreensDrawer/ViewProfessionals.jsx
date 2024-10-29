import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Network} from "../../config/Network";
import {CustomAlertInternet} from "../Items";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommandStyles from "../../Styles/CommandStyles";

function ViewProfessionals({ route, navigation }) {
    const id = route.params.id;
    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState('carregando...');
    const [genero, setGenero] = useState('');
    const [orcamento, setOrcamento] = useState('carregando...');
    const [horario, setHorario] = useState('carregando...');
    const [profissao, setProfissao] = useState('carregando...');
    const [localidade, setLocalidade] = useState('carregando...');
    const [experiencia, setExperiencia] = useState('carregando...');
    const [habilidades, setHabilidades] = useState('carregando...');
    const [cursos, setCursos] = useState('carregando...');
    const [contatos, setContatos] = useState('carregando...');

    const checkConnection = async () => {
        return await Network.isConnected();
    };

    const alertError = () => {
        Alert.alert(
            'Ops... Algo de errado não está certo :(',
            'Por favor, tente novamente. Se o erro persistir, entre em contato com o suporte.',
            [
                {
                    text: 'Sair',
                    onPress: () => navigation.replace('Professionals'),
                    style: 'cancel',
                },
                {
                    text: 'Tentar novamente',
                    onPress: () => navigation.replace('ViewProfessionals', {id: id}), // Ação ao pressionar
                },
            ],
            { cancelable: false }
        );
    }

    useEffect(() => {
        const fetchData = async (connected) => {
            if (connected) {
                try {
                    const response = await new Network().viewProfessional(id);
                    if (response.success) {
                        setNome(response.search.nome);
                        setGenero(response.search.genero);
                        setHorario(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).horario : '');
                        setOrcamento(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).valorServico : '');
                        setProfissao(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).profissao : '');
                        setLocalidade(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).local : '');
                        setExperiencia(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).experiencia : '');
                        setHabilidades(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).habilidade : '');
                        setCursos(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).cursos : '');
                        setContatos(response.search.sobre_mim && response.search.sobre_mim.length > 0 ? JSON.parse(response.search.sobre_mim).contatos : '');
                    } else {
                        alertError();
                    }
                } catch (error) {
                    console.log(error);
                    alertError();
                }
            } else {
                setModalVisible(true);
            }
        };

        const fetchDataAndHandleConnection = async () => {
            const connected = await checkConnection();
            await fetchData(connected);
        };

        fetchDataAndHandleConnection().then();
    }, [id]);

    const Toolbar = ({ navigation }) => {
        const iconName = () => {
            if (genero === 'Masculino') {
                return 'male';
            } else if (genero === 'Feminino') {
                return 'female';
            } else {
                return 'person';
            }
        }

        return (
            <View style={CommandStyles.toolbarContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={{margin: 10}} name={'arrow-back'} size={30} color={'#fff'} />
                </TouchableOpacity>
                <View style={CommandStyles.iconContainerView}>
                    <View style={[CommandStyles.photoProfile, {
                        // Shadow para iOS
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.25,
                        shadowRadius: 2,

                        // Sombra para Android
                        elevation: 5,
                    }]}>
                        <Icon name={iconName()} size={60} color={'#000'} />
                    </View>
                    <Text style={{fontSize: 23, fontWeight: 'bold', color: '#fff', marginTop: 5, marginLeft: 5}}>{nome}</Text>
                    <Text style={{fontSize: 17, color: '#fff', marginLeft: 5}}>{profissao}</Text>
                </View>
            </View>
        );
    }

    const Sobre = () => {
        return (
            <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 7, marginHorizontal: 20, marginTop: 40, marginBottom: 20,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,}}>
                <View>
                    <Text style={{borderLeftColor: '#00a3ff', borderLeftWidth: 5, paddingLeft: 15, fontSize: 20, fontWeight: '600', marginBottom: 10,}}>Sobre {nome}</Text>
                    <View style={{flexDirection: 'row',}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Profissão: </Text><Text style={{fontSize: 17}}>{profissao}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Orçamento: </Text><Text style={{fontSize: 17}}>{orcamento}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Horário de trabalho: </Text><Text style={{fontSize: 17}}>{horario}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Minha localidade: </Text><Text style={{fontSize: 17}}>{localidade}</Text></View>
                </View>
            </View>
        );
    }

    const ExperienciaHabilidades = () => {
        return (
            <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 7, marginHorizontal: 20, marginBottom: 20,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,}}>
                <View>
                    <Text style={{borderLeftColor: '#00a3ff', borderLeftWidth: 5, paddingLeft: 15, fontSize: 20, fontWeight: '600', marginBottom: 10,}}>Experiência e Habilidades</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Experiência: </Text><Text style={{fontSize: 17}}>{experiencia}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Habilidades: </Text><Text style={{fontSize: 17}}>{habilidades}</Text></View>
                </View>
            </View>
        );
    }

    const CertificadosCursos = () => {
        return (
            <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 7, marginHorizontal: 20, marginBottom: 20,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,}}>
                <View>
                    <Text style={{borderLeftColor: '#00a3ff', borderLeftWidth: 5, paddingLeft: 15, fontSize: 20, fontWeight: '600', marginBottom: 10,}}>Certificações ou cursos</Text>
                    <Text style={{fontSize: 17}}>{cursos}</Text>
                </View>
            </View>
        );
    }

    const Contato = () => {
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
                    <Text style={{borderLeftColor: '#00a3ff', borderLeftWidth: 5, paddingLeft: 15, fontSize: 20, fontWeight: '600', marginBottom: 10,}}>Contato</Text>
                    <Text style={{fontSize: 17}}>{contatos}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <Toolbar navigation={navigation} />
            <SafeAreaView>
                <ScrollView>
                    <Sobre />
                    <ExperienciaHabilidades />
                    <CertificadosCursos />
                    <Contato />
                </ScrollView>
            </SafeAreaView>

            <CustomAlertInternet icon={'wifi-off'} color={'#000000'} title={'Sem Internet'} message={'Por favor, verifique sua conexão e tente novamente!\nSe o erro persistir tente sair e entrar novamente.'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </View>
    );
}

export default ViewProfessionals;