import React, {useEffect} from "react";
import {
    ActivityIndicator, Alert,
    BackHandler,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommandStyles from "../../Styles/CommandStyles";
import {Network} from "../../config/Network";

function ViewServices({ navigation, route }) {
    const id = route.params.id;
    const id_user = route.params.id_user;
    const [titulo, setTitulo] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const [orcamento, setOrcamento] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [contatos, setContatos] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const dadosUser = async () => {
            try {
                const response = await new Network().viewService(id);

                if (response.success) {
                    setTitulo(response.fetch.titulo);
                    setDescricao(response.fetch.descricao);
                    setOrcamento(response.fetch.orcamento);
                    setLocal(response.fetch.local);
                    setContatos(response.fetch.contatos);
                }
            } catch (error) {
                console.log(error);
            }
        }
        dadosUser().then();
    }, []);

    const Toolbar = ({ navigation }) => {
        return (
            <View style={CommandStyles.toolbarContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={{margin: 10}} name={'arrow-back'} size={30} color={'#fff'} />
                </TouchableOpacity>
                <View style={CommandStyles.iconContainer}>
                    <Icon name={'work-outline'} size={50} color={'#fff'} />
                    <Text style={CommandStyles.textToolbar}>{titulo}</Text>
                </View>
            </View>
        );
    }

    const Informacoes = () => {
        return (
            <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 7, marginHorizontal: 20, marginTop: 20,
                // Shadow para iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2,

                // Sombra para Android
                elevation: 2,}}>
                <View>
                    <Text style={{borderLeftColor: '#00a3ff', borderLeftWidth: 5, paddingLeft: 15, fontSize: 20, fontWeight: '600', marginBottom: 10,}}>Informações</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Nome: {titulo}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Descrição da vaga: </Text><Text style={{fontSize: 17}}>{descricao}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Orçamento proposto: </Text><Text style={{fontSize: 17}}>{orcamento}</Text></View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold', fontSize: 17}}>Localidade: </Text><Text style={{fontSize: 17}}>{local}</Text></View>
                </View>
            </View>
        );
    };

    const Contatos = () => {
        return (
            <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 7, marginHorizontal: 20, marginVertical: 20,
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

    const ButtonEdit = () => {
        return (
            <View style={{position: 'absolute', bottom: 40, right: 40, flexDirection: 'column', gap: 20, alignItems: 'center'}}>
                <TouchableOpacity style={{borderRadius: 100, backgroundColor: '#ff0000', padding: 15,
                    // Shadow para iOS
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 2,

                    // Sombra para Android
                    elevation: 2,
                }} onPress={() => {
                    Alert.alert(
                        'Você realmente deseja excluir este serviço?',
                        'Após ser deletado ele não ficará mais na lista de serviços!',
                        [
                            {
                                text: 'Sim, excluir!',
                                onPress: () => {
                                    new Network().deletarService(id).then(response => {
                                        if (response.success) {
                                            navigation.replace('MyServices');
                                        } else {
                                            Alert.alert('Deu um erro ao deletar, por favor tente novamente!');
                                        }
                                    });
                                }
                            },
                            {
                                text: 'Cancelar',
                                onPress: () => {}
                            }
                        ], {cancelable: true}
                    );
                }}>
                    <Icon name={'delete'} size={25} color={'#ffffff'} />
                </TouchableOpacity>

                <TouchableOpacity style={{borderRadius: 100, backgroundColor: '#00a3ff', padding: 15,
                    // Shadow para iOS
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 2,

                    // Sombra para Android
                    elevation: 2,
                }} onPress={() => {
                    setLoading(true);
                    setTimeout(() => navigation.replace('FormServices', {id: id}), 1000);
                }}>
                    <Icon name={'edit'} size={30} color={'#ffffff'} />
                </TouchableOpacity>
            </View>
        );
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
        <View style={{flex: 1}}>
            <Toolbar navigation={navigation} />

            <SafeAreaView>
                <ScrollView>
                    <Informacoes />
                    <Contatos />
                </ScrollView>
            </SafeAreaView>
            {id_user && <ButtonEdit />}
        </View>
    );

}

export default ViewServices;