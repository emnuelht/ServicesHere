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

function Services({ navigation }) {
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

    const alert = (error) => {
        Alert.alert('Ops algo deu errado! Por favor tente novamente.',
            error,
            [
                {
                    text: 'Tentar novamente',
                    onPress: () => {navigation.replace('MyServices');},
                }
            ],
            {cancelable: false},);
    }

    useEffect(() => {
        const fetchData = async (connected) => {
            if (connected) {
                try {
                    const response = await new Network().searchServices(busca === 'Todos' ? '' : busca);
                    if (response.success) {
                        let array = [];
                        for (let i = 0; i < response.search.length; i++) {
                            array.push({
                                id: response.search[i]._id,
                                id_usuario: '',
                                titulo: response.search[i].titulo,
                                orcamento: response.search[i].orcamento,
                                descricao: response.search[i].descricao,
                                palavraChave: response.search[i].palavra_chave,
                                local: response.search[i].local,
                            });
                            setListaItems(array);
                        }
                    } else {
                        setListaItems([]);
                    }
                } catch (error) {
                    alert(error);
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
        const response = await new Network().searchServices(search === 'Todos' ? '' : search);
        if (response.success) {
            let array = [];
            for (let i = 0; i < response.search.length; i++) {
                array.push({
                    id: response.search[i]._id,
                    id_usuario: '',
                    titulo: response.search[i].titulo,
                    orcamento: response.search[i].orcamento,
                    descricao: response.search[i].descricao,
                    palavraChave: response.search[i].palavra_chave,
                    local: response.search[i].local,
                });
                setListaItems(array);
            }
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
                <Text style={{fontSize: 20, fontWeight: 'bold',}}>Serviços</Text>
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
                    placeholder="Procure um trabalho aqui..."
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

    const Item = ({titulo, orcamento, descricao, palavraChave, localidade}) => {
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

        const ResumoPalavraChave = ({ texto, maxLength }) => {
            const textoResumido = texto.length > maxLength ? texto.substring(0, maxLength) + '...' : texto;

            return (
                <Text style={{fontWeight: 'bold', color: '#00a3ff'}}>{textoResumido.trim().split(' ').join(' - ')}</Text>
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
                        <Icon name={'work-outline'} size={40} color={'#717171'} />
                    </View>
                    <View style={{flex: 1}}>
                        <ResumoTitulo texto={titulo} maxLength={40} />
                        <ResumoTexto texto={orcamento} maxLength={50} />
                        <ResumoTexto texto={descricao} maxLength={100} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <ResumoPalavraChave texto={palavraChave} maxLength={33} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ResumoTexto texto={localidade} maxLength={13} />
                        <Icon name={'place'} size={12} color={'#717171'} />
                    </View>
                </View>
            </View>
        );
    }

    const viewItem = (item) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                setLoading(true);
                setTimeout(() => {
                    navigation.navigate('ViewServices', {id: item.id, id_user: item.id_usuario});
                    setTimeout(() => setLoading(false), 500);
                }, 500);
            }}>
                <View style={{marginHorizontal: 20, marginVertical: 10}}>
                    <Item titulo={item.titulo} orcamento={item.orcamento} localidade={item.local} palavraChave={item.palavraChave} descricao={item.descricao} />
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
            {
                !searchClick && <TouchableOpacity style={{position: 'absolute', bottom: 40, right: 40, borderRadius: 100, backgroundColor: '#00a3ff', padding: 15,
                    // Shadow para iOS
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 2,

                    // Sombra para Android
                    elevation: 2,
                }} onPress={() => navigation.navigate('MyServices')}>
                    <Icon name={'work-outline'} size={30} color={'#ffffff'} />
                </TouchableOpacity>
            }
            <CustomAlertInternet icon={'wifi-off'} color={'#000000'} title={'Sem Internet'} message={'Por favor, verifique sua conexão e tente novamente!\nSe o erro persistir tente sair e entrar novamente.'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </View>
    );
}

export default Services;