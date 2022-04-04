<template>
  <div class="deck">
    <TransitionGroup name="fade">
      <div
        v-for="card in deck"
        :key="card.id"
        class="minicard"
        :class="minicardClass(card.type, card.statA, card.statB)"
        @mouseenter="displayCardPreview(card)"
        @mouseleave="hideCardPreview()"
      >
        <p class="minicard-title">{{ card.name }}</p>
        <div class="minicard-stats">{{ card.statA }} / {{ card.statB }}</div>
      </div>
    </TransitionGroup>
    <Transition name="preview">
      <div
        v-show="cardPreviewDisplayed"
        class="hover-preview"
        :style="previewOffsetStyle"
      >
        <CardPreview :card="cardPreviewData" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { Card } from "@/types/index"
  import CardPreview from "@/components/CardPreview.vue"
  import { defineProps, ref, reactive, computed } from "vue"

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

  const cardPreviewData = ref({
    id: "",
    name: "",
    type: "",
    text: "",
    statA: 0,
    statB: 0,
    image: "",
  })

  const cardPreviewDisplayed = ref(false)
  const cardPreviewOffset = reactive({
    x: 0,
    y: 0,
  })

  const previewOffsetStyle = computed(
    () =>
      `transform: translate(${cardPreviewOffset.x}px,${cardPreviewOffset.y}px)`
  )

  function computePreviewOffset(
    itemIndex: number,
    itemHeight = 60,
    previewHeight = 320,
    additionalHeight = 80
  ): { x: number; y: number } {
    // use <html>.clientHeight instead of window to account for scrollbars
    const windowHeight = document.children[0].clientHeight
    let computedHeight =
      itemIndex * itemHeight + previewHeight + additionalHeight
    const x =
      document.children[0].scrollWidth - document.children[0].clientWidth
    if (computedHeight < windowHeight) {
      return {
        x,
        y: itemIndex * itemHeight,
      }
    }
    // if preview would render outside the window then place it at the bottom
    else {
      return {
        x,
        y: 0,
      }
    }
  }

  function displayCardPreview(card: Card) {
    cardPreviewData.value = card
    cardPreviewDisplayed.value = true
    const pickedIndex = props.deck.findIndex((el) => el.id === card.id)
    const offset = computePreviewOffset(pickedIndex)
    cardPreviewOffset.x = offset.x
    cardPreviewOffset.y = offset.y
  }

  function hideCardPreview() {
    cardPreviewDisplayed.value = false
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
    overflow-y: visible;
  }
  .minicard {
    @include card-box;
    width: 260px;
    height: 40px;
    margin-bottom: 20px;
    filter: $shadow-50;
    display: flex;
    justify-content: space-between;
    z-index: 1;
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
  // stat hovering -> item highligh
  .minicard-hovered {
    @include hovered-item;
  }
  // item hovering -> display card preview
  .hover-preview {
    background: pink;
    position: absolute;
    width: 0px;
    height: 0px;
    top: 30px;
    right: 500px;
    z-index: 2;
  }
  // list item add/remove transition classes
  .fade-move,
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translate(-30px, 0);
  }
  .fade-leave-active {
    position: absolute;
  }
  // preview appear/disappear classes
  .preview-enter-active,
  .preview-leave-active {
    transition: opacity 0.2s ease-in-out;
  }
  .preview-enter-from,
  .preview-leave-to {
    opacity: 0;
  }
</style>
