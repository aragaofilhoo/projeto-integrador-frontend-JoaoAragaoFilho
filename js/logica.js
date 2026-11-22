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
