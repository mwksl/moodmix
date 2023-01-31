<script>
	import { enhance } from '$app/forms';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	import TypeAhead from '$lib/TypeAhead.svelte';
	import Recommendations from '$lib/Recommendations.svelte';

	let albumToRequest = {};
	let requestCounter = 0;
	let intervalId;
	let responseData;
	let timeoutWarning;

	const uuid = () => {
		let dt = new Date().getTime();
		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
		return uuid;
	};

	let requestId = uuid();

	function handleAlbumSelection(event) {
		albumToRequest = event.detail;
	}

	function reset() {
		// Reset the request
		requestCounter = 0;
		albumToRequest = {};
		responseData = null;
		requestId = uuid();
	}

	async function fetchRecommendations() {
		if (responseData) {
			clearInterval(intervalId);
			reset();
		}
		// Set up an interval to check for a response every second
		intervalId = setInterval(async () => {
			if (requestCounter > 60) {
				timeoutWarning = true;
				// wait 5 seconds before resetting
				setTimeout(() => {
					timeoutWarning = false;
					clearInterval(intervalId);
					reset();
				}, 5000);

				console.log("Request Timed Out");
			}
			// Increment the counter
			requestCounter += 1;
			const { data, error } = await supabase
				.from('recommendations')
				.select()
				.eq('requestId', requestId);

			if (data && data.length > 0) {
				responseData = data;
				clearInterval(intervalId);
			}
		}, 1000);
	}

	onMount(() => {
		// Clear the interval when the component is unmounted
		return () => clearInterval(intervalId);
	});
</script>

<div class="flex flex-col lg:flex-row justify-center items-center">
	<div class="w-full lg:w-1/2 mt-4 lg:mt-0 rounded-sm p-8 bg-slate-100">
		<article class="prose">
			<h1>Moodmix</h1>
			<p>
				Moodmix is an AI-powered media recommendation tool that utilizes ChatGPT technology. It
				analyzes the album you're playing and identifies your mood, then suggests relevant films,
				music, and movies to enhance your current mood.
			</p>
			<p>Note: It may take up to 60 seconds for the AI model to complete your request.</p>
		</article>
		<TypeAhead class="mt-2" on:albumSelected={handleAlbumSelection} />

		<form
			class="my-4"
			action="?/fetchRequests"
			method="POST"
			on:submit|preventDefault={fetchRecommendations}
			use:enhance
		>
			<!-- hidden inputs to send the album and artist to the server -->
			<input type="hidden" name="album" bind:value={albumToRequest.album} />
			<input type="hidden" name="artist" bind:value={albumToRequest.artist} />
			<input type="hidden" name="requestId" bind:value={requestId} />
			{#if timeoutWarning}
				<div class="mt-4">Request timed out. Please try again.</div>
			{/if}
			{#if intervalId && !responseData}
				<div class="mt-4">Loading... {requestCounter}</div>
			{/if}
			{#if responseData}
				<Recommendations recommendations={responseData[0].recommendations} />
				<p>load time: {requestCounter} seconds</p>
			{/if}
			<!-- disable the button if albumToRequest is empty or if the input is empty -->
			<button
				class="mt-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
				disabled={!albumToRequest.album || !albumToRequest.artist || (intervalId && !responseData)}
			>
				Submit
			</button>
		</form>
	</div>
</div>
