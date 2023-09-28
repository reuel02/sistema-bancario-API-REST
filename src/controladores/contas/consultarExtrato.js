const dados = require("../../bancodedados");

const consultarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) return res.status(400).json({ "mensagem": "O numero da conta deve ser informado." });

    if (!senha) return res.status(400).json({ "mensagem": "A senha deve ser informada." });

    const conta = dados.contas.find((conta) => { return conta.numero === Number(numero_conta) });

    if (!conta) return res.status(404).json({ "mensagem": "Não foi encontrada nenhuma conta cadastrada com esse número de identificação." });

    if (senha !== conta.usuario.senha) return res.status(401).json({ "mensagem": "Senha incorreta." });

    const depositosConta = dados.depositos.filter((deposito) => { return deposito.numero_conta === numero_conta})

    const saquesConta = dados.saques.filter((saque) => { return saque.numero_conta === numero_conta});

    const transferenciasEnviadas = dados.transferencias.filter((transferencia) => { return transferencia.numero_conta_origem === numero_conta});

    const transferenciasRecebidas = dados.transferencias.filter((transferencia) => { return transferencia.numero_conta_destino === numero_conta})

    const extrato = {
        depositos: depositosConta,
        saques: saquesConta,
        transferenciasEnviadas,
        transferenciasRecebidas
    };


    return res.status(200).json(extrato);
};

module.exports = consultarExtrato;