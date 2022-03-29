<template>
  <div class="picker">
    <!-- TODO maybe placeholder here when round == 0 || round == totalRounds -->
    <h2>Picker</h2>
    <h3>Round {{ round }} / {{ totalRounds }}</h3>
    <div>
      <CardPreview
        v-for="card in deal"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :type="card.type"
        :statA="card.statA"
        :statB="card.statB"
        :image="card.image"
        @click="$emit('pick', deal[deal.indexOf(card)])"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CardPreview from "@/components/CardPreview.vue"
  import { defineProps, defineEmits } from "vue"
  import { Card } from "@/types/index"

  defineProps<{
    deal: Card[]
    round: number
    totalRounds: number
  }>()

  defineEmits<{
    (e: "pick", value: Card): void
  }>()
</script>

<style scoped>
  .picker {
    background-color: lightpink;
  }
</style>
