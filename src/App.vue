<template>
  <div id="app">
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

@font-face {
  font-family: 'Saira Condensed';
  src: url('./assets/fonts/SairaCondensed-SemiBold.ttf');
  font-style: normal;
  font-weight: 600;
}

@font-face {
  font-family: 'Saira Condensed';
  src: url('./assets/fonts/SairaCondensed-Bold.ttf');
  font-style: normal;
  font-weight: 700;
}

#app {
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
