<template>
  <nav class="navbar">
    <div class="col-sm-12">
      <div class="title">排續</div>
      <button
        class="btn"
        :class="{ active: 'publish' === sort.type }"
        @click="sort.type = 'publish'"
      >發佈時間</button>
      <button
        class="btn"
        :class="{ active: 'views' === sort.type }"
        @click="sort.type = 'views'"
      >觀看次數</button>
      <button
        class="btn"
        :class="{ active: 'collectCount' === sort.type }"
        @click="sort.type = 'collectCount'"
      >收藏次數</button>
    </div>
    <div class="col-sm-12">
      <div class="title">長度</div>
      <button class="btn" :class="{ active: '0' === sort.time }" @click="sort.time = '0'">不限</button>
      <button class="btn" :class="{ active: '1' === sort.time }" @click="sort.time = '1'">4 分鐘以下</button>
      <button class="btn" :class="{ active: '2' === sort.time }" @click="sort.time = '2'">5 - 10 分鐘</button>
      <button class="btn" :class="{ active: '3' === sort.time }" @click="sort.time = '3'">超過 10 分鐘</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    sort: {
      type: Object,
      default: function() {
        return { time: "hello", type: "publish" };
      }
    }
  },
  watch: {
    sort: function() {
      this.$emit("update:sort", this.sort);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(57px - 19px);
  padding: 8px 19px;
  .title,
  .btn {
    background-color: transparent;
    color: #787878;
    letter-spacing: 0;
    font-family: "Noto Sans TC", sans-serif;
    margin-right: calc(24px - 8px);
    padding: 4px 8px;
  }
  .title {
    display: inline-block;
    font-size: 14px;
    line-height: 21px;
  }
  .btn {
    border: none;
    cursor: pointer;
    font-size: 12px;
    line-height: 16px;
    &:focus {
      outline-color: white;
    }
    &.active {
      background: #4283e4;
      border-radius: 4px;
      color: white;
    }
  }
}
</style>
