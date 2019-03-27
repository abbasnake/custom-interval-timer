<template>
  <div class="containerSets">
    <AppButtonArrow
      class="containerSets__arrow"
      orientation="left"
      fill="white"
      @onMouseDown="updateSetsByAmount(-1)"
      @onMouseUp="stopUpdateSetsLoop"
      @onTouchStart="updateSetsByAmount(-1)"
      @onTouchEnd="stopUpdateSetsLoop"
    />
    <span class="containerSets__sets">{{ sets }}</span>
    <span class="containerSets__pluralize">{{ pluralize }}</span>
    <AppButtonArrow
      class="containerSets__arrow"
      orientation="right"
      fill="white"
      @onMouseDown="updateSetsByAmount(1)"
      @onMouseUp="stopUpdateSetsLoop"
      @onTouchStart="updateSetsByAmount(1)"
      @onTouchEnd="stopUpdateSetsLoop"
    />
  </div>
</template>

<script>
import AppButtonArrow from '../components/AppButtonArrow'
import { clearInterval, setInterval } from 'timers'

export default {
  name: 'AppSets',
  data () {
    return {
      loopSpeed: 100,
      updateSetsLoop: null
    }
  },
  components: {
    AppButtonArrow
  },
  computed: {
    sets () {
      return this.$store.getters.sets
    },
    pluralize () {
      return this.sets > 1 ? 'LOOPS' : 'LOOP'
    }
  },
  methods: {
    updateSets (sets) {
      if (sets > 0) {
        this.$store.commit('updateSets', sets)
      }
    },
    updateSetsByAmount (amount) {
      this.updateSets(this.sets + amount)
      this.updateSetsLoop = setInterval(() => {
        this.updateSets(this.sets + amount)
      }, this.loopSpeed)
    },
    stopUpdateSetsLoop () {
      clearInterval(this.updateSetsLoop)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.containerSets {
  align-items: center;
  background-image: linear-gradient($black, $black, $black, rgba(12, 18, 18, .4));
  display: flex;
  justify-content: space-around;
  padding: 10px 0;

  &__arrow {
    flex: 10;
  }

  &__sets {
    flex: 50px;
    font-size: 40px;
    line-height: 1;
    text-align: center;
  }

  &__pluralize {
    align-self: center;
    flex: 60px;
    font-size: 30px;
    padding-top: 5px;
  }
}
</style>
