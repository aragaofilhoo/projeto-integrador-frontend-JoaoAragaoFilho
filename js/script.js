const contasCadastradas = [
  { servico: "email",     tamanhoSenha: 8,  diasDesdeTroca: 200 },
  { servico: "banco",     tamanhoSenha: 16, diasDesdeTroca: 30  },
  { servico: "redeSocial", tamanhoSenha: 10, diasDesdeTroca: 120 },
  { servico: "trabalho",  tamanhoSenha: 12, diasDesdeTroca: 60  },
  { servico: "streaming", tamanhoSenha: 6,  diasDesdeTroca: 400 },
  { servico: "cofre",     tamanhoSenha: 24, diasDesdeTroca: 10  }
];

function calcularPontuacao(conta, diasLimite = 90) {
  const pontosTamanho = Math.min(conta.tamanhoSenha * 4, 60);

  const pontosTroca = conta.diasDesdeTroca <= diasLimite ? 40 : 0;

  return pontosTamanho + pontosTroca;
}

function classificarPontuacao(pontuacao) {
  if (pontuacao >= 90) {
    return "excelente";
  } else if (pontuacao >= 70) {
    return "boa";
  } else if (pontuacao >= 40) {
    return "atencao";
  } else {
    return "critica";
  }
}

calcularPontuacao({ servico: "teste", tamanhoSenha: 16, diasDesdeTroca: 30 });

calcularPontuacao({ servico: "teste", tamanhoSenha: 6, diasDesdeTroca: 400 });

calcularPontuacao({ servico: "teste", tamanhoSenha: 10, diasDesdeTroca: 120 }, 180);

classificarPontuacao(100);
classificarPontuacao(80);
classificarPontuacao(55);
classificarPontuacao(24);

const contasAnalisadas = contasCadastradas.map(function (conta) {
  const pontuacao = calcularPontuacao(conta);
  return {
    servico: conta.servico,
    pontuacao: pontuacao,
    faixa: classificarPontuacao(pontuacao)
  };
});

const contasEmRisco = contasAnalisadas.filter(function (item) {
  return item.faixa === "atencao" || item.faixa === "critica";
});

const somaPontuacoes = contasAnalisadas.reduce(function (acumulador, item) {
  return acumulador + item.pontuacao;
}, 0);

const mediaPontuacoes = somaPontuacoes / contasAnalisadas.length;
