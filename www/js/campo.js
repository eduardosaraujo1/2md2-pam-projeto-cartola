document.querySelectorAll(".jogador").forEach(e => {
    e.addEventListener("click", () => {
        document.querySelector(".black-overlay").classList.add("active");
        document.querySelector(".lista-jogadores").classList.add("active");
    })
})

document.querySelector(".black-overlay").addEventListener("click", () => {
    document.querySelector(".black-overlay").classList.remove("active");
    document.querySelector(".lista-jogadores").classList.remove("active");
})