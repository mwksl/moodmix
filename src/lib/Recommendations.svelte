<script>
	import Films from '$lib/Films.svelte';
	import Series from '$lib/Series.svelte';
	import Album from "$lib/Album.svelte";

	export let recommendations = {};

	const { films, albums, series, mood } = recommendations;
</script>

<div>
	<div class="flex justify-center align-center">
		<h1 class="text-2xl bold mb-4">Mood: {mood}</h1>
	</div>
	<div class="flex-col justify-center align-center space-y-2">
		<Films {films} />
		<Series {series} />
	</div>
	<div class="divider" />
	<h1 class="bold space-y-2 mt-2">Albums</h1>
	<div class="flex justify-center align-center">
		<div class="carousel rounded-box">
			{#each albums as albumPick}
				<div class="carousel-item">
					<Album album={albumPick?.album} artist={albumPick?.artist} albumDescription={albumPick?.album_description} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
</style>
