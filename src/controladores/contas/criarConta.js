const dados = require("../../bancodedados");

let numero = 1;

const criarConta = async (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome)
    return res.status(400).json({ mensagem: "O nome deve ser informado." });

  if (!cpf)
    return res.status(400).json({ mensagem: "O CPF deve ser informado." });

  if (!data_nascimento)
    return res
      .status(400)
      .json({ mensagem: "A data de nascimento deve ser informada." });

  if (!telefone)
    return res.status(400).json({ mensagem: "O telefone deve ser informado." });

  if (!email)
    return res.status(400).json({ mensagem: "O email deve ser informado." });

  if (!senha)
    return res.status(400).json({ mensagem: "A senha deve ser informada." });

  const cpfUnico = dados.contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  if (cpfUnico)
    return res
      .status(400)
      .json({ mensagem: "O CPF informado já está cadastrado." });

  const emailUnico = dados.contas.find((conta) => {
    return conta.usuario.email === email;
  });

  if (emailUnico)
    return res
      .status(400)
      .json({ mensagem: "O email informado já está cadastrado." });

  const cadastro = {
    numero: numero++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  dados.contas.push(cadastro);

  res.status(201).json(cadastro);
};

module.exports = criarConta;
