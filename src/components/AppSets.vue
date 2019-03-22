<template>
  <div class="containerSets">
    <h3 class="containerSets__title">SETS</h3>
    <div class="containerSets__configuration">
      <AppButtonArrow
        orientation="left"
        fill="grey"
        @onMouseDown="updateSetsByAmount(-1)"
        @onMouseUp="stopUpdateSetsLoop"
        @onTouchStart="updateSetsByAmount(-1)"
        @onTouchEnd="stopUpdateSetsLoop"
      />
      <span class="containerSets__configuration__text">
        {{ sets }}x
      </span>
      <AppButtonArrow
        orientation="right"
        fill="grey"
        @onMouseDown="updateSetsByAmount(1)"
        @onMouseUp="stopUpdateSetsLoop"
        @onTouchStart="updateSetsByAmount(1)"
        @onTouchEnd="stopUpdateSetsLoop"
      />
    </div>
  </div>
</template>

<script>
import AppButtonArrow from '../components/AppButtonArrow'
import { clearInterval, setInterval } from 'timers';

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
.containerSets {
  &__title {
    font-size: 30px;
    text-align: center;
  }

  &__configuration {
    align-items: center;
    display: flex;
    justify-content: center;

    &__text {
      font-size: 60px;
      margin: 0 10px;
      min-width: 85px;
      text-align: center;
    }
  }

}
</style>
