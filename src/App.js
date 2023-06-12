import { useState, useEffect } from "react";
import axios from "axios";

import * as Constants from "./constants/Constants";
import Movie from "./components/Movie";
import "./App.css";

function App() {

	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState({});
	const [searchKey, setSearchKey] = useState("");

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = async () => {
		const type = searchKey ? "search" : "discover";
		const {
			data: { results },
		} = await axios.get(`${Constants.MOVIE_API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				query: searchKey
			},
		});

		setSelectedMovie(results[0]);
		setMovies(results);
	};

	const renderMovies = () => (
		movies.map(movie => (
			<Movie
				key={movie.id}
				movie={movie}
				selectMovie={setSelectedMovie}
			/>
		))
	);

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovies(searchKey);
	}

	return (
		<div className="App">
			<header className="header">
				<div className="header-content max-center">
					<span>Movie Trailer App</span>
					<form onSubmit={searchMovies}>
						<input type="text" onChange={(e) => setSearchKey(e.target.value)} />
						<button type="submit">Search</button>
					</form>
				</div>
			</header>

			<div className="hero" style={{backgroundImage: `url('${Constants.MOVIE_BACKGROUND_PATH}/${selectedMovie.backdrop_path}')`}}>
				<div className="hero-content max-center">
					<button className="button">Play Trailer</button>
					<h1 className="hero-title">{selectedMovie.title}</h1>
					{selectedMovie.overview ? <p className="hero-overview">{selectedMovie.overview}</p> : null}
				</div>
			</div>

			<div className="container max-center">{renderMovies()}</div>
		</div>
	);
}

export default App;