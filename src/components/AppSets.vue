<template>
  <div class="containerSets">
    <h3 class="containerSets__title">SETS</h3>
    <div class="containerSets__configuration">
      <AppButtonArrow
        orientation="left"
        fill="grey"
        @onClick="updateSets(sets - 1)"
      />
      <span class="containerSets__configuration__text">
        {{ sets }}x
      </span>
      <AppButtonArrow
        orientation="right"
        fill="grey"
        @onClick="updateSets(sets + 1)"
      />
    </div>
  </div>
</template>

<script>
import AppButtonArrow from '../components/AppButtonArrow'

export default {
  name: 'AppSets',
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
