<template>
  <div class="containerBlock" :style="renderBorder()">
    <AppButtonRemoveBlock
      class="containerBlock__topLeftButton"
      :colorIndex="block.colorIndex"
      :blockIndex="blockIndex"
    />
    <AppButtonColorWheel
      class="containerBlock__colorWheel"
      :blockIndex="blockIndex"
      :colorIndex="block.colorIndex"
    />
    <AppTimerBlockRepetitions
      :repetitions="block.repetitions"
      :blockIndex="blockIndex"
    />
    <AppTimerBlockTimer :block="block" :blockIndex="blockIndex" />
    <AppTimerBlockAddRemoveTimer :blockIndex="blockIndex" />
    <div class="containerBlock__sequenceNumber">{{ blockIndex + 1 }}</div>
    <AppButtonAddBlock
      class="containerBlock__bottomRightButton"
      :colorIndex="block.colorIndex"
      :blockIndex="blockIndex"
    />
  </div>
</template>

<script>
import { returnBlockColorByIndex } from '../utils/helpers'

export default {
  name: 'AppTimerBlock',
  components: {
    AppTimerBlockRepetitions: () => import('./AppTimerBlockRepetitions'),
    AppTimerBlockTimer: () => import('./AppTimerBlockTimer'),
    AppButtonRemoveBlock: () => import('./AppButtonRemoveBlock'),
    AppButtonAddBlock: () => import('./AppButtonAddBlock'),
    AppButtonColorWheel: () => import('./AppButtonColorWheel'),
    AppTimerBlockAddRemoveTimer: () => import('./AppTimerBlockAddRemoveTimer')
  },
  props: {
    blockIndex: {
      type: Number,
      required: true
    },
    block: {
      type: Object,
      required: true
    }
  },
  methods: {
    renderBorder () {
      return `border-color: ${returnBlockColorByIndex(this.block.colorIndex)}`
    },
    renderColor () {
      return `color: ${returnBlockColorByIndex(this.block.colorIndex)}`
    },
    addTimerToBlock () {
      this.$store.commit('addTimerToBlock', this.blockIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.containerBlock {
  position: relative;
  padding: 5px 0;
  margin: 15px 0;
  border: 1px solid;
  border-radius: 10px;

  &__topLeftButton {
    position: absolute;
    top: -5px;
    left: -5px;
  }

  &__colorWheel {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  &__sequenceNumber {
    position: absolute;
    bottom: 5px;
    left: 10px;
    font-size: 20px;
  }

  &__bottomRightButton {
    position: absolute;
    bottom: -5px;
    right: -5px;
  }
}
</style>
