class Campo {
    constructor() {
        // objeto contem o ID dos jogadores que estão em cada posição no campo
        this.jogadoresEmCampo = {
            atacante0: 0,
            atacante1: 0,
            atacante2: 0,
            meio0: 0,
            meio1: 0,
            meio2: 0,
            zagueiro0: 0,
            zagueiro1: 0,
            lateralE0: 0,
            lateralD0: 0,
            goleiro0: 0,
        };
    }

    redefinirCampo() {
        const iconesJogadores = document.querySelectorAll('.jogador');
        iconesJogadores.forEach((j) => (j.style.backgroundImage = ''));
    }

    renderizarCampo() {
        for (let idLocalCampo in this.jogadoresEmCampo) {
            const idJogador = this.jogadoresEmCampo[idLocalCampo];
            const jogador = jogadores.find((j) => j.id === idJogador);
            if (jogador == undefined) continue;

            const localCampo = document.getElementById(idLocalCampo);
            localCampo.style.backgroundImage = `url("${jogador.foto}")`;
        }
    }

    adicionarJogador(jogador, localCampo) {
        this.jogadoresEmCampo[localCampo.id] = jogador.id;
    }
}

class MenuHandler {
    carregarMenu(localCampo) {
        const jogadoresArea = filtrarJogadorPorArea(localCampo.dataset.posicao);
        const jogadoresDisponiveis = removerJogadoresDuplicados(jogadoresArea);

        this.limparMenu();
        jogadoresDisponiveis.forEach((j) => criarCardJogador(j, localCampo));
    }

    abrirMenu() {
        document.querySelector('.lista-jogadores').classList.add('active');
        document.querySelector('.black-overlay').classList.add('active');
    }

    fecharMenu() {
        document.querySelector('.lista-jogadores').classList.remove('active');
        document.querySelector('.black-overlay').classList.remove('active');
    }

    limparMenu() {
        this.obterElementoMenu().innerHTML = '';
    }

    obterElementoMenu() {
        return document.querySelector('.lista-jogadores>.container');
    }
}

let jogadores;
const campo = new Campo();
const menuHandler = new MenuHandler();

function criarCardJogador(jogador, localCampo) {
    const cardEstrutura = `
        <div class="jogador-foto"><img src="${jogador.foto}" alt="Foto Jogador"></div>
        <h2 class="jogador-nome">${jogador.nome}</h2>
    `;
    const cardContainer = document.querySelector('.lista-jogadores>.container');
    const card = document.createElement('div');
    card.classList.add('card-info-jogador');
    card.innerHTML = cardEstrutura;

    // ao clicar no card, adicionar jogador escolhido na posição
    card.addEventListener('click', () => {
        campo.adicionarJogador(jogador, localCampo);
        campo.renderizarCampo();
        menuHandler.fecharMenu();
    });

    cardContainer.appendChild(card);
}

async function obterDadosJogadores() {
    return await fetch('js/jogadores.json').then((response) => response.json());
}

function removerJogadoresDuplicados(jogadoresLocais) {
    return jogadoresLocais.filter(
        (j) => !Object.values(campo.jogadoresEmCampo).includes(j.id),
    );
}

function filtrarJogadorPorArea(posicaoJogador) {
    return jogadores.filter((j) => j.posicao === posicaoJogador);
}

async function load() {
    jogadores = await obterDadosJogadores();

    // abrir menu quando clicar em jogador
    const locaisCampo = document.querySelectorAll('.jogador');
    for (let localCampo of locaisCampo) {
        localCampo.addEventListener('click', () => {
            menuHandler.carregarMenu(localCampo);
            menuHandler.abrirMenu();
        });
    }

    // fechar menu quando clicar em area preta
    const blackOverlay = document.querySelector('.black-overlay');
    blackOverlay.addEventListener('click', () => {
        menuHandler.fecharMenu();
        menuHandler.limparMenu();
    });
}
load();

/* 
TODO: Botões de limpar campo e de montar time - Eduardo. 

TODO: Adicionar jogadores reais - Saske
TODO: Adicionar tela inicial - Gian e Enzo
TODO: Adicionar tela de lista de jogadores - Cristovão(?)
TODO: Estilização geral do site - Pierri e Eduardo
*/
