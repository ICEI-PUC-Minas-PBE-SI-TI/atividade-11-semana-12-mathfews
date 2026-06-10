const api_key = "51bcbad4f2055cf1999bac7cb6ab10de"
const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
async function getMovieCredits(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function getPersonImage(id) {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    return `https://image.tmdb.org/t/p/w500${data.profile_path}`
}

async function getMovie(id) {
    const movieCredits = await getMovieCredits(id)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()
    const imagePromises = movieCredits.cast.slice(0, 4).map(c => getPersonImage(c.id))
    const images = await Promise.all(imagePromises)
    movieCredits.cast.slice(0, 4).forEach((c, index) => {
        c.foto = images[index]
    })
    movieCredits.crew.filter(c => c.job === "Director").forEach(d => {
        d.tmdb = `https://www.themoviedb.org/person/${d.id}`
        d.foto = `https://image.tmdb.org/t/p/w500${d.profile_path}`
    })
    document.title = `${data.original_title} - FILMS`
    document.body.innerHTML = `
    <main class="detalhes-wrapper">
        <a href="index.html" class="btn-voltar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar
        </a>
        <h1 id="titulo">${data.original_title} <span class="ano">${data.release_date.slice(0, 4)}</span></h1>
        <div class="container">
            <div class="foto-container">
                <a href="${`https://www.themoviedb.org/movie/${id}`}" target="_blank" onclick="console.log(data.homepage)">)
                    <img id="capa" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="">
                </a>
            </div>
            <div class="info-container">
                <div class="nota-container">
                    <svg id="estrela" class="estrela" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <h1 id="nota">Nota: ${data.vote_average.toFixed(1)}</h1>
                </div>
                <ul class="genres">
                    ${data.genres.map(g => `<li>${g.name}</li>`).join("")}
                </ul>
                <p id="description">${data.overview}</p>
                <div class="autores-envolvidos">
                    <div class="diretor">
                        <h2>Diretor</h2>
                        <ul>
                            ${movieCredits.crew.filter(c => c.job === "Director").map(d => `<li><a href="${d.tmdb}" target="_blank" class="autor-link"><img src="${d.foto}" alt="">${d.name}</a></li>`).join("")}
                        </ul>
                    </div>
                    <div class="elenco">
                        <h2>Elenco</h2>
                        <ul>
                            ${movieCredits.cast.slice(0, 4).map(c => `<li><a href="${`https://www.themoviedb.org/person/${c.id}`}" target="_blank" class="autor-link"><img src="${c.foto}" alt="">${c.name} - ${capitalizeFirstLetter(c.character)}</a></li>`).join("")}
                        </ul>
                    </div>
                </div>
            </div>
    </main>`
}
getMovie(id)