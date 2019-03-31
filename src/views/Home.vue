<template>
  <div class="home">
    <section class="container">
      <IsOnline></IsOnline>
      <Alert :info="info"></Alert>
      <Navbar :sort="sort" @update:sort="updateSort"></Navbar>
      <section class="video-list">
        <template v-if="itemsSortTimeAndType.length > 0">
          <div
            class="col-xl-3 col-lg-4 col-md-6 col-sm-12 custom-card-layout"
            v-for="item in itemsSortTimeAndType"
            :key="item.id"
          >
            <Card :item="item"></Card>
          </div>
        </template>
        <template v-else>
          <div>沒有篩選結果</div>
        </template>
      </section>
    </section>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import Card from "@/components/Card.vue";
import IsOnline from "@/components/IsOnline.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Alert,
    Card,
    IsOnline,
    Navbar
  },
  data() {
    return {
      info: {
        type: "", // success, info, danger, warning
        message: ""
      },
      result: {
        status: false,
        data: []
      },
      sort: {
        time: "0",
        type: "publish"
      }
    };
  },
  mounted() {
    this.getVides();
  },
  computed: {
    itemsSortTimeAndType() {
      const vm = this;
      let key = Number(vm.sort.time);
      let newArray = [];
      switch (key) {
        case 0:
          newArray = vm.itemsSortType;
          break;
        case 1:
          newArray = vm.itemsSortType.filter(i => i.duration < 60 * 4);
          break;
        case 2:
          newArray = vm.itemsSortType.filter(
            i => i.duration > 60 * 4 && i.duration <= 60 * 10
          );
          break;
        case 3:
          newArray = vm.itemsSortType.filter(i => i.duration > 60 * 10);
          break;
        default:
          newArray = vm.itemsSortType;
          break;
      }
      return newArray;
    },
    itemsSortType() {
      const vm = this;
      let newData = vm.result.data.map(i => i);
      return newData.sort((a, b) =>
        a[vm.sort.type] < b[vm.sort.type] ? -1 : 1
      );
    }
  },
  methods: {
    async getVides() {
      const vm = this;
      const url =
        "https://us-central1-lithe-window-713.cloudfunctions.net/fronted-demo";
      try {
        const response = await fetch(url);
        vm.result = await response.json();
      } catch (err) {
        vm.info = {
          type: "danger",
          message: err
        };
      }
    },
    updateSort(val) {
      this.sort = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&subset=chinese-traditional");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.home {
  display: flex;
  justify-content: center;
  width: 100%;
  .container {
    width: 100%;
    max-width: 1366px;
    margin: 0 55px;
    .video-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-top: 31px;
      padding-left: calc(62px - 55px);
      padding-right: calc(62px - 55px);
      .custom-card-layout {
        min-width: 260px;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 10px;
        @media screen and (min-width: 1164px) {
          &:nth-child(4n + 1) {
            padding-left: initial;
          }
          &:nth-child(4n + 4) {
            padding-right: initial;
          }
        }
        @media screen and (min-width: 904px) and (max-width: 1163px) {
          &:nth-child(3n + 1) {
            padding-left: initial;
          }
          &:nth-child(3n + 3) {
            padding-right: initial;
          }
        }
        @media screen and (min-width: 644px) and (max-width: 903px) {
          &:nth-child(2n + 1) {
            padding-left: initial;
          }
          &:nth-child(2n + 2) {
            padding-right: initial;
          }
        }
        @media screen and (max-width: 643px) {
          & {
            padding: initial;
          }
        }
      }
    }
  }
}
</style>
