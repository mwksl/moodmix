<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let query = '';
	let albums = [];
	let selectedAlbum = '';
	let albumToRequest = {};
	let showList = false;
	let loading = false;
	let timeoutId = null;
	let selectedIndex = -1;



	function handleInput(event) {
		query = event.target.value;
		if (!query) {
			selectedAlbum = '';
			albums = [];
			showList = false;
			return;
		}
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			loading = true;
			getAlbums();
			showList = true;
		}, 500);
	}

	const cache = new Map();

	async function getAlbums() {
		if (cache.has(query)) {
			albums = cache.get(query);
			return;
		}

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
		cache.set(query, albums);
		loading = false;
	}

	function handleSelect(album) {
		selectedAlbum = album.name + ' by ' + album.artist;
		albumToRequest = { album: album.name, artist: album.artist };
		dispatch('albumSelected', albumToRequest);
		showList = false;
	}

	function handleKeyDown(event) {
		if (!showList) return;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = (selectedIndex + 1) % albums.length;
			selectedAlbum = albums[selectedIndex].name + ' by ' + albums[selectedIndex].artist;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = selectedIndex - 1;
			if (selectedIndex < 0) {
				selectedIndex = albums.length - 1;
			}
			selectedAlbum = albums[selectedIndex].name + ' by ' + albums[selectedIndex].artist;
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			if (selectedIndex >= 0) {
				handleSelect(albums[selectedIndex]);
			}
		}
	}
</script>

<!-- add a label to the input field -->
<label class="label">Enter an Album: </label>

<div class="dropdown dropdown-end w-full">
	<input
		type="text"
		class="input input-bordered w-full rounded"
		bind:value={selectedAlbum}
		on:input={handleInput}
		on:keydown={handleKeyDown}
		autofocus
	/>
</div>

{#if showList && albums.length > 0}
	<div class="dropdown-content bg-base-200 top-14 max-h-64 overflow-auto flex-col rounded-md">
		<ul class="menu menu-compact" style="width: calc(100% - 2px);">
			{#each albums as album}
				<li
					class={`border-b py-3 border-b-base-content/10 w-full cursor-pointer ${selectedIndex === albums.indexOf(album) ? 'bg-base-300' : ''}`}
					on:click={() => handleSelect(album)}
				>
					{album.name} by {album.artist}
				</li>
			{/each}
		</ul>
	</div>
{/if}
