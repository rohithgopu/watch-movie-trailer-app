import { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";

import * as Constants from "./constants/Constants";
import Movie from "./components/Movie";
import "./App.css";

function App() {

	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState({});
	const [searchKey, setSearchKey] = useState("");
	const [playTrailer, setPlayTrailer] = useState(false);

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

		await selectMovie(results[0]);
		setMovies(results);
	};

	const fetchMovie = async (id) => {
		const { data } = await axios.get(`${Constants.MOVIE_API_URL}/movie/${id}`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				append_to_response: 'videos'
			}
		})

		return data;
	}

	const selectMovie = async (movie) => {
		setPlayTrailer(false);
		const data = await fetchMovie(movie.id);
		setSelectedMovie(data);
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
	}

	const renderMovies = () => {
		if (movies?.length > 0) {
			return movies.map(movie => (
				<Movie
					key={movie.id}
					movie={movie}
					selectMovie={selectMovie}
				/>
			))
		} else {
			return 'Sorry, no movies found'
		}
	};

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovies(searchKey);
	}

	const renderTrailer = () => {
		if(selectedMovie?.videos?.results?.length > 0) {

			const trailer = selectedMovie.videos.results.find(vid => vid.name === "Official Trailer");
			const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;

			return (
				<YouTube
					videoId={key}
					className={"youtube-container"}
					opts={{
						width: "100%",
						height: "100%",
						playerVars: {
							autoplay: 1,
							controls: 0
						}
					}}
				/>
			)
		} else {
			setPlayTrailer(false);
		}
	}

	return (
		<div className="App">
			<header className="header">
				<div className="header-content max-center">
					<h2>Movie Trailer App</h2>
					<form onSubmit={searchMovies}>
						<input type="text" onChange={(e) => setSearchKey(e.target.value)} />
						<button type="submit">Search</button>
					</form>
				</div>
			</header>

			<div className="hero" style={{backgroundImage: `url('${Constants.MOVIE_BACKGROUND_PATH}/${selectedMovie.backdrop_path}')`}}>
				<div className="hero-content max-center">
					{playTrailer ? 
						<button className="button button-close" onClick={() => setPlayTrailer(false)}>
							<span><strong>Close</strong></span>
						</button> : 
						null
					}
					{(selectedMovie.videos && playTrailer) ? renderTrailer() : null}
					<button className="button" onClick={() => setPlayTrailer(true)}>
						<span><strong>Play Trailer</strong></span>
					</button>
					<h1 className="hero-title">{selectedMovie.title}</h1>
					{selectedMovie.overview ? <p className="hero-overview">{selectedMovie.overview}</p> : null}
				</div>
			</div>

			<div className="container max-center">{renderMovies()}</div>
		</div>
	);
}

export default App;