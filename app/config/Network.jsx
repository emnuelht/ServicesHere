import NetInfo from '@react-native-community/netinfo';

export class Network {

    static async isConnected() {
        const state = await NetInfo.fetch();
        return state.isConnected;
    }

    async mailer(email, code) {
        try {
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '01', nome: nome, telefone: telefone, email: email, senha: senha }),
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await response.json();
            if (data.success) {
                return { success: true, code: data.code };
            } else {
                console.log(data);
                return { success: false, error: data };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async dataUsuario(email) {
        try {
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '05', email: email, json: json }),
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

    async setInfoLogin(email, nome, telefone, genero) {
        try {
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
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

    async searchServicos(search) {
        try {
            const response = await fetch('http://192.168.1.104/ServicesHere/assets/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '11', search: search }),
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
}
