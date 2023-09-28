const dados = require("../../bancodedados");

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = dados.contas.find((conta) => { return conta.numero === Number(numeroConta) });

    if (!conta) return res.status(404).json({ "mensagem": "Não foi encontrada nenhuma conta cadastrada com esse número de identificação." });

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) return res.status(400).json({ "mensagem": "Algum dos dados devem ser informados para realizar a atualização." });

    const cpfUnico = dados.contas.find((conta) => { return conta.usuario.cpf === cpf });

    if (cpfUnico) return res.status(400).json({ "mensagem": "O CPF informado já está cadastrado."});

    const emailUnico = dados.contas.find((conta) => { return conta.usuario.email === email });

    if (emailUnico) return res.status(400).json({ "mensagem": "O email informado já está cadastrado."});

    if (nome) conta.usuario.nome = nome;

    if (email) conta.usuario.email = email;

    if (cpf) conta.usuario.cpf = cpf;

    if (data_nascimento) conta.usuario.data_nascimento = data_nascimento;

    if (telefone) conta.usuario.telefone = telefone;
    
    if (senha) conta.usuario.senha = senha;

    return res.status(201).json({ "mensagem": "Conta atualizada com sucesso." });
};

module.exports = atualizarUsuario;