<template>
  <button @click.prevent="start()">Start drafting</button>
  <div class="container">
    <AppPicker
      :deal="state.currentDeal"
      :round="state.currentRound"
      :total-rounds="totalRounds"
      @pick="pickCard($event)"
    />
    <AppDeck :deck="state.currentDeck" />
    <AppStats :deck="state.currentDeck" />
  </div>
</template>

<script setup lang="ts">
  import AppPicker from "@/components/AppPicker.vue"
  import AppDeck from "@/components/AppDeck.vue"
  import AppStats from "@/components/AppStats.vue"
  import { reactive } from "vue"
  import { Card, State } from "@/types/index"

  // this will be replaced with api call
  import data from "@/data/static"

  const totalRounds = 10
  const allCards = data

  let state: State = reactive({
    currentDeal: [],
    currentRound: 0,
    currentDeck: [],
  })

  // runs either onMounted or when the user begins
  function start() {
    state.currentDeal = getRandomDeal()
    state.currentRound += 1
  }

  function getRandomDeal(dealSize = 3): Card[] {
    let cards: Card[] = []
    for (let i = 0; i < dealSize; i++) {
      let randomIndex = Math.floor(Math.random() * allCards.length)
      // ensures that 3 different cards are dealt
      while (cards.find((el) => el.id === allCards[randomIndex].id)) {
        randomIndex = Math.floor(Math.random() * allCards.length)
      }
      cards.push(allCards[randomIndex])
    }
    return cards
  }

  function pickCard(picked: Card) {
    state.currentDeck.push(picked)
    state.currentRound += 1
    state.currentDeal = getRandomDeal()
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    margin: 30px;
  }
</style>
