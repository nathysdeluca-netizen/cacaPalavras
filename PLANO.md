# Plano inicial — cacaPalavras

**Data:** 2026-10-29  
**Status:** Planejamento inicial

## Etapa 1 — Preparação
- [x] Consolidar o PRD inicial com as respostas recebidas.
- [x] Definir a regra de documentação em AGENTS.md.
- [ ] Criar o repositório remoto GitHub `cacaPalavras` (requer autenticação/acesso ao GitHub).
- [ ] Validar as decisões pendentes do PRD.

## Etapa 2 — Protótipos
Criar três alternativas navegáveis para comparação:
1. **Céu minimalista:** navegação simples, foco nos jogos e poucos ornamentos.
2. **Céu kawaii:** cartões fofos, lua, nuvens e estrelas decorativas.
3. **Observatório noturno:** fundo mais escuro, constelações e cartões de alto contraste.

Avaliar cada alternativa por:
- clareza de navegação e regras;
- uso por teclado e leitores de tela;
- contraste, legibilidade e responsividade;
- consistência visual e facilidade de implementação.

Selecionar uma proposta após comparar os três protótipos.

## Etapa 3 — Especificação técnica
- Definir arquitetura e estrutura de pastas.
- Definir modelo de dados do banco de palavras e regras de normalização de texto.
- Especificar o algoritmo de feedback do Termo, inclusive letras repetidas.
- Especificar geração e validação da grade de caça-palavras.
- Especificar armazenamento local, migração e tratamento de erros.
- Definir testes unitários, de integração, responsividade e acessibilidade.

## Etapa 4 — Implementação
Ordem sugerida:
1. Estrutura compartilhada, design tokens e navegação.
2. Banco de palavras, normalização e persistência.
3. Termo.
4. Charadas.
5. Palavra Misteriosa.
6. Caça-palavras em grade.
7. Estatísticas, dificuldades e temas.
8. Revisão de acessibilidade e refinamento visual.

## Etapa 5 — Verificação
- Agente de conformidade: comparar implementação com cada requisito e critério de aceite do PRD.
- Agente de revisão de código: procurar erros, problemas de segurança, duplicação, acessibilidade e manutenção.
- Executar testes reais; registrar falhas e corrigir antes de declarar conclusão.

## Restrições de execução
Não foi confirmada nesta etapa uma conexão de escrita com GitHub nem a existência de agentes externos executáveis. Os papéis de especialista podem ser usados como revisões estruturadas, mas só devem ser descritos como agentes executados se houver execução real e resultados registrados.
