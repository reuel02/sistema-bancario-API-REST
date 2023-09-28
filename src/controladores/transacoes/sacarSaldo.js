const dados = require("../../bancodedados");
const formatarData = require("../../datas/formatarData");

const sacarSaldo = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta)
    return res
      .status(400)
      .json({ mensagem: "O numero da conta deve ser informado." });

  if (!valor)
    return res
      .status(400)
      .json({ mensagem: "O valor do saque deve ser informado." });

  if (!senha)
    return res.status(400).json({ mensagem: "A senha deve ser informada" });

  const conta = dados.contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!conta)
    return res.status(404).json({
      mensagem:
        "Não foi encontrada nenhuma conta cadastrada com esse número de identificação.",
    });

  if (senha !== conta.usuario.senha)
    return res.status(401).json({ mensagem: "Senha incorreta." });

  if (valor > conta.saldo)
    return res.status(401).json({
      mensagem: "Não são permitidos saques maiores do que o saldo em conta.",
    });

  conta.saldo -= valor;

  let data = new Date();

  data = formatarData(data);

  const extratoSaque = {
    data,
    numero_conta,
    valor,
  };

  dados.saques.push(extratoSaque);

  return res.status(200).json({ mensagem: "Saque realizado com sucesso." });
};

module.exports = sacarSaldo;
