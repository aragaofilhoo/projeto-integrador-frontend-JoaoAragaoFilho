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
