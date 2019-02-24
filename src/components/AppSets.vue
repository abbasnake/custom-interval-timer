<template>
  <div class="containerSets">
    <h3 class="containerSets__title">SETS</h3>
    <div class="containerSets__configuration">
      <AppButtonSvg
        orientation="left"
        fill="grey"
        @onClick="updateSets(sets - 1)"
      />
      <span class="containerSets__configuration__text">
        {{ sets }}x
      </span>
      <AppButtonSvg
        orientation="right"
        fill="grey"
        @onClick="updateSets(sets + 1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSets',
  components: {
    AppButtonSvg: () => import('../components/AppButtonSvg')
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
  border: 1px solid grey;

  &__title {
    font-size: 50px;
    text-align: center;
  }

  &__configuration {
    display: flex;
    align-items: center;
    justify-content: center;

    &__text {
      font-size: 60px;
      margin: 0 10px;
    }
  }

}
</style>
