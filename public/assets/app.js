const card_section = document.querySelector(".card-section");
const api_key = "51bcbad4f2055cf1999bac7cb6ab10de"
function createMovieCard(obj) {
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
async function melhoresAvaliados() {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=pt-BR&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    data.results.forEach((obj) => {
        createMovieCard({
            id: obj.id,
            titulo: obj.title,
            capa: `https://image.tmdb.org/t/p/w500${obj.poster_path}`,
        });
    });
}
melhoresAvaliados();