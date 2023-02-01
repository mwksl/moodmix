<script>

	export let recommendations = {};

	const { films, albums, series, mood } = recommendations;
</script>

<div>
	<h1 class="text-xl bold mb-4">Mood: {mood}</h1>
	<h1 class="bold space-y-2 mt-2">Films</h1>
	{#each films as film}
		<article class="prose mt-8">
			<p><b>Title:</b> {film.film}</p>
			<p><b>Director:</b> {film.director}</p>
			<p><b>Description:</b> {film.film_description}</p>
		</article>
	{/each}
	<div class="divider" />
	<h1 class="bold space-y-2 mt-2">Series</h1>
	{#each series as show}
		<article class="prose mt-8">
			<p><b>Title:</b> {show?.series}</p>
			{#if show?.creators}
				<p><b>Creators:</b> {show?.creators}</p>
			{:else}
				<p><b>Creator:</b> {show?.creator}</p>
			{/if}
			<p><b>Description:</b> {show.series_description}</p>
		</article>
	{/each}
	<div class="divider" />
	<h1 class="bold space-y-2 mt-2">Albums</h1>
	{#each albums as albumPick}
		<article class="prose mt-8">
			<p><b>Title:</b> {albumPick.album}</p>
			<p><b>Artist:</b> {albumPick.artist}</p>
			<p><b>Description:</b> {albumPick.album_description}</p>
		</article>
	{/each}
</div>

<style>
</style>
