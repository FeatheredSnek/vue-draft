<template>
  <div class="draft">
    <div class="topbar-wrap">
      <div class="topbar">
        <span>vueDraft</span>
        <i
          class="bi-play-circle-fill"
          :class="startButtonStatus"
          @click.prevent="$emit('start')"
        ></i>
        <i
          class="bi-skip-backward-circle-fill"
          :class="restartButtonStatus"
          @click.prevent="$emit('restart')"
        ></i>
        <!-- TODO github link -->
        <a href="github link" target="_blank"
          ><i class="bi-github hoverable"></i
        ></a>
      </div>
    </div>
    <div class="counter">{{ roundCounter }}</div>
    <div class="deal" v-if="props.round <= props.totalRounds">
      <CardPreview
        v-for="card in deal"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :type="card.type"
        :text="card.text"
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

  const startButtonStatus = computed(() => {
    return props.round === 0 ? "hoverable" : ""
  })

  const restartButtonStatus = computed(() => {
    return props.round > 0 ? "hoverable" : ""
  })

  defineEmits<{
    (e: "pick", value: Card): void
    (e: "restart"): void
    (e: "start"): void
  }>()

  //TODO card pick animations
</script>

<style scoped lang="scss">
  .draft {
    grid-area: draft;
    width: auto;
    @include flex-center;
    flex-direction: column;
    .topbar-wrap {
      position: absolute;
      top: 0;
      left: 0;
      filter: drop-shadow(1px 1px 0px rgba(64, 64, 64, 0.5));
    }
    .topbar {
      line-height: 60px;
      font-size: $fs-title;
      padding-left: 24px;
      color: $fc-light;
      background-color: $bg-darker;
      width: 285px;
      height: 60px;
      clip-path: polygon(0 0, 100% 0, 245px 100%, 0 100%);
      span {
        margin-right: 8px;
      }
      i {
        display: inline-block;
        cursor: pointer;
        font-size: 0.8em;
        margin-left: 12px;
        transition: transform 0.2s;
      }
      .hoverable:hover {
        transform: scale(1.3, 1.3);
      }
    }
    .deal {
      @include flex-center;
    }
    .counter {
      font-size: $fs-big;
      color: $fc-light;
    }
  }
</style>
