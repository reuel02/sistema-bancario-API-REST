const dados = require("../../bancodedados");

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  const conta = dados.contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!conta)
    return res
      .status(404)
      .json({
        mensagem:
          "Não foi encontrada nenhuma conta cadastrada com esse número de identificação.",
      });

  if (conta.saldo > 0)
    return res
      .status(400)
      .json({
        mensagem: "Não é permitido a exclusão de contas que possuam saldo.",
      });

  dados.contas = dados.contas.filter((conta) => {
    return conta.numero !== Number(numeroConta);
  });

  return res.status(200).json({ mensagem: "Conta excluída com sucesso" });
};

module.exports = excluirConta;
