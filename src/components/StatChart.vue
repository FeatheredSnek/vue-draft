<template>
  <h3>{{ statName }} chart</h3>
  <div>
    <!-- TODO barcharts (with scss?) -->
    <span v-for="key in statValues.keys()" :key="key">
      {{ key === statMax ? `${key}+` : key }} -- <strong>{{ statValues[key] }}</strong> |&nbsp;
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from "vue"

  const props = defineProps<{
    statValues: number[],
    statName: string,
  }>()

  // -1 required because the lowest possible stat value is 0
  const statMax = computed(() => props.statValues.length - 1)
</script>

<style scoped></style>
