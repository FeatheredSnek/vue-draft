<template>
  <div class="graph-wrap">
    <ul>
      <li v-for="key in statValues.keys()" :key="key">
        <div class="bar v25"></div>
        <div class="value">{{ key === statMax ? `${key}+` : key }}</div>
      </li>
    </ul>
    <p>❤</p>
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
      }
    }
    p {
      @include flex-center;
      margin-top: 10px;
      font-size: $fs-stat;
      width: 40px;
      height: 40px;
    }
  }
</style>
