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

    redefinirRenderCampo() {
        const iconesJogadores = document.querySelectorAll('.jogador');
        iconesJogadores.forEach((j) => (j.style.backgroundImage = ''));
    }

    renderizarCampo() {
        // Função que vai colocar foto dos jogadores nas areas do campo que estão preenchidas
        /* 
            1- redefinir campo
            2- para cada goleiro
        */
        // this.redefinirRenderCampo();
        // Para cada posição no campo, procurar um jogador, se for um campo vazio pular.
        // Se achar um jogador,
        for (let posicaoCampo in this.jogadoresEmCampo) {
            const idJogador = this.jogadoresEmCampo[posicaoCampo];
            if (idJogador === 0) continue;
            const jogador = jogadores.find((j) => j.id === idJogador);
            if (jogador == undefined) {
                console.error(
                    'Erro: jogador de ID invalido, por favor arrume a representação do campo'
                );
            }

            const foto = jogador.foto;
            const icone = document.getElementById(posicaoCampo);
            icone.style.backgroundImage = `url("${foto}")`;
        }
    }
}

let jogadores;
const campo = new Campo();

async function abrirMenuJogadores() {
    document.querySelector('.lista-jogadores').classList.add('active');
    document.querySelector('.black-overlay').classList.add('active');
}

function fecharMenuJogadores() {
    document.querySelector('.lista-jogadores').classList.remove('active');
    document.querySelector('.black-overlay').classList.remove('active');
    removerCardJogadores();
}

async function obterDadosJogadores() {
    return await fetch('js/jogadores.json').then((response) => response.json());
}

function removerCardJogadores() {
    const listaJogadores = document.querySelector(
        '.lista-jogadores>.container'
    );
    listaJogadores.innerHTML = '';
}

function adicionarJogadorCampo(jogador, localizacaoCampo) {
    /* 
        1- colocar id do jogador no campo na posição especificada
        2- renderizar campo, colocando imagem do jogador na posição especificada
        3- fechar menu
    */
    campo.jogadoresEmCampo[localizacaoCampo] = jogador.id;
    campo.renderizarCampo();
    fecharMenuJogadores();
}

function criarCardJogador(jogador, idLocalizacaoCampo) {
    const elementoJogadorLista = document.querySelector(
        '.lista-jogadores>.container'
    );
    const cardEstrutura = `
        <div class="jogador-foto"><img src="${jogador.foto}" alt="Foto Jogador"></div>
        <h2 class="jogador-nome">${jogador.nome}</h2>
    `;

    const card = document.createElement('div');
    card.classList.add('card-info-jogador');
    card.innerHTML = cardEstrutura;
    elementoJogadorLista.appendChild(card);
    // card.dataset.localizacaoCampo = idLocalizacaoCampo;
    // card.dataset.idJogador = jogador.id;

    // ao clicar no card, adicionar jogador escolhido na posição
    card.addEventListener('click', () => {
        adicionarJogadorCampo(jogador, idLocalizacaoCampo);
    });
}

function removerJogadoresDuplicados(jogadoresLocais) {
    return jogadoresLocais.filter(
        (j) => !Object.values(campo.jogadoresEmCampo).includes(j.id)
    );
}

function filtrarJogadorPorArea(posicaoJogador) {
    return jogadores.filter((j) => j.posicao === posicaoJogador);
}

async function renderizarMenuJogadores(localNoCampo, posicaoJogador) {
    /* 
    1- Ler jogadores
    2- Verificar posição selecionada
    3- Remover jogadores duplicados (WIP)
    3- Renderizar CARDS dependendo da posição selecionada
    TODO: integrar com o sistema futuro que vai ser de salvar as posições de jogadores ja escolhidos
     */
    const jogadoresDaArea = filtrarJogadorPorArea(posicaoJogador);
    const jogadoresDisponiveis = removerJogadoresDuplicados(jogadoresDaArea);

    removerCardJogadores();
    jogadoresDisponiveis.forEach((j) => criarCardJogador(j, localNoCampo));
}

async function load() {
    'use strict';
    jogadores = await obterDadosJogadores();
    // abrir menu quando clicar em jogador
    const jogadoresIcones = document.querySelectorAll('.jogador');
    jogadoresIcones.forEach((e) => {
        e.addEventListener('click', () => {
            renderizarMenuJogadores(e.id, e.dataset.posicao);
            abrirMenuJogadores();
        });
    });

    // fechar menu quando clicar em area preta
    document
        .querySelector('.black-overlay')
        .addEventListener('click', fecharMenuJogadores);
}
load();
/* 
1- Ao clicar em qualquer jogador, aparecer overlay e seletor de jogadores DONE
2- Renderizar os jogadores do botão específico clicado (tipo zagueiro, meio, etc)
2.1 - Devemos verificar o estado do campo para ver quais ja foram selecionados e esconder o que não foram carregados

TODO: adicionar as imagens no .json, maricota precisa enviar mas eu ja posso ir deixando a estrutura de arquivos pronta
TODO: Botões de limpar campo e de ver time
*/
