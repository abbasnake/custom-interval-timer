<template>
  <div class="containerBlock" :style="renderStyles()">
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
      :colorIndex="block.colorIndex"
    />
    <AppTimerBlockTimer :block="block" :blockIndex="blockIndex" />
    <AppTimerBlockAddRemoveTimer :blockIndex="blockIndex" :colorIndex="block.colorIndex" />
    <div class="containerBlock__sequenceNumber">{{ blockIndex + 1 }}</div>
    <AppButtonAddBlock
      class="containerBlock__bottomRightButton"
      :colorIndex="block.colorIndex"
      :blockIndex="blockIndex"
    />
  </div>
</template>

<script>
import { returnBlockColorByIndex, workerTimers } from '../utils/helpers'

import AppTimerBlockRepetitions from './AppTimerBlockRepetitions'
import AppTimerBlockTimer from './AppTimerBlockTimer'
import AppButtonRemoveBlock from './AppButtonRemoveBlock'
import AppButtonAddBlock from './AppButtonAddBlock'
import AppButtonColorWheel from './AppButtonColorWheel'
import AppTimerBlockAddRemoveTimer from './AppTimerBlockAddRemoveTimer'

export default {
  name: 'AppTimerBlock',
  components: {
    AppTimerBlockRepetitions,
    AppTimerBlockTimer,
    AppButtonRemoveBlock,
    AppButtonAddBlock,
    AppButtonColorWheel,
    AppTimerBlockAddRemoveTimer
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
  mounted () {
    this.updateColor()
  },
  updated () {
    this.updateColor()
  },
  methods: {
    updateColor () {
      if (this.block.justAdded) {
        workerTimers.setTimeout(() => {
          this.$store.commit('updateBlockStatusByIndex', this.blockIndex)
        }, 200)
      }
    },
    renderStyles () {
      const borderColor = `border-color: ${this.block.justAdded ? 'white' : returnBlockColorByIndex(this.block.colorIndex)}`
      const backgroundColor = `background-color: ${this.block.justAdded ? 'rgba(200, 200, 200, .1)' : 'transparent'}`
      return `${borderColor}; ${backgroundColor}`
    },
    addTimerToBlock () {
      this.$store.commit('addTimerToBlock', this.blockIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.containerBlock {
  position: relative;
  padding: 5px 0;
  margin: 15px 0;
  border: 1px solid;
  border-radius: 20px;
  transition: all $transition-speed linear;

  &__topLeftButton {
    position: absolute;
    top: -5px;
    left: -5px;
  }

  &__colorWheel {
    position: absolute;
    right: 0;
    top: 0;
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
