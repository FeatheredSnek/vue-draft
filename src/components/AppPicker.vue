<template>
  <div class="picker">
    <h2>Picker</h2>
    <h3>{{ roundCounter }}</h3>
    <div class="deal" v-if="props.round <= props.totalRounds">
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
    <div v-else>
      <p>Your deck is ready</p>
      <p>
        <button @click.prevent="$emit('restart')">Restart</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CardPreview from "@/components/CardPreview.vue"
  import { defineProps, defineEmits, computed } from "vue"
  import { Card } from "@/types/index"

  const props = defineProps<{
    deal: Card[]
    round: number
    totalRounds: number
  }>()

  const roundCounter = computed(() => {
    if (props.round === 0) return "Waiting for draft"
    if (props.round > props.totalRounds) return "Draft finished"
    return `Draft round ${props.round} of ${props.totalRounds}`
  })

  defineEmits<{
    (e: "pick", value: Card): void,
    (e: "restart"): void
  }>()
</script>

<style scoped>
  .picker {
    background-color: lightpink;
  }
</style>
