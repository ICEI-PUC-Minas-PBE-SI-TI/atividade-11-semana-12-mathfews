const card_section = document.querySelector(".card-section");

function createCard(obj) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${obj.capa}" alt="${obj.titulo}">
        <p>${obj.titulo}</p>
    `;
    card.addEventListener("click", () => {
        window.location.href = `detalhes.html?id=${obj.id}`;
    });
    card_section.appendChild(card);
}

catalogo.forEach((filme) => {
    createCard(filme);
});