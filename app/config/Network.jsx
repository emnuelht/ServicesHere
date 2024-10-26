export class Network {

    async login(email, senha) {
        try {
            const response = await fetch('http://192.168.1.112/ServicesHere/assets/php/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access: '02', email: email, senha: senha }),
            });

            if (!response.ok) {
                return { success: false };
            }

            const data = await response.json();
            return { success: data.success };
        } catch (error) {
            console.error('Erro:', error);
            return { success: false, error: error.message };
        }
    }

    async cadastro(nome, telefone, email, senha) {
        try {
            const response = await fetch('http://192.168.1.112/ServicesHere/assets/php/index.php', {
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
            console.error('Erro:', error);
            return { success: false, error: error.message };
        }
    }
}
