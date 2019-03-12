<template>
  <div class="container">
    <AppSets />
    <template v-for="(block, index) in timerBlocks">
      <AppTimerBlock
        :block="block"
        :blockIndex="index"
        :key="index"
      />
    </template>
    <div class="container__total">TOTAL: {{ stringifyTimer(totalTime) }}</div>
    <AppButtonMain title="START" @onClick="runTimer"/>
  </div>
</template>

<script>
import { stringifyTimerObject } from '../utils/helpers'

import AppSets from '../components/AppSets'
import AppTimerBlock from '../components/AppTimerBlock'
import AppButtonMain from '../components/AppButtonMain'

export default {
  name: 'Setup',
  components: {
    AppSets,
    AppTimerBlock,
    AppButtonMain
  },
  computed: {
    totalTime () {
      return this.$store.getters.totalTime
    },
    timerBlocks () {
      return this.$store.getters.timerBlocks
    },
    sets () {
      return this.$store.getters.sets
    }
  },
  methods: {
    runTimer () {
      this.$router.push({ path: '/run' })
    },
    stringifyTimer (timerObject) {
      return stringifyTimerObject(timerObject)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: $black;

  &__total {
    font-size: 26px;
    text-align: center;
  }
}
</style>
