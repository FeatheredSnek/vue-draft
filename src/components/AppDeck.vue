<template>
  <div class="deck">
    <!-- TODO add @hover full card preview -->
    <TransitionGroup name="fade">
    <div
      v-for="card in deck"
      :key="card.id"
      class="minicard"
      :class="minicardClass(card.type, card.statA, card.statB)"
    >
      <p class="minicard-title">{{ card.name }}</p>
      <div class="minicard-stats">{{ card.statA }} / {{ card.statB }}</div>
    </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
  import { Card } from "@/types/index"
  import { defineProps } from "vue"

  const props = defineProps<{
    deck: Card[]
    hoveredStatValue: number | null
    hoveredStatName: string | null
  }>()

  function minicardClass(type: string, statA: number, statB: number) {
    let classList = [type]
    if (statA === props.hoveredStatValue && props.hoveredStatName === "statA") {
      classList.push("minicard-hovered")
    }
    if (statB === props.hoveredStatValue && props.hoveredStatName === "statB") {
      classList.push("minicard-hovered")
    }
    return classList
  }
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
  .minicard-hovered {
    @include hovered-item;
  }
  // transition classes
  .fade-move, .fade-enter-active, .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translate(-30px, 0);
  }
  .fade-leave-active {
    position: absolute;
  }
</style>
