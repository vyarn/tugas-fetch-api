const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=7e20e9f0d78c76164817bf1765aafa8e&with_genres=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7e20e9f0d78c76164817bf1765aafa8e&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const genreList = document.querySelector('.genre-list');

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div> 
            <div class="overview">
                <h2>Overview:</h2>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red';
    }
}

// handle form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});

// create genre items
fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=7e20e9f0d78c76164817bf1765aafa8e&language=en-US')
    .then(response => response.json())
    .then(data => {
        const genres = data.genres;
        genres.forEach(genre => {
            const genreItem = document.createElement('div');
            genreItem.classList.add('genre-item');
            genreItem.textContent = genre.name;
            genreItem.addEventListener('click', () => {
                const genreId = genre.id;
                getMovies(APIURL + genreId);
            });
            genreList.appendChild(genreItem);
        });
    })
    .catch(error => console.error(error));


const h1 = document.querySelector("h1");
h1.addEventListener("click", () => {
    window.location.href = "index.html";
});

