<template>
  <div class="card" :class="type" :id="id">
    <div class="title-wrap">
      <div class="card-title">
        {{ name }}
      </div>
    </div>
    <div class="body">
      <img :src="image" />
      <p>
        {{ text }}
      </p>
    </div>
    <div class="card-stats">
      <div class="stat">
        <i class="bi-heart-fill"></i>{{ statA }}
      </div>
      <div class="stat">
        <i class="bi-star-fill"></i>{{ statB }}
      </div>
    </div>
  </div>
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
      padding-left: 16px;
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
      max-height: 70px;
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
        i {
          font-size: 0.6em;
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
