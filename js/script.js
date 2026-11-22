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

const ordenadasPorPontuacao = [...contasAnalisadas].sort(function (a, b) {
  return b.pontuacao - a.pontuacao;
});

const listaSenhas = document.querySelector("#lista-senhas");
const areaResumo = document.querySelector("#resumo");

if (listaSenhas === null || areaResumo === null) {
  console.error("Elemento #lista-senhas ou #resumo não encontrado no HTML.");
}

if (listaSenhas !== null && areaResumo !== null) {
}

function criarElementoConta(item) {
  const li = document.createElement("li");
  li.textContent = `${item.servico}: ${item.pontuacao} pontos (${item.faixa})`;
  return li;
}

function mostrarLista(itens, destino) {
  for (const item of itens) {
    const elemento = criarElementoConta(item);
    destino.append(elemento);
  }
}

function criarElementoConta(item) {
  const li = document.createElement("li");
  li.textContent = `${item.servico}: ${item.pontuacao} pontos (${item.faixa})`;
  li.classList.add("conta");
  li.classList.add(item.faixa);
  return li;
}

function calcularResumo(itens) {
  const total = itens.reduce(function (acc, item) {
    return acc + item.pontuacao;
  }, 0);

  const emRisco = itens.reduce(function (acc, item) {
    const precisaAtencao = item.faixa === "atencao" || item.faixa === "critica";
    return precisaAtencao ? acc + 1 : acc;
  }, 0);

  return {
    quantidade: itens.length,
    media: total / itens.length,
    emRisco: emRisco
  };
}

function formatarResumo(resumo) {
  return `${resumo.quantidade} contas analisadas. Média: ${resumo.media.toFixed(1)} pontos. Em risco: ${resumo.emRisco}.`;
}

areaResumo.textContent = formatarResumo(calcularResumo(contasAnalisadas));