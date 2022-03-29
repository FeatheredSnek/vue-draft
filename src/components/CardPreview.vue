<template>
  <div :style="{ 'background-color': type }" class="card">
    <p>{{ id }}</p>
    <p>{{ name }}</p>
    <p>{{ type }}</p>
    <p>{{ statA }}</p>
    <p>{{ statB }}</p>
    <p>{{ image }}</p>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue"

  // TODO add card text
  defineProps<{
    id: string
    name: string
    type: string
    statA: number
    statB: number
    image: string
  }>()
</script>

<style scoped>
  .card {
    width: 300px;
    height: 150px;
    border: 1px black solid;
  }
  p {
    margin: 0;
  }
</style>
