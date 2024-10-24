import React from 'react';
import {View, Text} from "react-native";

function Termos() {
    return (
        <View>
            <View style={{paddingHorizontal: 40}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 100, textAlign: 'center'}}>Termos de Uso e Política de Privacidade</Text>

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 40}}>1. Aceitação dos Termos</Text>
                <Text>Ao acessar e usar nosso site/aplicativo, você concorda com os termos e condições estabelecidos nesta Política de Privacidade. Se você não concorda com estes termos, não deve acessar ou usar nossos serviços.</Text>

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>2. Coleta de Dados Pessoais</Text>
                <Text>Coletamos as seguintes informações pessoais quando você se registra ou interage com nosso serviço:</Text>

                <Text>{'\u2022'} Nome</Text>
                <Text>{'\u2022'} Telefone</Text>
                <Text>{'\u2022'} Email</Text>
                <Text>{'\u2022'} Contato</Text>
                <Text>{'\u2022'} Gênero</Text>
                <Text>{'\u2022'} Informações do Formulário 'Sobre mim'</Text>

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>3. Uso dos Dados</Text>
                {/*As informações coletadas serão utilizadas para:*/}

                {/*Facilitar a interação entre os usuários da plataforma.*/}
                {/*Permitir que outros usuários visualizem suas informações, como experiência e habilidades.*/}
                {/*Enviar comunicações relacionadas aos serviços oferecidos.*/}
                {/*Melhorar a experiência do usuário e personalizar o conteúdo apresentado.*/}

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>4. Compartilhamento de Dados</Text>
                {/*Suas informações pessoais podem ser visualizadas por outros usuários da plataforma. Não compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei ou quando necessário para fornecer nossos serviços.*/}

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>5. Segurança dos Dados</Text>
                {/*Empregamos medidas de segurança razoáveis para proteger suas informações pessoais contra acesso não autorizado, divulgação ou destruição. No entanto, é importante lembrar que nenhuma transmissão de dados pela internet é 100% segura.*/}

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>6. Direitos dos Usuários</Text>
                {/*Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco através dos meios fornecidos na seção de contato.*/}

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>7. Alterações nesta Política</Text>
                {/*Reservamo-nos o direito de atualizar ou modificar esta Política de Privacidade a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação da versão revisada no nosso site/aplicativo. Recomendamos que você revise regularmente esta política para se manter informado sobre nossas práticas de privacidade.*/}

                <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>8. Contato</Text>
                {/*Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre a coleta e uso de suas informações pessoais, entre em contato conosco através do e-mail: [seu-email@dominio.com].*/}
            </View>
        </View>
    );
}

export default Termos;