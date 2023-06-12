import React from "react";

import { MOVIE_POSTER_PATH } from "../constants/Constants";

function Movie({ movie, selectMovie }) {
	return (
		<div className="movie-card" onClick={() => selectMovie(movie)}>
			{movie.poster_path ? (
				<img className="movie-cover" src={`${MOVIE_POSTER_PATH}/${movie.poster_path}`} alt="Movie Poster" />
			) : <div className="movie-placeholder">No Image Found</div>}
			<h5>{movie.title}</h5>
		</div>
	);
}

export default Movie;