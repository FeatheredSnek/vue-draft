<template>
  <div class="graph-wrap">
    <ul>
      <li v-for="key in statValues.keys()" :key="key">
        <!-- TODO hover/highlight on graph value hover -->
        <div
          class="bar"
          :style="{ height: `${statPercentWeights[key]}%` }"
        ></div>
        <div class="value">{{ key === statMax ? `${key}+` : key }}</div>
      </li>
    </ul>
    <i :class="statIcon"></i>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from "vue"

  const props = defineProps<{
    statValues: number[]
    statIcon: string
    deckCardCount: number
  }>()

  // -1 required because the lowest possible stat value is 0
  const statMax = computed(() => props.statValues.length - 1)

  const statPercentWeights = computed(() => {
    // get weights -- count/all values
    const vals = props.statValues.map((el) => {
      let val = el / props.deckCardCount
      if (Number.isNaN(val)) {
        return 0
      } else {
        return val
      }
    })
    // adjust all weights to max=100 baseline
    let max = [...vals].sort()[vals.length - 1]
    let f = max ? 1 / max : 0
    const adjustedVals = vals.map((el) => (el * f * 100).toFixed(1))
    return adjustedVals
  })
</script>

<style scoped lang="scss">
  .graph-wrap {
    color: $fc-light;
    width: 400px;
    height: 240px;
    padding: 20px;
    @include flex-center;
    flex-direction: column;
    ul {
      width: 320px;
      height: 120px;
      display: flex;
      justify-content: space-between;
      list-style-type: none;
      margin: 0;
      padding: 0;
      li {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        margin: 0;
      }
      .value {
        margin-top: 10px;
      }
      .bar {
        width: 20px;
        background-color: $fc-light;
        transition: height 0.3s ease-out;
      }
    }
    i {
      @include flex-center;
      margin-top: 10px;
      font-size: $fs-title;
      width: 40px;
      height: 40px;
    }
  }
</style>
