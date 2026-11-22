/*
  ===== PLANEJAMENTO =====
  TEMA: Analisador de força de senhas (parte do Gerador de Senhas)

  ENTRADA:
    - O usuário informa, via prompt, o tamanho mínimo aceitável (de 4 a 64).
    - Depois, digita comandos/senhas em sequência até escrever "sair".

  PROCESSAMENTO:
    - Percorre uma lista de senhas de exemplo.
    - Classifica cada uma em fraca, media, forte ou muito forte.
    - Gera mensagem diferente por categoria (switch).
    - Calcula contador, média e maior tamanho.

  SAÍDA ESPERADA:
    - Frases no console (template literal).
    - Tabela de relatório (console.table).

  PSEUDOCÓDIGO:
    1. Pedir o tamanho mínimo e validar
    2. Para cada senha da lista:
    3.    Calcular o tamanho e classificar a força (if / else if / else)
    4.    Escolher a mensagem pela categoria (switch)
    5. Contar quantas atendem o mínimo e calcular média e maior tamanho
    6. Repetir pedindo senhas ao usuário até digitar "sair"
    7. Mostrar frases e console.table
*/

const senhasExemplo = [
  { nome: "senhaEmail",    tamanho: 8,  categoria: "email",  usaSimbolos: false },
  { nome: "senhaBanco",    tamanho: 16, categoria: "banco",  usaSimbolos: true  },
  { nome: "senhaRedeSocial", tamanho: 10, categoria: "social", usaSimbolos: false },
  { nome: "senhaTrabalho", tamanho: 12, categoria: "trabalho", usaSimbolos: true },
  { nome: "senhaStreaming", tamanho: 6, categoria: "streaming", usaSimbolos: false },
  { nome: "senhaCofre",    tamanho: 24, categoria: "banco",  usaSimbolos: true  }
];

const TAMANHO_MINIMO_PERMITIDO = 4;
const TAMANHO_MAXIMO_PERMITIDO = 64;

function pedirTamanhoMinimo() {
  const resposta = prompt(
    `Informe o tamanho mínimo aceitável de senha (${TAMANHO_MINIMO_PERMITIDO} a ${TAMANHO_MAXIMO_PERMITIDO}):`
  );

  if (resposta === null) {
    console.warn("Entrada cancelada. Usando valor padrão: 8.");
    return 8;
  }

  if (resposta.trim() === "") {
    console.warn("Nenhum valor digitado. Usando valor padrão: 8.");
    return 8;
  }

  const numero = Number(resposta);

  if (Number.isNaN(numero)) {
    console.warn("Isso não é um número. Usando valor padrão: 8.");
    return 8;
  }

  if (numero < TAMANHO_MINIMO_PERMITIDO || numero > TAMANHO_MAXIMO_PERMITIDO) {
    console.warn(`Valor fora da faixa (${TAMANHO_MINIMO_PERMITIDO} a ${TAMANHO_MAXIMO_PERMITIDO}). Usando valor padrão: 8.`);
    return 8;
  }

  return numero;
}

const tamanhoMinimo = pedirTamanhoMinimo();

function classificarForca(tamanho, usaSimbolos) {
  if (tamanho >= 16 && usaSimbolos === true) {
    return "muito forte";
  } else if (tamanho >= 12) {
    return "forte";
  } else if (tamanho >= 8) {
    return "media";
  } else {
    return "fraca";
  }
}

const relatorio = [];

for (const senha of senhasExemplo) {
  const forca = classificarForca(senha.tamanho, senha.usaSimbolos);
  relatorio.push({
    nome: senha.nome,
    tamanho: senha.tamanho,
    categoria: senha.categoria,
    forca: forca
  });
}

function dicaPorCategoria(categoria) {
  let dica;

  switch (categoria) {
    case "banco":
      dica = "Use senha longa e ative a verificação em duas etapas.";
      break;
    case "email":
      dica = "Seu e-mail recupera outras contas: proteja muito bem.";
      break;
    case "social":
      dica = "Evite reutilizar essa senha em outros sites.";
      break;
    case "trabalho":
      dica = "Siga a política de segurança da empresa.";
      break;
    default:
      dica = "Prefira uma senha única para este serviço.";
      break;
  }

  return dica;
}

let quantidadeAtendeMinimo = 0;  // contador
let somaTamanhos = 0;            // acumulador
let maiorTamanho = 0;            // máximo
let nomeMaiorSenha = "";

for (let i = 0; i < senhasExemplo.length; i++) {
  const senha = senhasExemplo[i];

  if (senha.tamanho >= tamanhoMinimo) {
    quantidadeAtendeMinimo++;
  }

  somaTamanhos += senha.tamanho;

  if (senha.tamanho > maiorTamanho) {
    maiorTamanho = senha.tamanho;
    nomeMaiorSenha = senha.nome;
  }
}

const mediaTamanhos = somaTamanhos / senhasExemplo.length;

const senhasDigitadas = [];
let entrada;

do {
  entrada = prompt('Digite uma senha para testar (ou "sair" para encerrar):');

  if (entrada === null) {
    entrada = "sair";
  }

  entrada = entrada.trim();

  if (entrada !== "" && entrada.toLowerCase() !== "sair") {
    senhasDigitadas.push({
      nome: `digitada${senhasDigitadas.length + 1}`,
      tamanho: entrada.length,
      categoria: "digitada",
      forca: classificarForca(entrada.length, /[^a-zA-Z0-9]/.test(entrada))
    });
  }
} while (entrada.toLowerCase() !== "sair");

console.log("===== ANÁLISE DE SENHAS =====");

for (const item of relatorio) {
  console.log(
    `A ${item.nome} (${item.categoria}) tem ${item.tamanho} caracteres e é ${item.forca}. ${dicaPorCategoria(item.categoria)}`
  );
}

console.log(`Tamanho mínimo escolhido: ${tamanhoMinimo}`);
console.log(`Senhas que atendem o mínimo: ${quantidadeAtendeMinimo} de ${senhasExemplo.length}`);
console.log(`Média de tamanho: ${mediaTamanhos.toFixed(1)} caracteres`);
console.log(`Maior senha: ${nomeMaiorSenha} com ${maiorTamanho} caracteres`);

console.table(relatorio);

if (senhasDigitadas.length > 0) {
  console.log("===== SENHAS DIGITADAS POR VOCÊ =====");
  console.table(senhasDigitadas);
}

/*
  ===== TESTE DE MESA (laço principal, tamanhoMinimo = 8) =====

  Volta | i | senha.nome      | tamanho | atende (>= 8)? | contador | soma | maiorTamanho
  ------|---|-----------------|---------|----------------|----------|------|-------------
  início| - | -               | -       | -              | 0        | 0    | 0
  1     | 0 | senhaEmail      | 8       | sim            | 1        | 8    | 8
  2     | 1 | senhaBanco      | 16      | sim            | 2        | 24   | 16
  3     | 2 | senhaRedeSocial | 10      | sim            | 3        | 34   | 16

  Conferido com o console: os valores finais batem com a tabela e
  com as frases exibidas.
*/
