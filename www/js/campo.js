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

    redefinirCampoRender() {
        const locaisCampo = document.querySelectorAll('.jogador-container');
        locaisCampo.forEach((localCampo) => {
            const icone = localCampo.querySelector('.jogador');
            const label = localCampo.querySelector('.jogador-label');
            icone.style.backgroundImage = '';
            icone.value = '+';
            label.innerHTML = label.dataset.default;
        });
    }

    redefinirCampo() {
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

        this.redefinirCampoRender();
    }

    renderizarCampo() {
        for (let idLocalCampo in this.jogadoresEmCampo) {
            const idJogador = this.jogadoresEmCampo[idLocalCampo];
            const jogador = jogadores.find((j) => j.id === idJogador);
            if (jogador == undefined) continue;

            const localCampo = document.getElementById(idLocalCampo);
            this.renderizarJogador(jogador, localCampo);
        }
    }

    renderizarJogador(jogador, localCampo) {
        const localCampoIcone = localCampo.querySelector('.jogador');
        localCampoIcone.style.backgroundImage = `url("${jogador.foto}")`;
        localCampoIcone.value = '';

        const label = localCampo.querySelector('.jogador-label');
        label.innerHTML = jogador.nome;
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
        return document.querySelector('.lista-jogadores .card-container');
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
    const cardContainer = menuHandler.obterElementoMenu();
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
        (j) => !Object.values(campo.jogadoresEmCampo).includes(j.id)
    );
}

function filtrarJogadorPorArea(posicaoJogador) {
    return jogadores.filter((j) => j.posicao === posicaoJogador);
}

async function load() {
    jogadores = await obterDadosJogadores();

    // abrir menu quando clicar em jogador
    const locaisCampo = document.querySelectorAll('.jogador-container');
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
TODO: Interface para enviar status do campo para timemontado.html

TODO: Adicionar jogadores reais - Saske
TODO: Adicionar tela de lista de jogadores - Cristovão
*/
