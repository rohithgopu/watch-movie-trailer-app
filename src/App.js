import { useEffect } from "react";
import axios from "axios";

import * as Constants from "./constants/Constants";
import "./App.css";

function App() {

	useEffect(() => {
	  fetchMovies()
	}, [])

	const fetchMovies = async () => {
		const data = await axios.get(`${Constants.MOVIE_API_URL}/discover/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY
			}
		})

		console.log("data", data.data);
	}

	return (
		<div className="App">
			<h1>Hello Users !!</h1>
		</div>
	);
}

export default App;