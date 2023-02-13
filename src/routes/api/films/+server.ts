import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import axios from 'axios';

const apiKey = env.TMDB_API_KEY;

export async function GET({ url }: { url: URL }) {
	const films = JSON.parse(String(url.searchParams.get('films')));
	const filmData = [];
	for (const film of films) {
		const { film: title, director } = film;
		const filmId = await getMovieId(title, director);
		if (filmId) {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}`
			);
			const film = await response.data;
			if (film) {
				// add director to film object
				film.director = director;
				// add poster path to film object
				film.posterPathLarge = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
				film.posterPathMedium = `https://image.tmdb.org/t/p/w342${film.poster_path}`;
				filmData.push(film);
			}
		}
	}
	if (filmData.length > 0) {
		return new Response(JSON.stringify(filmData), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return error(404, 'Not found');
}

async function getMovieId(title: string, director: string): Promise<number | null> {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&page=1`
		);
		const results = response.data.results;
		for (const result of results) {
			if (result.title === title) {
				return result.id;
			}
		}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}
