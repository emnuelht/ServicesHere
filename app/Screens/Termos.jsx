import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from "react-native";
import {Toolbar} from "./Items";

function Termos({ navigation }) {

    return (
        <View>
            <Toolbar navigation={navigation} screen={'Cadastro'} icon={'arrow-back'} title={'Termos'} color={0} />
            <SafeAreaView style={{paddingHorizontal: 20, marginTop: 20, marginBottom: 40}}>
                <ScrollView>
                    <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Termos de Uso e Política de Privacidade</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 40}}>1. Aceitação dos Termos</Text>
                    <Text>Ao acessar e usar nosso aplicativo, você concorda com os termos e condições estabelecidos nesta Política de Privacidade. Se você não concorda com estes termos, não deve acessar ou usar nossos serviços.</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>2. Coleta de Dados Pessoais</Text>
                    <Text style={{marginBottom: 10}}>Coletamos as seguintes informações pessoais quando você se registra ou interage com nosso serviço:</Text>

                    <Text style={{fontWeight: 'bold'}}>{'\u2022'} Nome</Text>
                    <Text style={{fontWeight: 'bold'}}>{'\u2022'} Telefone</Text>
                    <Text style={{fontWeight: 'bold'}}>{'\u2022'} Email</Text>
                    <Text style={{fontWeight: 'bold'}}>{'\u2022'} Contatos</Text>
                    <Text style={{fontWeight: 'bold'}}>{'\u2022'} Redes Sociais</Text>
                    <Text style={{fontWeight: 'bold'}}>{'\u2022'} Gênero</Text>
                    <Text style={{fontWeight: 'bold'}}>{'\u2022'} Informações do Formulário 'Sobre mim'</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Profissão</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Valor do serviço</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Experiência</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Habilidades</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Horário de trabalho</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Localidade</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Contatos</Text>
                    <Text style={{fontWeight: '600', marginLeft: 10}}>{'\u2022'} Cursos/Certificações</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>3. Uso dos Dados</Text>
                    <Text>As informações coletadas serão utilizadas para:</Text>

                    <Text>Facilitar a interação entre os usuários da plataforma.</Text>
                    <Text>Permitir que outros usuários visualizem suas informações, como experiência e habilidades.</Text>
                    <Text>Enviar comunicações relacionadas aos serviços oferecidos.</Text>
                    <Text>Melhorar a experiência do usuário e personalizar o conteúdo apresentado.</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>4. Compartilhamento de Dados</Text>
                    <Text>Suas informações pessoais podem ser visualizadas por outros usuários da plataforma. Não compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei ou quando necessário para fornecer nossos serviços.</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>5. Segurança dos Dados</Text>
                    <Text>Empregamos medidas de segurança razoáveis para proteger suas informações pessoais contra acesso não autorizado, divulgação ou destruição. Embora nos esforcemos para garantir a segurança de suas informações, lembre-se de que nenhuma transmissão de dados pela internet é completamente segura.</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>6. Direitos dos Usuários</Text>
                    <Text>Você tem o direito de acessar, corrigir ou excluir (entrando em contato com o suporte para a exclusão da conta) suas informações pessoais. Para exercer esses direitos, entre em contato conosco através dos meios fornecidos na seção de contato.</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>7. Alterações nesta Política</Text>
                    <Text>Reservamo-nos o direito de atualizar ou modificar esta Política de Privacidade a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação da versão revisada no nosso aplicativo. Recomendamos que você revise regularmente esta política para se manter informado sobre nossas práticas de privacidade.</Text>

                    <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 20}}>8. Contato</Text>
                    <Text style={{marginBottom: 100}}>Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre a coleta e uso de suas informações pessoais, entre em contato conosco através do e-mail: serviceshere.org@gmail.com</Text>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default Termos;