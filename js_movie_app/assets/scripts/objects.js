const addMovieBtn = document.getElementById('add-movie-btn');
const searchMovieBtn = document.getElementById('search-btn');


const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');
  if (movies.length === 0) {
    movies.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach(movie => {
    const movieElem = document.createElement('li');
    const { info } = movie;
    let text = info.title + ' --- ';
    for (key in info) {
      if (key != '_title' && key != 'title') {
        text += `${key}: ${info[key]}`;
      }
    }
    movieElem.textContent = text;
    movieList.append(movieElem);
  })
}

const addMovieHandler = () => {
  const title = document.getElementById('title').value,
    extraName = document.getElementById('extra-name').value,
    extraValue = document.getElementById('extra-value').value;

  if (
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    info: {
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      get title() {
         return this._title;
      },
      [extraName]: extraValue
    },
  }
  newMovie.info.title = title;
  movies.push(newMovie);
  renderMovies();
}

const searchMovieHandler = () => {
  const userInput = document.getElementById('filter-title').value;
  renderMovies(userInput);
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchMovieBtn.addEventListener('click', searchMovieHandler);