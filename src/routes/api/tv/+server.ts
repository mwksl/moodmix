import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import axios from 'axios';

const apiKey = env.TMDB_API_KEY;

export async function GET({ url }: { url: URL }) {
  const series = JSON.parse(String(url.searchParams.get('series')));
  const seriesData = [];
  for (const show of series) {
    const { series: title, creators } = show;
    const tvId = await getTVId(title, creators);
    if (tvId) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`
      );
      const seriesResponse = await response.data;
      if (seriesResponse) {
        // add creators to series object
        seriesResponse.creators = creators;
        // add poster path to series object
        seriesResponse.poster_path = `https://image.tmdb.org/t/p/w500${seriesResponse.poster_path}`;
        seriesData.push(seriesResponse);
      }
    }
  }
  if (seriesData.length > 0) {
    return new Response(JSON.stringify(seriesData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  return error(404, 'Not found');
}

async function getTVId(title: string, creators: string): Promise<number | null> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${title}&page=1`
    );
    const results = response.data.results;
    for (const result of results) {
      if (result.name === title) {
        return result.id;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
