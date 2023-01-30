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
	<footer class="daisy-footer">
    <div class="daisy-footer__content">
      <p class="daisy-footer__text">
        &copy; 2023 Moodmix
      </p>
      <p class="daisy-footer__text">
        Built with <span class="daisy-footer__heart">❤️</span> by <a class="link" href="https://mwksl.me">Matthew Stingel</a> in Denver, CO 🏔
      </p>
    </div>	</footer>
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
	.daisy-footer {
		background-color: #333;
		color: #fff;
		display: flex;
		justify-content: center;
		padding: 1rem 0;
	}

	.daisy-footer__content {
		display: flex;
		justify-content: space-between;
		max-width: 1200px;
		width: 100%;
	}

	.daisy-footer__text {
		margin: 0;
	}

	.daisy-footer__heart {
		color: #f44336;
	}
</style>
