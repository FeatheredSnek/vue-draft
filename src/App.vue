<template>
  <button @click.prevent="start()">Start drafting</button>
  <div class="container">
    <AppPicker
      :deal="state.currentDeal"
      :round="state.currentRound"
      :total-rounds="totalRounds"
      @pick="pickCard($event)"
      @restart="restart()"
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

  // use random card generator
  import generator from "@/data/generator"

  const totalRounds = 5
  const allCards = generator.generateBatch(10)

  let state: State = reactive({
    currentDeal: [],
    currentRound: 0,
    currentDeck: [],
  })

  // runs either onMounted or when the user begins
  // TODO start type
  function start() {
    state.currentDeal = getRandomDeal()
    state.currentRound += 1
  }

  function restart() {
    state.currentDeal.length = 0
    state.currentDeck.length = 0
    state.currentRound = 0
    start()
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
    if (state.currentRound <= totalRounds) {
      state.currentRound += 1
      state.currentDeal = getRandomDeal()
    }
    else {
      state.currentRound += 1
      state.currentDeal.length = 0
    }
  }

</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    margin: 30px;
  }
</style>
