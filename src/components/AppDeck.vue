<template>
  <div class="deck">
    <!-- TODO add @hover full card preview -->
    <div v-for="card in deck" :key="card.id" class="minicard" :class="card.type">
      <p class="minicard-title">{{ card.name }}</p>
      <div class="minicard-stats">{{ card.statA }} / {{ card.statB }}</div>
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

<style scoped lang="scss">
  .deck {
    grid-area: deck;
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: $bg-darker;
    border-left: $border-dark;
  }
  .minicard {
    @include card-box;
    width: 260px;
    height: 40px;
    margin-bottom: 20px;
    filter: $shadow-50;
    display: flex;
    justify-content: space-between;
    .minicard-title {
      max-width: 160px;
      @include card-title;
    }
    .minicard-stats {
      @include flex-center;
      font-size: $fs-title;
      height: 42px;
      width: 100px;
      clip-path: $cut-both;
      transform: translateX(20px) translateY(-1px);
    }
  }
  .minicard:hover {
    @include hovered-item;
  }
</style>
