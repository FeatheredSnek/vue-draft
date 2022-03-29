<template>
  <div class="stats">
    <h2>Stats</h2>
    <StatChart :stat-values="statAValues" stat-name="statA" />
    <StatChart :stat-values="statBValues" stat-name="statB" />
  </div>
</template>

<script setup lang="ts">
  import StatChart from "@/StatChart.vue"
  import { Card } from "@/types/index"
  import { defineProps, computed } from "vue"

  const props = defineProps<{
    deck: Card[]
  }>()

  // TODO wrap max+ values
  const max = 10

  const statAValues = computed(() => {
    let values = []
    for (let i = 0; i < max; i++) {
      let count = props.deck.filter((el) => el.statA === i).length
      values[i] = count
    }
    return values
  })

  const statBValues = computed(() => {
    let values = []
    for (let i = 0; i < max; i++) {
      let count = props.deck.filter((el) => el.statB === i).length
      values[i] = count
    }
    return values
  })

</script>

<style scoped>
  .stats {
    background-color: aqua;
  }
</style>
