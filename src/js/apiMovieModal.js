async function fetchMoviesById(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=61d280fbc4e0ab3fee827783c53f7600`);
    const movie = await response.json();
    return movie;
    }