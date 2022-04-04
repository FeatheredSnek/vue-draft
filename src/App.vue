<template>
  <div class="container">
    <AppPicker
      :deal="state.currentDeal"
      :round="state.currentRound"
      :total-rounds="totalRounds"
      @pick="pickCard($event)"
      @restart="restart()"
      @start="start()"
    />
    <AppDeck
      :deck="state.currentDeck"
      :hovered-stat-name="controls.hoveredStatName"
      :hovered-stat-value="controls.hoveredStatValue"
    />
    <AppStats
      :deck="state.currentDeck"
      @hover-stat="hoverHandler($event)"
      @unhover="unhoverHandler()"
    />
  </div>
</template>

<script setup lang="ts">
  import AppPicker from "@/components/AppPicker.vue"
  import AppDeck from "@/components/AppDeck.vue"
  import AppStats from "@/components/AppStats.vue"
  import { nextTick, reactive } from "vue"
  import { Card, State, Controls } from "@/types/index"

  // use random card generator
  import generator from "@/data/generator"

  const totalRounds = 5
  const allCards = generator.generateBatch(10)

  let state: State = reactive({
    currentDeal: [],
    currentRound: 0,
    currentDeck: [],
  })

  let controls: Controls = reactive({
    hoveredStatName: null,
    hoveredStatValue: null,
  })

  // runs either onMounted or when the user begins
  // TODO start type
  function start() {
    if (state.currentRound === 0) {
      state.currentDeal = getRandomDeal()
      state.currentRound += 1
    }
  }

  async function restart() {
    if (state.currentRound != 0) {
      state.currentDeal.length = 0
      state.currentDeck.length = 0
      state.currentRound = 0
      // gives time for dom transitions to happen
      await nextTick()
      start()
    }
  }
  
  function getRandomDeal(dealSize = 3): Card[] {
    let cards: Card[] = []
    for (let i = 0; i < dealSize; i++) {
      let randomIndex = Math.floor(Math.random() * allCards.length)
      // ensures that 3 different cards are dealt
      while (cards.find((el) => el.id === allCards[randomIndex].id)) {
        randomIndex = Math.floor(Math.random() * allCards.length)
      }
      // if the card has already been drafted give it new unique id...
      let card = allCards[randomIndex]
      if (state.currentDeck.includes(card)) {
        // ...which also requires making new object
        card = {...card} 
        card.id = generator.generateId()
      }
      cards.push(card)
    }
    return cards
  }

  function pickCard(picked: Card) {
    // find the last card of a picked type
    let lastTypeIndex = state.currentDeck.length
    if (lastTypeIndex !== 0) {
      for (let i = state.currentDeck.length - 1; i >= 0; i--) {
        if (state.currentDeck[i].type === picked.type) {
          lastTypeIndex = i
          break
        }
      }
    }
    // place picked behind the last card of a type
    state.currentDeck.splice(lastTypeIndex + 1, 0, picked)
    // update rounds
    if (state.currentRound <= totalRounds) {
      state.currentRound += 1
      state.currentDeal = getRandomDeal()
    } else {
      state.currentRound += 1
      state.currentDeal.length = 0
    }
  }

  function hoverHandler(payload: { statName: string; statValue: number }) {
    controls.hoveredStatName = payload.statName
    controls.hoveredStatValue = payload.statValue
  }

  function unhoverHandler() {
    controls.hoveredStatName = null
    controls.hoveredStatValue = null
  }
</script>

<style lang="scss">
  @import "@/styles/global.scss";

  .container {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template: auto 240px / auto 340px;
    grid-template-areas:
      "draft deck"
      "stats deck";
  }
</style>
