<script lang="ts">
	import '../app.postcss';
</script>

<div class="app">
	<main>
		<slot />
	</main>
	<footer class="footer items-center p-4 bg-neutral text-neutral-content">
		<div class="items-center grid-flow-col">
			<p>
				Built by <a class="link" href="https://mwksl.me">Matthew Stingel</a> in Denver, CO 🏔
			</p>
		</div>
		<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
			<p>&copy; 2023 Moodmix</p>
		</div>
	</footer>
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
</style>
