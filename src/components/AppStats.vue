<template>
  <div class="stats">
    <StatChart
      :stat-values="statAValues"
      :deckCardCount="deck.length"
      stat-icon="bi-heart-fill"
      @hover-stat="$emit('hoverStat', { statName: 'statA', statValue: $event })"
      @mouseleave="$emit('unhover')"
    />
    <StatChart
      :stat-values="statBValues"
      :deckCardCount="deck.length"
      stat-icon="bi-star-fill"
      @hover-stat="$emit('hoverStat', { statName: 'statB', statValue: $event })"
      @mouseleave="$emit('unhover')"
    />
  </div>
</template>

<script setup lang="ts">
  import StatChart from "@/components/StatChart.vue"
  import { Card } from "@/types/index"
  import { defineProps, computed, defineEmits } from "vue"

  const props = defineProps<{
    deck: Card[]
  }>()

  const max = 9

  const statAValues = computed(() => {
    return statComputer("statA")
  })

  const statBValues = computed(() => {
    return statComputer("statB")
  })

  function statComputer(statName: "statA" | "statB") {
    let values = []
    for (let i = 0; i < max; i++) {
      let count = props.deck.filter((el) => el[statName] === i).length
      values[i] = count
    }
    // count values equal to or above maximum at index [max]
    values[max] = props.deck.filter((el) => el[statName] >= max).length
    return values
  }

  defineEmits<{
    (e: "hoverStat", value: { statName: string; statValue: number }): void
    (e: "unhover") : void
  }>()
</script>

<style scoped lang="scss">
  .stats {
    grid-area: stats;
    @include flex-center;
    background-color: $bg-darker;
    border-top: $border-dark;
  }
</style>
