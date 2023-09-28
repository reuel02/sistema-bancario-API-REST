const dados = require("../../bancodedados");

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) return res.status(400).json({ "mensagem": "O numero da conta deve ser informado." });

    if (!senha) return res.status(400).json({ "mensagem": "A senha deve ser informada." });

    const conta = dados.contas.find((conta) => { return conta.numero === Number(numero_conta) });

    if (!conta) return res.status(404).json({ "mensagem": "Não foi encontrada nenhuma conta cadastrada com esse número de identificação." });

    if (senha !== conta.usuario.senha) return res.status(401).json({ "mensagem": "Senha incorreta." });

    const saldo = {
        saldo: conta.saldo
    };

    return res.status(200).json(saldo);
};

module.exports = consultarSaldo;