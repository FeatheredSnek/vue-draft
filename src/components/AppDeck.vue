<template>
  <div class="deck">
    <h2>Deck</h2>
    <!-- TODO add @hover full card preview -->
    <div v-for="card in deck" :key="card.id">
      {{ card.name }} -- {{ card.type }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Card } from "@/types/index"
  import { defineProps } from "vue"

  defineProps<{
    deck: Card[]
  }>()
</script>

<style scoped>
  .deck {
    background-color: bisque;
  }
</style>
