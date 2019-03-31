<template>
  <div class="card">
    <div class="card-img-top" :data-duration="item.duration | moment">
      <div class="img" :style="{ backgroundImage: 'url(' + item.thumbnail + ')' }"></div>
    </div>
    <div class="card-body">
      <div class="card-title">{{ item.title || "- -" }}</div>
      <div class="card-content">
        <div class="views">
          <span class="views-icon">
            <i class="material-icons">headset</i>
          </span>
          <span class="views-text">{{ item.views || "- -" }}</span>
        </div>
        <div class="types">
          <!-- <button class="btn" :class="'btn-captions-' + captions" v-for="captions in item.captions" :key="captions">{{ captions }}</button> -->
          <button class="btn" :class="'btn-captions'">中文</button>
          <button
            class="btn"
            :class="'btn-level-' + item.level"
            v-if="item.level"
          >{{ item.level | levelText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          id: 52250,
          thumbnail:
            "https://cdn.voicetube.com/assets/thumbnails/QxjsWwgPjwM.jpg",
          title:
            "台北人英文真的超強？這部影片告訴你！(中英字幕) (Do They Speak English In Taiwan?)",
          views: 526816,
          collectCount: 200,
          duration: 316,
          publish: 1519880251,
          level: 1,
          captions: ["cht", "ja", "vi", "en"]
        };
      }
    }
  },
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
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&subset=chinese-traditional");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

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
</style>
