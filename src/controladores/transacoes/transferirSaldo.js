const dados = require("../../bancodedados");
const formatarData = require("../../datas/formatarData");

const transferirSaldo = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem)
    return res
      .status(400)
      .json({ mensagem: "O número da conta de origem deve ser informado." });

  if (!numero_conta_destino)
    return res
      .status(400)
      .json({ mensagem: "O número da conta de destino deve ser informado." });

  if (!valor)
    return res
      .status(400)
      .json({ mensagem: "O valor da transferência deve ser informado." });

  if (!senha)
    return res.status(400).json({ mensagem: "A senha deve ser informada" });

  const contaOrigem = dados.contas.find((conta) => {
    return conta.numero === Number(numero_conta_origem);
  });

  if (!contaOrigem)
    return res.status(404).json({
      mensagem:
        "A conta de origem não pode ser encontrada com o número informado.",
    });

  const contaDestino = dados.contas.find((conta) => {
    return conta.numero === Number(numero_conta_destino);
  });

  if (!contaDestino)
    return res.status(404).json({
      mensagem:
        "A conta de destino não pode ser encontrada com o número informado.",
    });

  if (senha !== contaOrigem.usuario.senha)
    return res.status(401).json({ mensagem: "Senha incorreta." });

  if (valor > contaOrigem.saldo)
    return res.status(401).json({
      mensagem:
        "Não são permitidos transferências maiores do que o saldo em conta.",
    });

  contaOrigem.saldo -= valor;

  contaDestino.saldo += valor;

  let data = new Date();

  data = formatarData(data);

  const extratoTranferencia = {
    data,
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  dados.transferencias.push(extratoTranferencia);

  return res
    .status(200)
    .json({ mensagem: "Transferência realizado com sucesso" });
};

module.exports = transferirSaldo;
