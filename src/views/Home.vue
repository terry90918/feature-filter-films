<template>
  <div class="home">
    <section class="container">
      <div class="alert" :class="'alert' + info.type" v-if="info.message">
        {{ info.message }}
      </div>
      <nav class="navbar">
        <div class="col-sm-12">
          <div class="title">排續</div>
          <button
            class="btn"
            :class="{ active: 'publish' === sort.type }"
            @click="sort.type = 'publish'"
          >
            發佈時間
          </button>
          <button
            class="btn"
            :class="{ active: 'views' === sort.type }"
            @click="sort.type = 'views'"
          >
            觀看次數
          </button>
          <button
            class="btn"
            :class="{ active: 'collectCount' === sort.type }"
            @click="sort.type = 'collectCount'"
          >
            收藏次數
          </button>
        </div>
        <div class="col-sm-12">
          <div class="title">長度</div>
          <button
            class="btn"
            :class="{ active: '0' === sort.time }"
            @click="sort.time = '0'"
          >
            不限
          </button>
          <button
            class="btn"
            :class="{ active: '1' === sort.time }"
            @click="sort.time = '1'"
          >
            4 分鐘以下
          </button>
          <button
            class="btn"
            :class="{ active: '2' === sort.time }"
            @click="sort.time = '2'"
          >
            5 - 10 分鐘
          </button>
          <button
            class="btn"
            :class="{ active: '3' === sort.time }"
            @click="sort.time = '3'"
          >
            超過 10 分鐘
          </button>
        </div>
      </nav>
      <section class="video-list">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-sm-12 custom-card-layout"
          v-for="item in itemsSortTimeAndType"
          :key="item.id"
        >
          <div class="card">
            <div class="card-img-top" :data-duration="item.duration | moment">
              <div
                class="img"
                :style="{
                  backgroundImage: 'url(' + item.thumbnail + ')'
                }"
              ></div>
            </div>
            <div class="card-body">
              <div class="card-title">{{ item.title || "- -" }}</div>
              <div class="card-content">
                <div class="views">
                  <span class="views-icon"
                    ><i class="material-icons">headset</i></span
                  >
                  <span class="views-text">{{ item.views || "- -" }}</span>
                </div>
                <div class="types">
                  <!-- <button class="btn" :class="'btn-captions-' + captions" v-for="captions in item.captions" :key="captions">{{ captions }}</button> -->
                  <button class="btn" :class="'btn-captions'">中文</button>
                  <button
                    class="btn"
                    :class="'btn-level-' + item.level"
                    v-if="item.level"
                  >
                    {{ item.level | levelText }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  filters: {
    captionsText(val) {
      return val;
    },
    levelText(val) {
      if (!val) return "";
      let text = "初級";
      switch (val) {
        case 1:
          text = "初級";
          break;
        case 2:
          text = "中級";
          break;
        case 3:
          text = "高級";
          break;
        default:
          text = "初級";
          break;
      }
      return text;
    },
    moment(val) {
      if (!val) return "--:--";
      let a = String((val / 60).toFixed(0));
      let b = String((val % 60).toFixed(0));
      if (a.length < 2) a = "0" + a;
      if (b.length < 2) b = "0" + b;
      return `${a}:${b}`;
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&subset=chinese-traditional");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

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
  .custom-card-layout {
    &:nth-child(3n + 1) {
      padding-left: initial;
    }
    &:nth-child(3n + 3) {
      padding-right: initial;
    }
  }
}
@media screen and (min-width: 644px) and (max-width: 903px) {
  .col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .custom-card-layout {
    &:nth-child(2n + 1) {
      padding-left: initial;
    }
    &:nth-child(2n + 2) {
      padding-right: initial;
    }
  }
}
@media screen and (max-width: 643px) {
  .col-sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .custom-card-layout {
    padding: initial;
  }
}

.home {
  display: flex;
  justify-content: center;
  width: 100%;
  .container {
    width: 100%;
    max-width: 1366px;
    margin: 0 55px;
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
        .card {
          background: #ffffff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          width: 240px;
          height: 228px;
          margin-bottom: 20px;
          .card-img-top {
            border-top-left-radius: calc(0.25rem - 1px);
            border-top-right-radius: calc(0.25rem - 1px);
            width: 100%;
            height: 135px;
            position: relative;
            overflow: hidden;
            &::before {
              content: attr(data-duration);
              position: absolute;
              right: 8px;
              bottom: 8px;
              background: rgba(0, 0, 0, 0.8);
              border-radius: 2px;
              padding: 2px;
              color: white;
              z-index: 1;
            }
            .img {
              max-width: 100%;
              height: 100%;
              background-size: cover;
              background-position: center;
              transition: 0.2s ease-in;
            }
          }
          .card-body {
            padding: 8px 4px;
            .card-title {
              font-family: "Noto Sans TC", sans-serif;
              font-size: 14px;
              color: #212b36;
              letter-spacing: 0;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .card-content {
              align-items: flex-start;
              display: flex;
              padding-top: 9px;
              padding-bottom: calc(21px - 8px);
              .views {
                display: flex;
                align-items: center;
                color: #787878;
                .views-icon {
                  width: 19px;
                  height: 19px;
                  margin-right: 5px;
                  .material-icons {
                    font-size: 19px;
                  }
                }
                .views-text {
                  font-family: "Noto Sans TC", sans-serif;
                  font-size: 14px;
                  letter-spacing: 0;
                  line-height: 20px;
                }
              }
              .types {
                align-self: flex-end;
                margin-left: auto;
                .btn {
                  border: none;
                  border-radius: 2px;
                  color: #ffffff;
                  cursor: pointer;
                  font-size: 12px;
                  letter-spacing: -0.03px;
                  margin-right: 8px;
                  padding: 2px 8px;
                  &:focus {
                    outline-color: white;
                  }
                  &.btn-chinese {
                    background: #4283e4;
                  }
                  &.btn-level {
                    &-1 {
                      background: #37c597;
                    }
                    &-2 {
                      background: #3a87ad;
                    }
                    &-3 {
                      background: #333;
                    }
                  }
                  &.btn-captions {
                    background: #4283e4;
                    color: white;
                    &-cha,
                    &-ja,
                    &-vi,
                    &-en,
                    &-cht {
                      background: #999;
                      color: white;
                    }
                  }
                }
              }
            }
          }
          &:hover {
            .card-img-top {
              .img {
                transition: 0.1s ease-out;
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
  }
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
