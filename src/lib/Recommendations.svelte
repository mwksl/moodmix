<script>
	import Film from '$lib/Film.svelte';

	export let recommendations = {};

	const { films, albums, series } = recommendations;
</script>

<div>
	<h1 class="bold space-y-2 mt-2">Films</h1>
	{#each films as film}
		<article class="prose">
			<p>Title: {film.film}</p>
			<p>Director: {film.director}</p>
			<p>Description: {film.film_description}</p>
		</article>
	{/each}
	<div class="divider" />
	<h1 class="bold space-y-2 mt-2">Series</h1>
	{#each series as show}
		<article class="prose">
			<p>Title: {show.series}</p>
			<p>Director: {show.creators}</p>
			<p>Description: {show.series_description}</p>
		</article>
	{/each}
	<div class="divider" />
	<h1 class="bold space-y-2 mt-2">Albums</h1>
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
