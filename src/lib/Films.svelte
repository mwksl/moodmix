<script>
	import { onMount } from 'svelte';

	export let films = [];
	let filmData;

	onMount(async () => {
		const response = await fetch(`/api/films?films=${JSON.stringify(films)}`);
		filmData = await response.json();
		films = filmData;
	});
</script>

{#each films as film}
	<div class="card lg:card-side bg-base-100 shadow-xl">
		<figure><img src={film.posterPathLarge} alt="Movie Poster" /></figure>
		<div class="card-body">
			<h2 class="card-title">{film?.original_title}</h2>
			<h3>{film?.director}</h3>
			<p>{film?.overview}</p>
			<div class="card-actions justify-end" />
		</div>
	</div>
{/each}
