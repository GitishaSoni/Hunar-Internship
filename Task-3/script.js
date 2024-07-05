const api = "apikey=7e7d6bb3";
const base_url = "http://www.omdbapi.com";

function generateUrl(query) {
    return `${base_url}/?${api}&${query}`;
}

const requests = {
    fetchPopular: generateUrl("s=popular&type=movie"),
    fetchTrending: generateUrl("s=trending&type=movie"),
    fetchNetflixOrignals: generateUrl("s=netflix&type=series"),
    fetchActionMovies: generateUrl("s=action&type=movie"),
    fetchComedyMovies: generateUrl("s=comedy&type=movie"),
    fetchHorrorMovies: generateUrl("s=horror&type=movie"),
    fetchRomanceMovies: generateUrl("s=romance&type=movie"),
    fetchDocumentaries: generateUrl("s=documentary&type=movie")
};

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data fetched from OMDb:", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
}

function setBanner(data) {
    const bannerElement = document.getElementById('banner');
    const bannerTitle = document.getElementById('banner_title');
    const bannerDesc = document.getElementById("banner_desc");
    
    const randomMovie = data.Search[Math.floor(Math.random() * data.Search.length)];
    bannerElement.style.backgroundImage = `url(${randomMovie.Poster})`;
    bannerTitle.innerText = randomMovie.Title;
    bannerDesc.innerText = truncate(randomMovie.Plot, 100);
}

function displayMovies(data, container) {
    container.innerHTML = '';
    data.Search.forEach(movie => {
        const img = document.createElement('img');
        img.src = movie.Poster;
        img.alt = movie.Title;
        img.className = 'row_poster';
        container.appendChild(img);
    });
}

function fetchAndDisplayMovies(request, containerId) {
    fetchData(request).then(data => {
        if (data && data.Search) {
            const container = document.querySelector(`#${containerId} .row_posters`);
            displayMovies(data, container);
        }
    });
}

fetchData(requests.fetchPopular).then(data => {
    if (data && data.Search) {
        setBanner(data);
    }
});

fetchAndDisplayMovies(requests.fetchPopular, 'popular-movies');
fetchAndDisplayMovies(requests.fetchTrending, 'trending-movies');
fetchAndDisplayMovies(requests.fetchNetflixOrignals, 'netflix-originals');
fetchAndDisplayMovies(requests.fetchActionMovies, 'action-movies');
fetchAndDisplayMovies(requests.fetchComedyMovies, 'comedy-movies');
fetchAndDisplayMovies(requests.fetchHorrorMovies, 'horror-movies');
fetchAndDisplayMovies(requests.fetchRomanceMovies, 'romance-movies');
fetchAndDisplayMovies(requests.fetchDocumentaries, 'documentaries');
