import { useState, useEffect } from "react";
import axios from "axios";

import * as Constants from "./constants/Constants";
import Movie from "./components/Movie";
import "./App.css";

function App() {

	const [movies, setMovies] = useState([]);
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

		setMovies(results);
	};

	const renderMovies = () => (
		movies.map(movie => (
			<Movie
				key={movie.id}
				movie={movie}
			/>
		))
	);

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovies(searchKey);
	}

	return (
		<div className="App">
			<header>
				<h1>Movie Trailer App</h1>
				<form onSubmit={searchMovies}>
					<input type="text" onChange={(e) => setSearchKey(e.target.value)} />
					<button type="submit">Search</button>
				</form>
			</header>
			<div className="container">{renderMovies()}</div>
		</div>
	);
}

export default App;