
const $ = (seletor) => document.querySelector(seletor);

const modal = $('#modal');
const area = $('#area-jogo');
const mensagem = $('#mensagem');

const palavras = {
  variados: ['NUVEM', 'LIVRO', 'ESTRELA', 'JANELA', 'PLANETA', 'PIPOCA', 'FLORESTA'],
  natureza: ['FLORESTA', 'NUVEM', 'ESTRELA', 'PLANETA', 'OCEANO', 'FOLHA', 'JARDIM'],
  animais: ['GATOS', 'COELHO', 'CAVALO', 'ABELHA', 'PANDA', 'TIGRE'],
  alimentos: ['PIPOCA', 'BANANA', 'CEREJA', 'BISCOITO', 'MORANGO'],
  objetos: ['JANELA', 'ESPELHO', 'CADERNO', 'CANETA', 'MOCHILA']
};

const charadas = [
  { pergunta: 'Brilho no céu à noite e pareço ter várias pontas. O que sou?', resposta: 'ESTRELA' },
  { pergunta: 'Tenho páginas e guardo muitas histórias. O que sou?', resposta: 'LIVRO' },
  { pergunta: 'Flutuo no céu e às vezes trago chuva. O que sou?', resposta: 'NUVEM' },
  { pergunta: 'Tenho pétalas e posso deixar um jardim colorido. O que sou?', resposta: 'FLOR' },
  { pergunta: 'Apareço no céu depois da chuva com várias cores. O que sou?', resposta: 'ARCOIRIS' }
];

function normalizar(texto) {
  return texto.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

function lerDados(chave, padrao) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || padrao;
  } catch {
    return padrao;
  }
}

let estatisticas = lerDados('ceuPalavrasStats', {
  partidas: 0,
  vitorias: 0
});

let preferencias = lerDados('ceuPalavrasPrefs', {
  dificuldade: 'normal',
  categoria: 'variados'
});

let jogoAtual = '';
let respostaAtual = '';
let tentativas = 0;
let finalizado = false;
let letrasSelecionadas = [];

function salvarEstatisticas() {
  try {
    localStorage.setItem('ceuPalavrasStats', JSON.stringify(estatisticas));
  } catch {}
  atualizarEstatisticas();
}

function atualizarEstatisticas() {
  $('#partidas').textContent = estatisticas.partidas;
  $('#vitorias').textContent = estatisticas.vitorias;

  const porcentagem = estatisticas.partidas
    ? Math.round(estatisticas.vitorias / estatisticas.partidas * 100)
    : 0;

  $('#porcentagem').textContent = `${porcentagem}%`;
}

function salvarPreferencias() {
  try {
    localStorage.setItem('ceuPalavrasPrefs', JSON.stringify(preferencias));
  } catch {}
}

function sortearPalavra() {
  const lista = palavras[preferencias.categoria] || palavras.variados;

  const limite = preferencias.dificuldade === 'facil'
    ? 6
    : preferencias.dificuldade === 'dificil'
      ? 9
      : 8;

  const disponiveis = lista.filter(palavra => palavra.length <= limite);
  return disponiveis[Math.floor(Math.random() * disponiveis.length)] || 'NUVEM';
}

function abrirJogo(tipo) {
  jogoAtual = tipo;
  tentativas = 0;
  finalizado = false;
  letrasSelecionadas = [];
  mensagem.textContent = '';
  area.innerHTML = '';

  const titulos = {
    termo: 'Termo',
    charadas: 'Charadas',
    misteriosa: 'Palavra Misteriosa',
    caca: 'Caça-palavras'
  };

  $('#titulo-jogo').textContent = titulos[tipo];

  if (tipo === 'termo') iniciarTermo();
  if (tipo === 'charadas') iniciarCharadas();
  if (tipo === 'misteriosa') iniciarMisteriosa();
  if (tipo === 'caca') iniciarCacaPalavras();

  if (!modal.open) modal.showModal();
}

function terminarJogo(venceu, texto) {
  if (finalizado) return;

  finalizado = true;
  estatisticas.partidas++;

  if (venceu) estatisticas.vitorias++;

  salvarEstatisticas();
  mensagem.textContent = texto;

  const novamente = document.createElement('button');
  novamente.className = 'game-action';
  novamente.textContent = 'Jogar novamente';
  novamente.type = 'button';
  novamente.style.marginTop = '10px';
  novamente.addEventListener('click', () => abrirJogo(jogoAtual));

  area.append(novamente);
}

/* MODO TERMO */
function iniciarTermo() {
  respostaAtual = sortearPalavra();

  const maxTentativas = preferencias.dificuldade === 'facil'
    ? 7
    : preferencias.dificuldade === 'dificil'
      ? 5
      : 6;

  $('#descricao-jogo').textContent =
    `Descubra a palavra de ${respostaAtual.length} letras. Você tem ${maxTentativas} tentativas. Verde: posição correta; dourado: letra em outra posição.`;

  const grade = document.createElement('div');
  grade.className = 'guess-grid';

  for (let linha = 0; linha < maxTentativas; linha++) {
    const row = document.createElement('div');
    row.className = 'guess-row';

    for (let coluna = 0; coluna < respostaAtual.length; coluna++) {
      const celula = document.createElement('div');
      celula.className = 'guess-tile';
      row.append(celula);
    }

    grade.append(row);
  }

  const formulario = document.createElement('form');
  const entrada = document.createElement('input');
  entrada.className = 'game-input';
  entrada.placeholder = `${respostaAtual.length} letras`;
  entrada.maxLength = respostaAtual.length;
  entrada.required = true;
  entrada.autocomplete = 'off';
  entrada.setAttribute('aria-label', 'Digite sua tentativa');

  const botao = document.createElement('button');
  botao.className = 'game-action';
  botao.textContent = 'Conferir palavra';
  botao.type = 'submit';

  formulario.append(entrada, botao);
  area.append(grade, formulario);

  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    if (finalizado) return;

    const tentativa = normalizar(entrada.value);

    if (tentativa.length !== respostaAtual.length) {
      mensagem.textContent = `Digite uma palavra com ${respostaAtual.length} letras.`;
      return;
    }

    const letrasRestantes = respostaAtual.split('');
    const resultado = Array(tentativa.length).fill('miss');

    for (let i = 0; i < tentativa.length; i++) {
      if (tentativa[i] === respostaAtual[i]) {
        resultado[i] = 'hit';
        letrasRestantes[i] = null;
      }
    }

    for (let i = 0; i < tentativa.length; i++) {
      if (resultado[i] === 'hit') continue;

      const posicao = letrasRestantes.indexOf(tentativa[i]);

      if (posicao !== -1) {
        resultado[i] = 'near';
        letrasRestantes[posicao] = null;
      }
    }

    const linha = grade.children[tentativas];

    for (let i = 0; i < tentativa.length; i++) {
      const celula = linha.children[i];
      celula.textContent = tentativa[i];
      celula.classList.add(resultado[i]);
    }

    tentativas++;
    entrada.value = '';

    if (tentativa === respostaAtual) {
      terminarJogo(true, `Acertou! A palavra era ${respostaAtual}. ✨`);
    } else if (tentativas >= maxTentativas) {
      terminarJogo(false, `A palavra era ${respostaAtual}. Tente novamente!`);
    } else {
      mensagem.textContent = `Boa tentativa! Restam ${maxTentativas - tentativas} chances.`;
    }
  });
}

/* MODO CHARADAS */
function iniciarCharadas() {
  const charada = charadas[Math.floor(Math.random() * charadas.length)];
  respostaAtual = charada.resposta;

  const maxTentativas = preferencias.dificuldade === 'facil'
    ? 4
    : preferencias.dificuldade === 'dificil'
      ? 2
      : 3;

  $('#descricao-jogo').textContent =
    `Você tem ${maxTentativas} chances para responder.`;

  const caixa = document.createElement('div');
  caixa.className = 'riddle-box';
  caixa.textContent = `✧ ${charada.pergunta}`;

  const formulario = document.createElement('form');
  const entrada = document.createElement('input');
  entrada.className = 'game-input';
  entrada.placeholder = 'Sua resposta...';
  entrada.required = true;
  entrada.autocomplete = 'off';

  const botao = document.createElement('button');
  botao.className = 'game-action';
  botao.textContent = 'Responder';
  botao.type = 'submit';

  formulario.append(entrada, botao);
  area.append(caixa, formulario);

  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    if (finalizado) return;

    tentativas++;

    if (normalizar(entrada.value) === respostaAtual) {
      terminarJogo(true, 'Acertou! Você tem olhos de detetive. ✨');
    } else if (tentativas >= maxTentativas) {
      terminarJogo(false, `A resposta era ${respostaAtual}.`);
    } else {
      mensagem.textContent = `Ainda não! Restam ${maxTentativas - tentativas} chances.`;
      entrada.value = '';
    }
  });
}

/* MODO PALAVRA MISTERIOSA */
function iniciarMisteriosa() {
  respostaAtual = sortearPalavra();

  $('#descricao-jogo').textContent =
    'Clique nas letras na ordem em que deseja formar a palavra.';

  let letras = respostaAtual.split('');

  for (let i = letras.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letras[i], letras[j]] = [letras[j], letras[i]];
  }

  if (letras.join('') === respostaAtual && letras.length > 1) {
    [letras[0], letras[1]] = [letras[1], letras[0]];
  }

  const disponiveis = document.createElement('div');
  disponiveis.className = 'chips';

  const escolhidas = document.createElement('div');
  escolhidas.className = 'chips';

  const verificar = document.createElement('button');
  verificar.className = 'game-action';
  verificar.textContent = 'Conferir resposta';
  verificar.type = 'button';

  const limpar = document.createElement('button');
  limpar.className = 'game-action';
  limpar.textContent = 'Limpar';
  limpar.type = 'button';
  limpar.style.marginLeft = '7px';

  letras.forEach((letra, indice) => {
    const botao = document.createElement('button');
    botao.className = 'chip';
    botao.textContent = letra;
    botao.type = 'button';
    botao.dataset.indice = indice;

    botao.addEventListener('click', () => {
      if (finalizado || botao.disabled) return;

      botao.disabled = true;
      botao.style.opacity = '.35';

      const selecionada = document.createElement('button');
      selecionada.className = 'chip';
      selecionada.textContent = letra;
      selecionada.type = 'button';
      selecionada.dataset.indice = indice;
      escolhidas.append(selecionada);

      selecionada.addEventListener('click', () => {
        if (finalizado) return;
        botao.disabled = false;
        botao.style.opacity = '1';
        selecionada.remove();
      });
    });

    disponiveis.append(botao);
  });

  verificar.addEventListener('click', () => {
    if (finalizado) return;

    const resposta = [...escolhidas.children]
      .map(botao => botao.textContent)
      .join('');

    if (resposta.length !== respostaAtual.length) {
      mensagem.textContent = 'Escolha todas as letras antes de conferir.';
    } else if (resposta === respostaAtual) {
      terminarJogo(true, 'Perfeito! Você colocou tudo no lugar. ✨');
    } else {
      mensagem.textContent = 'Quase! Tente outra combinação.';
    }
  });

  limpar.addEventListener('click', () => {
    if (finalizado) return;

    escolhidas.innerHTML = '';
    disponiveis.querySelectorAll('button').forEach(botao => {
      botao.disabled = false;
      botao.style.opacity = '1';
    });
    mensagem.textContent = '';
  });

  area.append(
    document.createTextNode('Letras embaralhadas:'),
    disponiveis,
    document.createTextNode('Sua palavra:'),
    escolhidas,
    verificar,
    limpar
  );
}

/* MODO CAÇA-PALAVRAS */
function iniciarCacaPalavras() {
  const lista = (palavras[preferencias.categoria] || palavras.variados)
    .filter(palavra => palavra.length <= 5);

  respostaAtual = lista[Math.floor(Math.random() * lista.length)] || 'NUVEM';

  $('#descricao-jogo').textContent =
    `Encontre a palavra ${respostaAtual} na grade. Clique nas letras da esquerda para a direita, na mesma linha.`;

  const tamanho = 5;
  const celulas = Array(tamanho * tamanho).fill('');
  const linha = Math.floor(Math.random() * tamanho);
  const colunaMaxima = tamanho - respostaAtual.length;

  if (colunaMaxima < 0) {
    respostaAtual = 'LUA';
  }

  const coluna = Math.floor(Math.random() * (tamanho - respostaAtual.length + 1));

  for (let i = 0; i < respostaAtual.length; i++) {
    celulas[linha * tamanho + coluna + i] = respostaAtual[i];
  }

  const preenchimento = 'ESTRELANUVEMLIVROFLORCASA';

  for (let i = 0; i < celulas.length; i++) {
    if (!celulas[i]) {
      celulas[i] = preenchimento[Math.floor(Math.random() * preenchimento.length)];
    }
  }

  const grade = document.createElement('div');
  grade.className = 'word-grid';

  celulas.forEach((letra, indice) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = letra;
    botao.setAttribute('aria-label', `Letra ${letra}, posição ${indice + 1}`);

    botao.addEventListener('click', () => {
      if (finalizado) return;

      const ultima = letrasSelecionadas[letrasSelecionadas.length - 1];

      if (ultima && Math.floor(ultima.indice / tamanho) !== Math.floor(indice / tamanho)) {
        letrasSelecionadas = [];
        grade.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
      }

      if (botao.classList.contains('selected')) return;

      botao.classList.add('selected');
      letrasSelecionadas.push({ letra, indice, botao });

      const tentativa = letrasSelecionadas.map(item => item.letra).join('');

      if (tentativa === respostaAtual) {
        terminarJogo(true, `Encontrou ${respostaAtual}! Boa observação. ✨`);
      } else if (!respostaAtual.startsWith(tentativa)) {
        mensagem.textContent = 'Essa sequência não é a palavra. Tente novamente.';
        letrasSelecionadas.forEach(item => item.botao.classList.remove('selected'));
        letrasSelecionadas = [];
      }
    });

    grade.append(botao);
  });

  area.append(grade);
}

/* BOTÕES E PREFERÊNCIAS */
document.querySelectorAll('[data-game]').forEach(botao => {
  botao.addEventListener('click', () => abrirJogo(botao.dataset.game));
});

$('#fechar').addEventListener('click', () => modal.close());

modal.addEventListener('click', evento => {
  if (evento.target === modal) modal.close();
});

$('#dificuldade').value = preferencias.dificuldade;
$('#categoria').value = preferencias.categoria;

$('#dificuldade').addEventListener('change', evento => {
  preferencias.dificuldade = evento.target.value;
  salvarPreferencias();
});

$('#categoria').addEventListener('change', evento => {
  preferencias.categoria = evento.target.value;
  salvarPreferencias();
});

$('#resetar').addEventListener('click', () => {
  if (confirm('Quer mesmo reiniciar suas estatísticas?')) {
    estatisticas = { partidas: 0, vitorias: 0 };
    salvarEstatisticas();
  }
});

$('#tema').addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const escuro = document.body.classList.contains('dark');
  $('#tema').textContent = escuro ? '☾' : '☼';

  try {
    localStorage.setItem('ceuPalavrasDark', escuro ? '1' : '0');
  } catch {}
});

try {
  if (localStorage.getItem('ceuPalavrasDark') === '1') {
    document.body.classList.add('dark');
    $('#tema').textContent = '☾';
  }
} catch {}

atualizarEstatisticas();
