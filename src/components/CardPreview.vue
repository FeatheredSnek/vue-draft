<template>

  <div class="card" :class="type" :id="id">
    <div class="title-wrap">
      <div class="card-title">
        {{ name }}
      </div>
    </div>
    <div class="body">
      <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Bombina_bombina_1_(Marek_Szczepanek)_tight_crop.jpg/320px-Bombina_bombina_1_(Marek_Szczepanek)_tight_crop.jpg" /> -->
      <img :src="image" />
      <p>
        {{ text }}
      </p>
    </div>
    <div class="card-stats">
      <div class="stat">
        <span>❤</span>{{ statA }}
      </div>
      <div class="stat">
        <span>✸</span>{{ statB }}
      </div>
    </div>
  </div>

  <!-- <div :style="{ 'background-color': type }" class="card">
    <p>{{ id }}</p>
    <p>{{ name }}</p>
    <p>{{ type }}</p>
    <p>{{ text }}</p>
    <p>{{ statA }}</p>
    <p>{{ statB }}</p>
    <p>{{ image }}</p>
  </div> -->
</template>

<script setup lang="ts">
  import { defineProps } from "vue"

  defineProps<{
    id: string
    name: string
    type: string
    text: string
    statA: number
    statB: number
    image: string
  }>()
</script>

<style scoped lang="scss">
  .card {
    @include card-box;
    width: 200px;
    height: 320px;
    margin: 40px;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    filter: $shadow-75;
    .title-wrap {
      position: relative;
      z-index: 2;
      filter: $shadow-75;
    }
    .card-title {
      @include card-title;
      padding-left:16px;
      width: 240px;
      height: 40px;
      transform: translateX(-8px);
      clip-path: $cut-right;
    }
    .body {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    img {
      position: relative;
      z-index: 0;
      margin: 0 auto;
      width: 160px;
      height: 120px;
      filter: $shadow-50;
      border: {
        top: none;
        bottom: $border-light;
        left: $border-light;
        right: $border-light;
      }
    }
    p {
      width: 160px;
      font-size: $fs-text;
      margin: 14px auto;
    }
    .card-stats {
      transform: translateX(-28px);
      display: flex;
      width: 200px;
      height: 40px;
      filter: $shadow-75;
      div {
        font-size: $fs-stat;
        width: 100px;
        height: 40px;
        clip-path: $cut-both;
        @include flex-center;
        span {
          font-size: 0.8em;
          margin-right: 4px;
        }
      }
      div:last-child {
        transform: translateX(-8px);
      }
    }
  }
  .card:hover {
    @include hovered-item;
  }
</style>
