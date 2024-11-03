import NetInfo from '@react-native-community/netinfo';
import {Alert, BackHandler} from "react-native";
import Async from "./Async";
import Constants from "expo-constants";

export class Network {

    static async isConnected() {
        const state = await NetInfo.fetch();
        return state.isConnected;
    }

    async mailer(email, code) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '00', email: email, code: code }),
            });

            if (!response.ok) {
                return { success: false };
            }

            return await response.json();
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async login(email, senha) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '02', email: email, senha: senha }),
            });

            if (!response.ok) {
                return { success: false };
            }

            return await response.json();
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async cadastro(nome, telefone, email, senha) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '01', nome: nome, telefone: telefone, email: email, senha: senha }),
            });

            if (!response.ok) {
                return { success: false };
            }

            return await response.json();
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async dataUsuario(email) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '03', email: email }),
            });

            if (!response.ok) {
                return { success: false };
            }
            const data = await response.json();
            if (data.success) {
                return data;
            } else {
                return { success: false };
            }

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async activeProfissional(email, value) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '04', email: email, value: value }),
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await response.json();
            return data.success;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async setSobreMim(email, json) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '05', email: email, json: json }),
            });

            if (!response.ok) {
                return { success: false };
            }

            return await response.json();
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async setInfoLogin(email, nome, telefone, genero) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '06', email: email, nome: nome, telefone: telefone, genero: genero }),
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await response.json();
            return data.success;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async searchProfissionais(search) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '07', search: search }),
            });

            if (!response.ok) {
                return { success: false };
            }
            const data = await response.json();
            if (data.success) {
                return data;
            } else {
                return { success: false };
            }

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async viewProfessional(id) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '08', id: id }),
            });

            if (!response.ok) {
                return { success: false };
            }
            const data = await response.json();
            if (data.success) {
                return data;
            } else {
                return { success: false };
            }

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async setConfirmCode(email) {
        try {
            await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '09', email: email }),
            });
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async searchMyServices(id, search) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '10', id: id, search: search }),
            });

            if (!response.ok) {
                return { success: false };
            }
            return await response.json();

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async searchServices(search) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '11', search: search }),
            });

            if (!response.ok) {
                return { success: false };
            }
            return  await response.json();

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async setService(action, id, titulo, descricao, orcamento, local, chave, contatos) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '12', action: action, id: id, titulo: titulo, descricao: descricao, orcamento: orcamento, local: local, chave: chave, contatos: contatos }),
            });

            if (!response.ok) {
                return { success: false };
            }
            return await response.json();
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async viewService(id) {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '13', id: id }),
            });

            if (!response.ok) {
                return { success: false };
            }

            return await response.json();
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    analisandoDados(token, navigation) {
        this.dataUsuario(token).then(async (result) => {
            if (result.success) {
                const response = await this.versaoApp();
                if (result.data.status === 1) {
                    Alert.alert('O ser acesso foi bloqueado!',
                        'Para mais informações entre em contato com o suporte.',
                        [
                            {
                                text: 'Fechar',
                                onPress: async () => {
                                    try {
                                        const tokenRemovido = await new Async().removeToken('login-email');
                                        if (tokenRemovido) {
                                            navigation.navigate('Config');
                                        } else {
                                            console.log("Nenhum token encontrado ou erro ao remover");
                                        }
                                    } catch (error) {
                                        console.error("Erro ao sair da conta:", error);
                                    }
                                },
                            }
                        ],
                        {cancelable: false},);
                } else if (response.fetch.versao !== Constants.manifest2.extra.expoClient.version) {
                    Alert.alert('Atualize o seu App!',
                        'O seu aplicativo está desatualizado, por favor atualize, entre na nossa página e atualize o aplicativo.\nCaso tenha problemas em atualizar o App, entre em contato com a gente, pelo nosso Instagram: serviceshere.com.br',
                        [
                            {
                                text: 'Fechar',
                                onPress: () => {
                                    BackHandler.exitApp();
                                },
                            }
                        ],
                        {cancelable: false},);
                } else {
                    if (result.data.confirm_code === 0) {
                        new Network().setConfirmCode(token).then();
                    }
                }
            } else {
                Alert.alert('Ops algo deu errado! Por favor tente novamente.',
                    '',
                    [
                        {
                            text: 'Tentar novamente',
                            onPress: () => {
                                navigation.replace('Home');
                            },
                        }
                    ],
                    {cancelable: false},);
            }
        });
    }

    async versaoApp() {
        try {
            const response = await fetch('https://serviceshere.vps-kinghost.net/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '14', }),
            });
            if (!response.ok) {
                return {success: false};
            }
            return await response.json();
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
