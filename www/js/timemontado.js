function load() {
    const btnVoltar = document.querySelector('#btnVoltar');
    btnVoltar.addEventListener('click', () => {
        location.href = 'campo.html';
    });
}

load();

// TODO: NÃO ESQUECA QUE QUANDO VOLTAR O TIME DEVE SER RESTAURADO AO SEU MODO COMO ESTAVA ANTES
