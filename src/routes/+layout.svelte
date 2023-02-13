<script lang="ts">
	import '../app.postcss';
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="app">
	<main>
		<slot />
	</main>
	<footer class="footer items-center p-4 bg-neutral text-neutral-content">
		<div class="items-center grid-flow-col">
			<p>
				Built with <span class="daisy-footer__heart">❤️</span> by
				<a class="link" href="https://mwksl.me">Matthew Stingel</a> in Denver, CO 🏔
			</p>
		</div>
		<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
			<p>&copy; 2023 Moodmix</p>
		</div>
	</footer>
	<script
		data-name="BMC-Widget"
		data-cfasync="false"
		src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
		data-id="mwksl"
		data-description="Support me on Buy me a coffee!"
		data-message=""
		data-color="#5F7FFF"
		data-position="Left"
		data-x_margin="18"
		data-y_margin="18"
	></script>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	.daisy-footer__heart {
		color: #f44336;
	}
</style>
