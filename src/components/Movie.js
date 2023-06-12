import React from "react";

import { MOVIE_POSTER_PATH } from "../constants/Constants";

function Movie({ movie }) {
	return (
		<div className="movie-card">
			{movie.poster_path ? (
				<img className="movie-cover" src={`${MOVIE_POSTER_PATH}/${movie.poster_path}`} alt="Movie Poster" />
			) : <div className="movie-placeholder">No Image Found</div>}
			<h5>{movie.title}</h5>
		</div>
	);
}

export default Movie;