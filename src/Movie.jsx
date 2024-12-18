import { useEffect, useRef, useState } from "react";
import Star from "./Star";
import { useMovies } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const key = "59ec7bc1";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Index() {
  const [query, setQuery] = useState("game");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query);

  /* const [watched, setWatched] = useState([]); */

  /*  const [watched, setWatched] = useState(function () {
    let store = localStorage.getItem("watched");
    return JSON.parse(store);
  }); */

  function AddWatchedMovie(WatchedMove) {
    console.log(WatchedMove);
    setWatched((watched) => [...watched, WatchedMove]);
    console.log(watched);
    setSelectedId(null);
  }

  function handleSelectedId(id) {
    setSelectedId((selecetd) => (id === selecetd ? null : id));
  }
  function handleOncloseMovie() {
    setSelectedId(null);
  }
  function handleDelete(id) {
    setWatched((movie) => watched.filter((movie) => movie.imdbID !== id));
  }

  useKey("Escape", handleOncloseMovie);

  /*  useEffect(function () {
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
        handleOncloseMovie();
        console.log("closing the movie screen");
      }
    });
  }); */

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumofResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectedId={handleSelectedId} />
          )}
          {error && <Error message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDeatail
              AddWatchedMovie={AddWatchedMovie}
              selectedId={selectedId}
              handleOncloseMovie={handleOncloseMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} handleDelete={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Error({ message }) {
  return (
    <h2 style={{ display: "flex", justifyContent: "center" }}>
      <span>error⚠️</span>
      {message}
    </h2>
  );
}
function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <h1>isLoading ......</h1>
    </div>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿 </span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  /* useEffect(function () {
    const el = document.querySelector(".search");
    console.log(el);
    el.focus();
  }, []); */
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumofResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, handleSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectedId={handleSelectedId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, handleSelectedId }) {
  return (
    <li onClick={() => handleSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDeatail({
  selectedId,
  handleOncloseMovie,
  AddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState();
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAddWatched() {
    const watchedMovies = {
      imdbID: selectedId,
      titel: movie.Title,
      Year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: movie.Runtime,
      userRating: userRating,
    };
    AddWatchedMovie(watchedMovies);
  }
  useEffect(
    function () {
      setIsLoading(true);
      async function FetchMovie() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }

      FetchMovie();
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = movie.Title;
      return function () {
        document.title = "Usepopcorn";
      };
    },
    [movie.Title]
  );
  return (
    <div className="detail">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <header>
            <button className="btn-back" onClick={handleOncloseMovie}>
              &larr;
            </button>{" "}
            <img src={movie.Poster} alt={`${movie.Title}`} />
            {selectedId}
            <div className="deatails-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <h2>you have already rated &nbsp; ⭐{watchedUserRating}</h2>
              ) : (
                <Star maxRating={10} size={24} onSetRating={setUserRating} />
              )}

              {userRating > 0 && (
                <button className="btn-add" onClick={handleAddWatched}>
                  Add to Lists
                </button>
              )}
            </div>
            <h2>
              <em>{movie.Plot}</em>
            </h2>
            <p>starting {movie.Actors}</p>
            <p>Directed by {movie.Director} </p>
          </section>
        </>
      )}
    </div>
  );
}
function WatchedSummary({ watched, handleDelete }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, handleDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie, handleDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>

          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={() => handleDelete(movie.imdbID)}
          className="btn-delete"
        >
          x
        </button>
      </div>
    </li>
  );
}
