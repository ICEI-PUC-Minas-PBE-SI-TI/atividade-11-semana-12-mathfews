const card_section = document.querySelector(".card-section")
const search_input = document.querySelector(".search-section input")
const search_button = document.querySelector(".search-section button")
const filter_select = document.querySelector("#filter-select")
const catalog_title = document.querySelector("#catalog-title")
const api_key = "51bcbad4f2055cf1999bac7cb6ab10de"
let current_filter = "popular"
function createMovieCard(obj) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
        <img src="${obj.capa}" alt="${obj.titulo}">
        <p>${obj.titulo}</p>
    `
    card.addEventListener("click", () => {
        window.location.href = `detalhes.html?id=${obj.id}`
    })
    card_section.appendChild(card)
}
async function loadFilmsByFilter(filter) {
    let url = ""
    let title = ""
    
    switch(filter) {
        case "popular":
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1`
            title = "Filmes Populares"
            break
        case "top_rated":
            url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=pt-BR&page=1`
            title = "Melhor Avaliados"
            break
        case "release_date_desc":
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=pt-BR&page=1&sort_by=release_date.desc`
            title = "Mais Recentes"
            break
        case "release_date_asc":
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=pt-BR&page=1&sort_by=release_date.asc`
            title = "Mais Antigos"
            break
        case "vote_average":
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=pt-BR&page=1&sort_by=vote_average.desc&vote_count.gte=100`
            title = "Maior Nota"
            break
    }
    
    card_section.innerHTML = ""
    catalog_title.textContent = title
    
    const response = await fetch(url)
    const data = await response.json()
    data.results.forEach((obj) => {
        createMovieCard({
            id: obj.id,
            titulo: obj.title,
            capa: `https://image.tmdb.org/t/p/w500${obj.poster_path}`,
        });
    });
}

async function melhoresAvaliados() {
    loadFilmsByFilter("popular")
}
async function buscarFilmes(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=pt-BR&query= ${encodeURIComponent(query)}&page=1&include_adult=false`
    const response = await fetch(url)
    const data = await response.json()
    card_section.innerHTML = ""
    data.results.forEach((obj) => {
        createMovieCard({
            id: obj.id,
            titulo: obj.title,
            capa: `https://image.tmdb.org/t/p/w500${obj.poster_path}`,
        });
    });
}

search_input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = search_input.value.trim()
        if (query) {
            buscarFilmes(query)
        }
        if (query === "") {
            card_section.innerHTML = ""
            melhoresAvaliados()
        }
    }
})

search_button.addEventListener("click", () => {
    const query = search_input.value.trim()
    if (query) {
        buscarFilmes(query)
    }
})

filter_select.addEventListener("change", (e) => {
    current_filter = e.target.value
    search_input.value = ""
    loadFilmsByFilter(current_filter)
})

melhoresAvaliados()