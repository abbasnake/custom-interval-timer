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

@font-face {
  font-family: 'Saira Condensed';
  src: url('./assets/fonts/SairaCondensed-Regular.ttf');
  font-style: normal;
  font-weight: 400;
}

#app {
  min-height: 100%;
  width: 100%;
  max-width: 767px;
  margin: 0 auto;
}
</style>
