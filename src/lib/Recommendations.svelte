<script>
	import Film from '$lib/Film.svelte';

	export let recommendations = {};

	const { films, albums, series } = recommendations;
</script>

<div>
	<h1>Recommendations</h1>
	<h2>Films</h2>
	{#each films as film}
		<article class="prose">
			<p>Title: {film.film}</p>
			<p>Director: {film.director}</p>
			<p>Description: {film.film_description}</p>
		</article>
	{/each}
	<h2>Series</h2>
	{#each series as show}
		<article class="prose">
			<p>Title: {show.series}</p>
			<p>Director: {show.creators}</p>
			<p>Description: {show.series_description}</p>
		</article>
	{/each}
	<h2>Albums</h2>
	{#each albums as albumPick}
		<article class="prose">
			<p>Title: {albumPick.album}</p>
			<p>Artist: {albumPick.artist}</p>
			<p>Description: {albumPick.album_description}</p>
		</article>
	{/each}
</div>

<style>
</style>
