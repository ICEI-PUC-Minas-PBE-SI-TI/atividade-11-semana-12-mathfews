const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id") - 1
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
let generos = catalogo[id].generos.map(g => capitalizeFirstLetter(g))
document.title = `${catalogo[id].titulo} - MOOV`
document.body.innerHTML = `
    <main class="detalhes-wrapper">
        <a href="index.html" class="btn-voltar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar
        </a>
        <h1 id="titulo">${catalogo[id].titulo} <span class="ano">${catalogo[id].ano}</span></h1>
        <div class="container">
            <div class="foto-container">
                <a href="${catalogo[id].link}" target="_blank">
                    <img id="capa" src="${catalogo[id].capa}" alt="">
                </a>
            </div>
            <div class="info-container">
                <div class="nota-container">
                    <svg id="estrela" class="estrela" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <h1 id="nota">Nota: ${catalogo[id].nota}</h1>
                </div>
                <ul class="genres">
                    ${generos.map(g => `<li>${g}</li>`).join("")}
                </ul>
                <p id="description">${catalogo[id].descricao}</p>
                <div class="autores-envolvidos">
                    <div class="diretor">
                        <h2>Diretor</h2>
                        <ul>
                            ${catalogo[id].diretores.map(d => `<li><a href="${d.tmdb}" target="_blank" class="autor-link"><img src="${d.foto}" alt="">${d.nome}</a></li>`).join("")}
                        </ul>
                    </div>
                    <div class="elenco">
                        <h2>Elenco</h2>
                        <ul>
                            ${catalogo[id].elenco.map(e => `<li><a href="${e.tmdb}" target="_blank" class="autor-link"><img src="${e.foto}" alt="">${e.nome}</a></li>`).join("")}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>`
