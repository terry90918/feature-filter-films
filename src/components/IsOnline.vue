<template>
  <div class="is-online" :class="isOnline ? 'green' : 'red'">
    App VoiceTube Demo
    <b>{{ isOnline ? "is Online" : "is Offline" }} </b>
  </div>
</template>

<script>
export default {
  name: "IsOnline",
  data() {
    return {
      isOnline: window.navigator.onLine
    };
  },
  mounted() {
    window.addEventListener("online", () => (this.isOnline = true));
    window.addEventListener("offline", () => (this.isOnline = false));
  }
};
</script>

<style lang="scss" scoped>
.is-online {
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  padding: 5px;
  margin: 5px 0 0 5px;
  max-width: 100%;
}
.green {
  background-color: #42b983;
}
.red {
  background-color: tomato;
}
</style>
