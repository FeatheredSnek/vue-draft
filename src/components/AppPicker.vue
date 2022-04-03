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
    <Transition name="modal" mode="out-in">
      <div class="re-start" v-if="props.round === 0">
        <p>Begin drafting {{ totalRounds }} cards</p>
        <p>
          <i
            class="bi-play-circle-fill"
            :class="startButtonStatus"
            @click.prevent="$emit('start')"
          ></i>
        </p>
      </div>
      <div class="deal" v-else-if="props.round <= props.totalRounds">
        <div class="counter">{{ roundCounter }}</div>
        <div class="cards">
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
            :movement-class="movementClasses[deal.indexOf(card)]"
            @click="pickHandler(card, deal.indexOf(card))"
          />
        </div>
      </div>
      <div class="re-start" v-else>
        <p>Your deck is ready</p>
        <p>
          <i
            class="bi-skip-backward-circle-fill"
            :class="restartButtonStatus"
            @click.prevent="$emit('restart')"
          ></i>
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import CardPreview from "@/components/CardPreview.vue"
  import { defineProps, defineEmits, computed, reactive, ref } from "vue"
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

  const movementClasses = reactive([
    'movement-default',
    'movement-default',
    'movement-default'])

  const pickable = ref(true)

  function pickHandler(pickedCard: Card, pickedIndex: number) {
    // handle clicks only when the card animation is finished
    if (pickable.value === true) {
      pickable.value = false
      // 1) move->hide 2) change data 3) hide->appear
      // with 50ms delay between transition steps to avoid glitches
      movementClasses.fill('movement-down')
      movementClasses[pickedIndex] = 'movement-side'
      setTimeout(() => {
        movementClasses.fill('movement-hidden')
      }, 550);
      setTimeout(() => {
        emit('pick', pickedCard)
      }, 600);
      setTimeout(() => {
        movementClasses.fill('movement-default')
      }, 650);
      setTimeout(() => {
        pickable.value = true
      }, 1150);
    }
  }

  const emit = defineEmits<{
    (e: "pick", value: Card): void
    (e: "restart"): void
    (e: "start"): void
  }>()

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
      flex-direction: column;
    }
    .cards {
      @include flex-center;
    }
    .counter {
      font-size: $fs-big;
      color: $fc-light;
    }
    .re-start {
      @include flex-center;
      flex-direction: column;
      font-size: $fs-big;
      color: $fc-light;
      p {
        margin-bottom: 0.3em;
      }
      i {
        font-size: 1.3em;
        transition: transform 0.3s;
      }
      .hoverable:hover {
        transform: scale(1.2, 1.2);
      }
    }
  }
  i {
    display: inline-block;
    cursor: pointer;
  }
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.5s ease;
  }
  .modal-enter-from, .modal-leave-to {
    opacity: 0;
  }
</style>
