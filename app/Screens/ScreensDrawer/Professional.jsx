import React, {useCallback, useEffect, useState} from 'react';
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Keyboard,
    StatusBar,
    ActivityIndicator, BackHandler, Alert
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {Network} from "../../config/Network";
import {CustomAlertInternet} from "../Items";
import CommandStyles from "../../Styles/CommandStyles";
import Async from "../../config/Async";

function Professional({ navigation }) {
    const [busca, setBusca] = useState('Todos');
    const [buscaFocus, setBuscaFocus] = React.useState(false);
    const [listaItems, setListaItems] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isConnected, setIsConnected] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchClick, setSearchClick] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const checkConnection = async () => {
        const connected = await Network.isConnected();
        setIsConnected(connected);
        return connected;
    };

    new Async().getToken('login-email').then((token) => {
        new Network().analisandoDados(token, navigation);
    });

    const alert = () => {
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

    useEffect(() => {
        const fetchData = async (connected) => {
            if (connected) {
                try {
                    const response = await new Network().searchProfissionais(busca === 'Todos' ? '' : busca);
                    if (response.success) {
                        let array = [];
                        response.search.forEach((item) => {
                            if (item.profissional === 1) {
                                array.push({
                                    id: item._id,
                                    nome: item.nome,
                                    genero: item.genero,
                                    orcamento: item.sobre_mim && item.sobre_mim.length > 0 ? JSON.parse(item.sobre_mim).valorServico : '',
                                    profissao: item.sobre_mim && item.sobre_mim.length > 0 ? JSON.parse(item.sobre_mim).profissao : '',
                                    localidade: item.sobre_mim && item.sobre_mim.length > 0 ? JSON.parse(item.sobre_mim).local : '',
                                });
                            }
                        });
                        setListaItems(array);
                    } else {
                        setListaItems([]);
                    }
                } catch (error) {
                    alert();
                }
            } else {
                setModalVisible(true);
                setListaItems([]);
            }
        };

        const fetchDataAndHandleConnection = async () => {
            const connected = await checkConnection();
            await fetchData(connected);
        };

        fetchDataAndHandleConnection().then();

        if (searchClick) {
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    setLoading(true);
                    setSearchClick(false);
                    setBusca('');
                    Keyboard.dismiss();

                    setTimeout(() => setLoading(false), 1000);
                    return true;
                }
            );
            return () => backHandler.remove();
        }
    }, [searchClick, busca]);


    const fetchItems = async (search) => {
        const response = await new Network().searchProfissionais(search === 'Todos' ? '' : search);
        if (response.success) {
            let array = [];
            response.search.forEach((item) => {
                if (item.profissional === 1) {
                    array.push({
                        id: item._id,
                        nome: item.nome,
                        genero: item.genero,
                        orcamento: item.sobre_mim && item.sobre_mim.length > 0 ? JSON.parse(item.sobre_mim).valorServico : '',
                        profissao: item.sobre_mim && item.sobre_mim.length > 0 ? JSON.parse(item.sobre_mim).profissao : '',
                        localidade: item.sobre_mim && item.sobre_mim.length > 0 ? JSON.parse(item.sobre_mim).local : '',
                    });
                }
            });
            setListaItems(array);
        } else {
            setListaItems([]);
        }
    }

    const Toolbar = ({ navigation }) => {
        return (
            <View style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 5,
            }}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon style={{margin: 10}} name={'menu'} size={30} color={'#000000'}/>
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 'bold',}}>Profissionais</Text>
                <TouchableOpacity onPress={() => {
                    setLoading(true);
                    setSearchClick(true);
                    setTimeout(() => setLoading(false), 1000);
                }}>
                    <Icon style={{margin: 10}} name={'search'} size={30} color={'#000000'}/>
                </TouchableOpacity>
            </View>
        )
    }

    const ToolbarSearch = () => {
        const [search, setSearch] = React.useState('');
        const fetchSearch = async () => {
            if (isConnected) {
                try {
                    await fetchItems(search);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setModalVisible(true);
            }
        }

        return (
            <View style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 5,
            }}>
                <TouchableOpacity onPress={async () => {
                    setLoading(true);
                    setSearchClick(false);
                    setBusca('');
                    setSearch(busca);
                    await fetchSearch();
                    Keyboard.dismiss();

                    setTimeout(() => setLoading(false), 1000);
                }}>
                    <Icon style={{margin: 10}} name={'arrow-back'} size={30} color={'#000000'}/>
                </TouchableOpacity>
                <TextInput
                    style={[{flex: 1, height: 40, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5}, buscaFocus && CommandStyles.container_inputs__inputView__inputTextInput__search__focus]}
                    placeholder="Procure o seu profissional aqui..."
                    cursorColor={'#000'}
                    value={search}
                    onFocus={() => setBuscaFocus(true)}
                    onBlur={() => setBuscaFocus(false)}
                    onChangeText={setSearch}
                    returnKeyType={'search'}
                    onSubmitEditing={async () => {
                        setBusca(search);
                        await fetchSearch();
                    }}
                />
                <TouchableOpacity onPress={async () => {
                    await fetchSearch();
                    Keyboard.dismiss();
                }}>
                    <Icon style={{margin: 10}} name={'search'} size={30} color={'#000000'}/>
                </TouchableOpacity>
            </View>
        );
    }

    const Busca = () => {
        return (
            <View style={{padding: 15, flexDirection: 'row'}}>
                <Text style={{backgroundColor: '#00a3ff', paddingVertical: 5, paddingHorizontal: 10, color: '#fff', borderRadius: 5}}>{busca.trim() === '' ? 'Todos' : busca}</Text>
            </View>
        );
    }

    const Item = ({genero, titulo, orcamento, profissao, localidade}) => {
        const iconName = () => {
            if (genero === 'Masculino') {
                return 'male';
            } else if (genero === 'Feminino') {
                return 'female';
            } else {
                return 'person';
            }
        }

        const ResumoTitulo = ({ texto, maxLength }) => {
            const textoResumido = texto.length > maxLength ? texto.substring(0, maxLength) + '...' : texto;

            return (
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{textoResumido}</Text>
            );
        };

        const ResumoTexto = ({ texto, maxLength }) => {
            const textoResumido = texto.length > maxLength ? texto.substring(0, maxLength) + '...' : texto;

            return (
                <Text style={{fontSize: 15,}}>{textoResumido}</Text>
            );
        };

        return (
            <View style={{backgroundColor: '#fff', flexDirection: 'column', padding: 10, borderRadius: 10,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,}}>
                <View style={{flexDirection: 'row', gap: 10, alignItems: 'flex-start'}}>
                    <View style={{backgroundColor: '#EEEEEE', borderRadius: 5, padding: 10, borderWidth: .5, borderColor: 'rgba(0,0,0,0.19)'}}>
                        <Icon name={iconName()} size={40} color={'#717171'} />
                    </View>
                    <View style={{flex: 1}}>
                        <ResumoTitulo texto={titulo} maxLength={40} />
                        <ResumoTexto texto={profissao} maxLength={50} />
                        <ResumoTexto texto={orcamento} maxLength={100} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingEnd: 10, }}>
                    <ResumoTexto texto={localidade} maxLength={13} />
                    <Icon name={'place'} size={12} color={'#717171'} />
                </View>
            </View>
        );
    }

    const viewItem = (item) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                navigation.navigate('ViewProfessionals', {id: item.id});
            }}>
                <View style={{marginHorizontal: 20, marginVertical: 10}}>
                    <Item genero={item.genero} titulo={item.nome} orcamento={item.orcamento} profissao={item.profissao} localidade={item.localidade} />
                </View>
            </TouchableOpacity>
        );
    }

    const handleRefresh = useCallback(async () => {
        const connect = await checkConnection();
        setRefreshing(true);
        setBusca('');
        if (connect) {
            await fetchItems(busca);
        } else {
            setModalVisible(true);
        }
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    if (loading) {
        return (
            <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar backgroundColor={'#000'} barStyle="light-content" />
                <ActivityIndicator size="large" color="#00a3ff" />
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            {
                searchClick ?
                    <ToolbarSearch />:
                    <Toolbar navigation={navigation} />
            }
            <Busca />
            <FlatList
                data={listaItems}
                renderItem={({item}) => viewItem(item)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#00a3ff']} // Android
                        tintColor={'#00a3ff'} // iOS
                    />
                }
            />
            <TouchableOpacity style={{position: 'absolute', bottom: 40, right: 40, borderRadius: 100, backgroundColor: '#00a3ff', padding: 15,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,
            }} onPress={() => navigation.navigate('Profile')}>
                <Icon name={'person-outline'} size={30} color={'#ffffff'} />
            </TouchableOpacity>
            <CustomAlertInternet icon={'wifi-off'} color={'#000000'} title={'Sem Internet'} message={'Por favor, verifique sua conexão e tente novamente!\nSe o erro persistir tente sair e entrar novamente.'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </View>
    );
}

export default Professional;