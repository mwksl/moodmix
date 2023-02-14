<script>
	import { onMount } from 'svelte';

	export let series = [];
	let seriesData;

	onMount(async () => {
		const response = await fetch(`/api/tv?series=${JSON.stringify(series)}`);
		seriesData = await response.json();
		series = seriesData;
	});
</script>

{#if series.length > 0}
	{#each series as show}
		<div class="card lg:card-side bg-base-100 shadow-xl">
			<figure><img src={show?.poster_path} alt="TV Series Poster" /></figure>
			<div class="card-body">
				<h2 class="card-title">{show?.name}</h2>
				<h3>{show?.creators}</h3>
				<p>{show?.overview}</p>
				<div class="card-actions justify-end" />
			</div>
		</div>
	{/each}
{/if}
