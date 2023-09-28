const formatarData = (data) => {
    const opcoes = {
        timeZone: "America/Sao_Paulo"
    };

    const dataFormatada = data.toLocaleString("pt-BR", opcoes);
    return dataFormatada;
};

module.exports = formatarData;