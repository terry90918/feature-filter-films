<template>
  <div id="app">
    <div :class="isOnline ? 'green' : 'red'">
      Awesome Vue.js PWA
      <b>{{ isOnline ? "is Online" : "is Offline" }} </b>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
}
</style>
