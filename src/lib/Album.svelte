<script lang="ts">
  export let album: string;
  export let artist: string;
  export let albumDescription: string;
</script>

<div class="card rounded-none border-x w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{album}</h2>
    <h3>{artist}</h3>
    <p>{albumDescription}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
