const express = require("express");
const listarContas = require("./controladores/contas/listarContas");
const criarConta = require("./controladores/contas/criarConta");
const atualizarUsuario = require("./controladores/contas/atualizarUsuario");
const excluirConta = require("./controladores/contas/excluirConta");
const depositarSaldo = require("./controladores/transacoes/depositarSaldo");
const sacarSaldo = require("./controladores/transacoes/sacarSaldo");
const transferirSaldo = require("./controladores/transacoes/transferirSaldo");
const consultarSaldo = require("./controladores/contas/consultarSaldo");
const consultarExtrato = require("./controladores/contas/consultarExtrato");

const rotas = express();

rotas.get("/contas", listarContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", atualizarUsuario);
rotas.delete("/contas/:numeroConta", excluirConta);
rotas.post("/transacoes/depositar", depositarSaldo);
rotas.post("/transacoes/sacar", sacarSaldo);
rotas.post("/transacoes/transferir", transferirSaldo);
rotas.get("/contas/saldo", consultarSaldo);
rotas.get("/contas/extrato", consultarExtrato);

module.exports = rotas;
