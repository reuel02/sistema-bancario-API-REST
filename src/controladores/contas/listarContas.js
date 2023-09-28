const dados = require("../../bancodedados");

const listarContas = async (req, res) => {
  const { senha_banco } = req.query;

  if (!senha_banco)
    return res.status(401).json({ mensagem: "A senha dever ser informada." });

  if (senha_banco !== dados.banco.senha)
    return res.status(401).json({ mensagem: "Senha incorreta." });

  return res.status(200).json(dados.contas);
};

module.exports = listarContas;
