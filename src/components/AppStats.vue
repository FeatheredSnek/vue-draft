<template>
  <div class="stats">
    <StatChart
      :stat-values="statAValues"
      :deckCardCount="deck.length"
      stat-icon="bi-heart-fill"
    />
    <StatChart
      :stat-values="statBValues"
      :deckCardCount="deck.length"
      stat-icon="bi-star-fill"
    />
  </div>
</template>

<script setup lang="ts">
  import StatChart from "@/components/StatChart.vue"
  import { Card } from "@/types/index"
  import { defineProps, computed } from "vue"

  const props = defineProps<{
    deck: Card[]
  }>()

  const max = 9

  // TODO use one function with different stat name param for both computed
  const statAValues = computed(() => {
    let values = []
    for (let i = 0; i < max; i++) {
      let count = props.deck.filter((el) => el.statA === i).length
      values[i] = count
    }
    // count values equal to or above maximum at index [max]
    values[max] = props.deck.filter((el) => el.statA >= max).length
    return values
  })

  const statBValues = computed(() => {
    let values = []
    for (let i = 0; i < max; i++) {
      let count = props.deck.filter((el) => el.statB === i).length
      values[i] = count
    }
    // count values equal to or above maximum at index [max]
    values[max] = props.deck.filter((el) => el.statB >= max).length
    return values
  })
</script>

<style scoped lang="scss">
  .stats {
    grid-area: stats;
    @include flex-center;
    background-color: $bg-darker;
    border-top: $border-dark;
  }
</style>
