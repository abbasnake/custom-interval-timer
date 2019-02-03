<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Setup</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './scss/variables';
@import './scss/reset';

#app {
  background-color: $black;
  min-height: 100%;
  width: 100%;
}
</style>
