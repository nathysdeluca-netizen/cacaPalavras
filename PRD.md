# PRD — cacaPalavras

**Data:** 2026-10-29  
**Status:** Rascunho consolidado para validação  
**Produto:** Jogo casual de adivinhação e descoberta de palavras  
**Plataforma:** Web responsiva (computadores e celulares)  
**Idioma inicial:** Português brasileiro (pt-BR)

## 1. Resumo do produto

cacaPalavras é um jogo web casual, gratuito e acolhedor, que reúne quatro modos de jogos de palavras em uma interface responsiva: Termo, Charadas, Palavra Misteriosa e Caça-palavras em grade. A experiência deve ser fácil de começar, adequada a partidas curtas e utilizável sem cadastro. O progresso e as estatísticas ficam salvos localmente no navegador.

A identidade visual escolhida é **Céu Encantado**: céu noturno pastel, lua, estrelas, nuvens suaves, cartões arredondados e pequenos detalhes decorativos. Os elementos decorativos não podem prejudicar a leitura, a interação ou a acessibilidade.

## 2. Problema e oportunidade

Pessoas que querem jogar casualmente podem preferir desafios rápidos e variados sem precisar instalar um aplicativo, criar uma conta ou aprender regras complexas. Um único site com modos distintos permite experimentar dedução, vocabulário e busca visual a partir de uma navegação consistente.

## 3. Objetivos

- Permitir que uma pessoa comece uma partida em poucos passos.
- Oferecer quatro modos com regras compreensíveis e feedback claro.
- Ajustar a dificuldade para diferentes níveis de experiência.
- Organizar palavras por temas, como animais, natureza, alimentos e objetos.
- Salvar preferências e estatísticas no dispositivo, sem cadastro.
- Funcionar em telas pequenas e grandes.
- Projetar acessibilidade desde o início, incluindo operação por teclado.

### Fora dos objetivos da primeira versão

- Contas, autenticação e sincronização na nuvem.
- Multijogador online e rankings globais.
- Monetização, anúncios e compras.
- Aplicativo nativo para Android/iOS.
- Editor público de palavras ou conteúdo enviado por usuários.
- Desafios diários com sincronização entre dispositivos.

## 4. Público-alvo e contexto de uso

Pessoas que gostam de jogos casuais, vocabulário e pequenos desafios; podem jogar por alguns minutos em intervalos, em casa ou no transporte. A experiência deve ser amigável para iniciantes, sem pressupor conhecimento avançado de jogos de palavras.

## 5. Princípios de experiência

1. **Começar rápido:** os modos devem estar visíveis na página inicial.
2. **Regras claras:** cada modo explica objetivo, entradas permitidas e condição de vitória.
3. **Feedback útil:** indicar acertos, erros, tentativas restantes e resultado sem depender só da cor.
4. **Sem punições excessivas:** reiniciar uma partida deve ser simples e a dificuldade deve ser selecionável.
5. **Acessibilidade real:** suporte a teclado, foco visível, rótulos acessíveis e contraste suficiente.
6. **Visual decorativo, não obstrutivo:** estrelas, lua e nuvens são complementos e não devem competir com o conteúdo.

## 6. Funcionalidades e requisitos

### RF-01 — Página inicial
- Exibir nome/logo, breve descrição e cartões dos quatro modos.
- Cada cartão deve conter nome, explicação curta e botão claro para jogar.
- Oferecer acesso a estatísticas e configurações básicas.
- Adaptar a organização para celular, tablet e desktop.

**Aceitação:** todos os quatro modos podem ser alcançados a partir da página inicial; o layout não exige rolagem horizontal em largura móvel comum.

### RF-02 — Modo Termo
- O jogador deve descobrir uma palavra secreta por meio de tentativas.
- Cada tentativa deve ter o mesmo número de letras que a palavra-alvo.
- Após uma tentativa válida, mostrar quais letras estão corretas na posição certa, presentes em outra posição ou ausentes.
- Diferenciar letras repetidas corretamente, sem marcar mais ocorrências do que existem na resposta.
- Não aceitar palavras que não estejam no dicionário de respostas válidas.
- Exibir tentativas restantes, estado de vitória/derrota e opção de nova partida.

**Regra inicial proposta:** palavra de 5 letras e até 6 tentativas, configuráveis por dificuldade se isso não complicar a interface. Palavras com acentos devem ser tratadas de forma consistente; a regra exata de normalização será documentada nas especificações técnicas.

**Aceitação:** palavras inválidas não consomem tentativa; cada tentativa válida recebe feedback por posição; o jogo termina ao acertar ou esgotar tentativas.

### RF-03 — Modo Charadas
- Exibir uma charada e um campo para responder.
- Permitir envio por botão e pela tecla Enter.
- Normalizar espaços externos e diferenças entre maiúsculas/minúsculas; a comparação de acentos será consistente e definida em SPECS.md.
- Informar se a resposta está correta e permitir revelar a resposta após desistência ou fim das tentativas.
- Disponibilizar opção para próxima charada.

**Regra inicial proposta:** até 3 tentativas por charada; sem penalidade por usar o botão de revelar resposta, apenas registrar a rodada como não resolvida.

### RF-04 — Modo Palavra Misteriosa
- Apresentar uma palavra embaralhada e permitir que o jogador tente reconstruí-la.
- Oferecer dica opcional relacionada ao tema.
- Validar a resposta ignorando capitalização e espaços acidentais nas extremidades.
- Indicar acerto, erro e opção de tentar novamente ou passar para a próxima palavra.

**Regra inicial proposta:** uma palavra por rodada, com limite de tentativas configurável pela dificuldade.

### RF-05 — Caça-palavras em grade
- Gerar uma grade com palavras selecionadas por tema e dificuldade.
- Exibir a lista das palavras a encontrar.
- Permitir selecionar palavras por mouse/toque e fornecer alternativa de teclado acessível.
- Destacar palavras encontradas e atualizar o progresso.
- Oferecer feedback quando uma seleção não corresponde a uma palavra válida.

**Regra inicial proposta:** grades pequenas na dificuldade fácil, médias na normal e maiores na difícil. A geração deve evitar palavras impossíveis, palavras duplicadas e listas que não correspondam à grade.

### RF-06 — Dificuldade
- Disponibilizar pelo menos Fácil, Normal e Difícil.
- A dificuldade deve alterar parâmetros relevantes de cada modo, e não apenas o rótulo.
- Explicar brevemente o efeito de cada nível.

### RF-07 — Temas de palavras
- Disponibilizar categorias iniciais como Animais, Natureza, Alimentos, Objetos e Variados.
- Exibir o tema ativo antes ou durante a partida.
- Se um tema não tiver conteúdo suficiente para gerar uma rodada válida, apresentar mensagem clara e oferecer outro tema.

### RF-08 — Estatísticas
- Registrar localmente partidas jogadas, vitórias/resoluções, taxa de sucesso e sequência de acertos, quando aplicável.
- Separar estatísticas por modo e dificuldade.
- Permitir limpar as estatísticas com confirmação.
- Nunca apresentar estatísticas como sincronizadas entre dispositivos.

### RF-09 — Persistência local
- Salvar estatísticas e preferências no navegador, preferencialmente via localStorage.
- Tratar ausência de dados, dados inválidos e falha de armazenamento sem quebrar a aplicação.
- Informar que limpar os dados do navegador pode apagar o progresso.
- Não coletar nem transmitir dados pessoais.

### RF-10 — Acessibilidade
- Todo recurso funcional deve ser operável por teclado, salvo interação espacial essencial; nesse caso, oferecer alternativa acessível.
- Manter foco visível e ordem de navegação lógica.
- Usar estrutura semântica, rótulos para campos e mensagens de estado anunciáveis por tecnologia assistiva.
- Não usar cor como único meio de transmitir acerto/erro.
- Respeitar ampliação de texto e telas estreitas.
- Seguir WCAG 2.2 nível AA como objetivo de projeto, sujeito a verificação.

### RF-11 — Feedback e estados
- Cobrir estados de carregamento, resposta inválida, vitória, derrota, ausência de conteúdo e erro de persistência.
- Evitar animações essenciais para compreender o resultado.
- Respeitar `prefers-reduced-motion`.

## 7. Requisitos não funcionais

- **Responsividade:** layout funcional em celular, tablet e desktop.
- **Desempenho:** interface inicial leve, sem dependência obrigatória de serviços externos.
- **Privacidade:** nenhuma conta ou envio de dados pessoais na primeira versão.
- **Compatibilidade:** navegadores modernos com suporte a HTML, CSS e JavaScript atuais.
- **Manutenibilidade:** separar regras dos modos, dados de palavras, componentes visuais e persistência.
- **Confiabilidade:** validar entradas e proteger a aplicação contra dados locais corrompidos.
- **Acessibilidade:** buscar WCAG 2.2 AA, com testes manuais de teclado e revisão de contraste.

## 8. Direção visual

**Conceito:** Céu Encantado.

- Fundo em azul-lavanda ou azul-noite suave, com gradientes discretos.
- Cartões claros, cantos arredondados e sombras leves.
- Lua, estrelas e nuvens como ornamentos; preferir CSS/SVG simples e decorativos.
- Tipografia legível, com hierarquia visual evidente.
- Botões com área de toque confortável e estados hover, focus, active e disabled.
- As cores de estado dos jogos devem ter contraste adequado e sempre vir acompanhadas de texto, símbolos ou rótulos.
- Evitar fundos carregados atrás de texto e excesso de movimento.

## 9. Métricas de sucesso para testes locais

- Uma pessoa nova consegue iniciar qualquer modo sem ajuda.
- Regras e estados finais são compreendidos durante teste de uso.
- Nenhum modo depende exclusivamente de mouse ou de cor.
- Estatísticas permanecem após atualizar ou reabrir o navegador no mesmo perfil.
- Não há erros críticos de console nos fluxos principais.
- Os quatro modos passam pelos seus critérios de aceitação essenciais.

## 10. Riscos e mitigação

- **Banco de palavras insuficiente:** começar com conjuntos revisados e validar tamanho/tema antes de iniciar.
- **Ambiguidade de acentos:** documentar e testar normalização para português brasileiro.
- **Palavras repetidas no Termo:** implementar algoritmo de avaliação em duas passagens.
- **Seleção difícil no caça-palavras:** oferecer alternativa de teclado e alvos adequados para toque.
- **Estética pastel com baixo contraste:** verificar contraste real, escurecendo texto quando necessário.
- **Perda de dados locais:** explicar o escopo local e tratar falhas sem travar o jogo.

## 11. Critérios de aceite do MVP

- A página inicial apresenta e abre os quatro modos.
- Termo aplica feedback correto, inclusive com letras repetidas.
- Charadas aceita respostas válidas e informa o resultado.
- Palavra Misteriosa embaralha e valida a palavra.
- Caça-palavras apresenta uma grade jogável e lista de palavras encontráveis.
- Os níveis de dificuldade e os temas afetam a geração do conteúdo.
- Estatísticas e preferências persistem localmente.
- Interface responde a diferentes tamanhos de tela.
- Fluxos essenciais são utilizáveis por teclado e estados são comunicados sem depender apenas da cor.
- Há instruções de execução local e testes documentados.

## 12. Decisões pendentes para validação

As regras acima são propostas iniciais para permitir o planejamento. Antes de uma versão final, validar:
- se Termo deve usar palavra diária ou partidas ilimitadas;
- se o jogo deve incluir som;
- se haverá botão de dica em Charadas e Palavra Misteriosa;
- o tamanho exato das grades por dificuldade;
- se o botão de revelar resposta afeta as estatísticas;
- se haverá tema claro/escuro alternativo além do tema Céu Encantado.

## 13. Fontes de referência

- W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*: https://www.w3.org/TR/WCAG22/
- W3C WAI, *Accessibility Principles*: https://www.w3.org/WAI/fundamentals/accessibility-principles/
- Mark R. Johnson, *Casual Games Before Casual Games: Historicizing Paper Puzzle Games in an Era of Digital Play*: https://doi.org/10.1177/1555412018790423

As referências informam princípios gerais de acessibilidade e design de jogos casuais; as regras específicas do cacaPalavras são decisões de produto propostas neste documento.
