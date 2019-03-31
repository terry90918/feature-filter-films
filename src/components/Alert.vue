<template>
  <div class="alert" :class="'alert' + info.type" v-if="info.message">
    {{ info.message }}
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    info: {
      type: Object,
      default: function() {
        return {
          type: "",
          message: ""
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  &-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
}
</style>
