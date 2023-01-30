<script>
  import { Card, Text, Icon } from 'daisyui'

  export let films = []
</script>

{#each films as film}
  <Card p="4">
    <Text fontWeight="bold" mb="2">{film.film}</Text>
    <Text fontSize="sm" color="gray" mb="2">
      Directed by {film.director}
    </Text>
    <Text>{film.film_description}</Text>
  </Card>
{/each}
