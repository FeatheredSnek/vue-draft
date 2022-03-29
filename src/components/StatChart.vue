<template>
  <h3>{{ statName }} chart</h3>
  <div>
    <span v-for="key in statValues.keys()" :key="key">
      {{ key }} -- <strong>{{ statValues[key] }}</strong> |&nbsp;
    </span>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue"

  defineProps<{
    statValues: number[]
    statName: string
  }>()
</script>

<style scoped></style>
