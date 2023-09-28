const dados = require("../../bancodedados");
const formatarData = require("../datas/formatarData");

const depositarSaldo = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) return res.status(400).json({ "mensagem": "O numero da conta deve ser informado."});

    if (!valor) return res.status(400).json({ "mensagem": "O valor do depósito deve ser informado."});

    const conta = dados.contas.find((conta) => { return conta.numero === Number(numero_conta) });

    if (!conta) return res.status(404).json({ "mensagem": "Não foi encontrada nenhuma conta cadastrada com esse número de identificação." });

    if(valor === 0 || valor < 0) return res.status(404).json({ "mensagem": "Não são permitidos depósitos com valores negativos ou zerados." });

    conta.saldo += valor;

    let data = new Date();

    data = formatarData(data);

    const extratoDeposito = {
        data,
        numero_conta,
        valor
    };

    dados.depositos.push(extratoDeposito);

    res.status(200).json({ "mensagem": "Depósito realizado com sucesso." });
};

module.exports = depositarSaldo;
