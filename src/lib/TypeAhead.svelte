<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let query = '';
	let albums = [];
	let selectedAlbum = '';
	let albumToRequest = {};
	let showList = false;

	function handleInput(event) {
		query = event.target.value;
		if (!query) {
			selectedAlbum = '';
			albums = [];
			showList = false;
			return;
		}
		getAlbums();
		showList = true;
	}

	async function getAlbums() {
		const response = await fetch(
			`https://musicbrainz.org/ws/2/release?query=${encodeURIComponent(query)}&fmt=json`
		);

		const data = await response.json();
		albums = Array.from(
			new Set(
				data.releases.map((release) => {
					return {
						name: release.title,
						artist: release['artist-credit'][0].name
					};
				})
			)
		);
	}
	function handleSelect(album) {
		selectedAlbum = album.name + ' by ' + album.artist;
		albumToRequest = { album: album.name, artist: album.artist };
		dispatch('albumSelected', albumToRequest);
		showList = false;
	}
</script>

<!-- add a label to the input field -->
<label class="label">Enter an Album: </label>
<input type="text" class="daisy-input" bind:value={selectedAlbum} on:input={handleInput} />

{#if showList && albums.length > 0}
	<ul class="daisy-list" style="width: calc(100% - 2px);">
		{#each albums as album}
			<li class="daisy-list-item" on:click={() => handleSelect(album)}>
				{album.name} by {album.artist}
			</li>
		{/each}
	</ul>
{/if}

<style>
	input.daisy-input {
		margin: 20px 0;
		padding: 10px;
		font-size: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 100%;
		box-sizing: border-box;
	}

	ul.daisy-list {
		margin: 0;
		padding: 0;
		list-style: none;
		background-color: #fff;
		border: 1px solid #ccc;
		border-top: none;
		position: absolute;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	li.daisy-list-item {
		padding: 10px;
		cursor: pointer;
		width: 100%;
		box-sizing: border-box;
	}

	li.daisy-list-item:hover {
		background-color: #eee;
	}
</style>
