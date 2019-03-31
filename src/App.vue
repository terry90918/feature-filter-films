<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
}

@media screen and (min-width: 1164px) {
  .col-xl-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
@media screen and (min-width: 904px) and (max-width: 1163px) {
  .col-lg-4 {
    flex: 0 0 33.33%;
    max-width: 33.33%;
  }
}
@media screen and (min-width: 644px) and (max-width: 903px) {
  .col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
@media screen and (max-width: 643px) {
  .col-sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
