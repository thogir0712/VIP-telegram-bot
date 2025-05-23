import UserRepository from "../repository/userRepo.js";
import "dotenv/config";
import { countTotalUsers } from "../utils/fileSearch.js";
import formatNumber from "../utils/formatNumber.js";

class responseMessages {
    /**
     * @param {Number} userID 
     * @returns {Promise}
     * Function for clients no register in database
     */
    async noRegistry(userID) {


        let totalUsers = await countTotalUsers();
        let formatTotal = formatNumber(totalUsers)
        try {
            let user = await UserRepository.findUser(userID.id);

            if (!user) {
                user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);

            }

            let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <b>Olá ${user.first_name}</b>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Nome</b> : <code> ${user.first_name}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Saldo</b> :  <code> R$ ${user.balance.toFixed(2)}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Plano</b> : <code> ${user.subscription.plan}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Status</b> : <code> ${user.subscription.status}</code>

<a href="${process.env.CHANNEL_LINK}">↯ </a> » <b>Gostaria de realizar uma consulta?</b>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>LOGINS</b>: <code>${formatTotal}</code>
`;
            return caption;

        } catch (error) {
            console.log(error)
        }
    }

    cmds() {
        let caption = `<a href="${process.env.CHANNEL_LINK}">↳ </a>  /cpf » <b>Faz uma busca dos dados de uma pessoa com o cpf </b>\n
<a href="${process.env.CHANNEL_LINK}">↳ </a>  /pw » <b>Faz uma busca de login/senha pelo domínio/site </b>\n
<a href="${process.env.CHANNEL_LINK}">↳ </a>  /verificar » <b>verifica se tem credenciais para sua url em nossa db (Evite colocar o site com https:// ou www.) </b>\n
<a href="${process.env.CHANNEL_LINK}">↳ </a>  /email » <b>verifica se tem credenciais para um email ou usuario especifico em nossa db</b>`;
        return caption
    }

    async verify(userID, url, result) {

        let totalUsers = await countTotalUsers();
        let formatTotal = formatNumber(totalUsers)


        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
            user
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Consulta realizada com sucesso! ✅</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>URL</b> : <code>${url}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a><b>QUANTIDADE DE LOGS</b> : <code>${result}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a><b>SALDO</b> : <code>${user.balance.toFixed(2)}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Plano</b> : <code> ${user.subscription.plan}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Status</b> : <code> ${user.subscription.status}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>LOGINS</b>: <code>${formatTotal}</code>
`;
        return caption;
    }

    async userNotbalance(userID, url) {
        let totalUsers = await countTotalUsers();
        let formatTotal = formatNumber(totalUsers)
        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Opa amigão é nescessario ter creditos para desfrutar deste comando! favor realize uma recarga!</i>\n
<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Chame algum de nossos adm a baixo !!</i>
<a href="${process.env.CHANNEL_LINK}">安 </a> » <i> @TODORIKOBINS </i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>URL</b> : <code>${url}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a><b>SALDO</b> : <code>${user.balance.toFixed(2)}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Plano</b> : <code> ${user.subscription.plan}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Status</b> : <code> ${user.subscription.status}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>LOGINS</b>: <code>${formatTotal}</code>

`;
        return caption;
    }

    async pwd(userID, result) {
        let totalUsers = await countTotalUsers();
        let formatTotal = formatNumber(totalUsers);
        
        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Consulta realizada com sucesso! ✅</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>URL</i> : <code>${result.url}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>USER</i> : <code>${result.user}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>PASS</i> : <code>${result.pass}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>SALDO</i> : <i>${user.balance.toFixed(2)}</i>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Plano</b> : <code> ${user.subscription.plan}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Status</b> : <code> ${user.subscription.status}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>LOGINS</b>: <code>${formatTotal}</code>
`;
        return caption;
    }

    async chk(userID, gg, result) {

        console.log(result)
        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Validação realizada com sucesso! ✅</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>CC</i> : <code>${gg}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>RESULTADO</i> : <code>${result.resultDetailing}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>CODE</i> : <code>${result.resultHint}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>SALDO</i> : <i>${user.balance.toFixed(2)}</i>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Plano</b> : <code> ${user.subscription.plan}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Status</b> : <code> ${user.subscription.status}</code>

`;
        return caption;
    }

    async chkFalse(userID, gg, result) {

        console.log(result)
        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Validação realizada com sucesso! ❌</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>CC</i> : <code>${gg}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>RESULTADO</i> : <code>${result.resultMessage}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>CODE</i> : <code>${result.resultCode}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>SALDO</i> : <i>${user.balance.toFixed(2)}</i>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Plano</b> : <code> ${user.subscription.plan}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Status</b> : <code> ${user.subscription.status}</code>

`;
        return caption;
    }

    async email(userID, total, email) {
        let totalUsers = await countTotalUsers();
        let formatTotal = formatNumber(totalUsers)
        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
            user
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Consulta realizada com sucesso! ✅</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>USER</b> : <code>${email}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>QUANTIDADE DE LOGS</b> : <code>${total}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>SALDO</b> : <code>${user.balance.toFixed(2)}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Plano</b> : <code> ${user.subscription.plan}</code>
<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>Status</b> : <code> ${user.subscription.status}</code>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>LOGINS</b>: <code>${formatTotal}</code>
`;
        return caption;
    }

    async faq(userID) {
        let totalUsers = await countTotalUsers();
        let formatTotal = formatNumber(totalUsers);

        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
            user
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>⚠ PERGUNTAS FREQUENTES!</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>Sobre o Nosso Bot</i>\n<i>Oferecemos um serviço de consulta e para conseguir logins da plataforma que voce preferir! seguro e anônimo por meio de banco de dados privados!.</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>Como Funciona?</i>\n<i>Aperte em comandos para saber mais!.</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <i>Termos de Uso</i> : <i>Ao usar o bot, você aceita nossos termos. Abusos podem levar a penalidades como bloqueio ou redução de saldo. Não nos responsablizamos por o uso  em atividades ilegais. Reembolsos só são possíveis se o bot tiver algum erro, é nescessario prints sem borrar nada, e não garantimos logins sem segurança, consulte a plataforma da qual voce deseja o login, não garantimos live!.</i>

<a href="${process.env.CHANNEL_LINK}">↳ </a> <b>LOGINS</b>: <code>${formatTotal}</code>
`;
        return caption;
    }

    async req(userID) {

        let user = await UserRepository.findUser(userID.id);
        if (!user) {
            user = await UserRepository.saveUser(userID.first_name, userID.id, userID.username, 0);
            user
        }

        let caption = `<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Olá ${userID.first_name}, nescessita realizar uma recarga?</i>

<a href="${process.env.CHANNEL_LINK}">安 </a> » <i>Chame nosso adm a baixo !!</i>
<a href="${process.env.CHANNEL_LINK}">安 </a> » <i> @${process.env.OWNER_USER}</i>
`;
        return caption;
    }
};

export default new responseMessages