let dadosJogadores;
let campo;

function lerCampo() {
    const objCampo = lerCampoSessionStorage();
    const camp = {};

    for (let localCampo in objCampo) {
        if (objCampo[localCampo] !== 0) {
            camp[localCampo] = objCampo[localCampo];
        }
    }

    return camp;
}

function lerCampoSessionStorage() {
    const storageItem = sessionStorage.getItem('situacaoCampo');
    if (storageItem != null) {
        return JSON.parse(sessionStorage.getItem('situacaoCampo'));
    } else {
        return null;
    }
}

function ordenarJogadores(jogadores) {
    const ordemPrioridades = {
        atacante: 0,
        meio: 1,
        lateralD: 2,
        zagueiro: 3,
        lateralE: 4,
        goleiro: 5,
    };

    return jogadores.sort((a, b) => {
        let pa = ordemPrioridades[a.posicao];
        let pb = ordemPrioridades[b.posicao];
        // Se as prioridades forem iguais, tanto faz
        if (pa === pb) return 0;
        // Se a prioridade o jogador 1 for maior que a do jogador 2, o jogador 1 vem na frente
        if (pa > pb) return -1;
        // Se a prioridade do jogador 1 for menor que a do jogador 2, o jogador 2 vem na frente
        if (pa < pb) return 1;
    });
}

function obterJogadoresEmCampo() {
    const jogadoresEmCampo = dadosJogadores.filter((j) =>
        Object.values(campo).includes(j.id)
    );

    return ordenarJogadores(jogadoresEmCampo);
}

function criarCardJogador(jogador) {
    const dictPosicoes = {
        goleiro: 'Goleiro',
        lateralE: 'Lateral Esquerda',
        zagueiro: 'Zagueiro',
        lateralD: 'Lateral Direita',
        meio: 'Meio',
        atacante: 'Atacante',
    };
    const estruturaCard = `
        <img
            class="jogador-foto"
            src="${jogador.foto}"
            alt=""
        />
        <div class="jogador-info">
            <span class="jogador-nome">${jogador.nome}</span>
            <span class="jogador-posicao">${
                dictPosicoes[jogador.posicao]
            }</span>
        </div>
    `;

    const card = document.createElement('div');
    card.classList.add('jogador-card');
    card.innerHTML = estruturaCard;
    const parent = document.querySelector('.container-jogadores .container');
    parent.appendChild(card);
}

function carregarCards() {
    const jogadoresEmCampo = obterJogadoresEmCampo();
    if (jogadoresEmCampo.length === 0) {
        mostrarTimeVazio();
    } else {
        jogadoresEmCampo.forEach(criarCardJogador);
    }
}

async function lerJogadoresJSON() {
    return await fetch('js/jogadores.json').then((response) => response.json());
}

async function load() {
    // lendo valores fora do arquivo
    dadosJogadores = await lerJogadoresJSON();
    campo = lerCampo();

    // botao voltar
    const btnVoltar = document.querySelector('#btnVoltar');
    btnVoltar.addEventListener('click', () => {
        location.href = 'campo.html';
    });

    carregarCards();
}

load();
