<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="content">
        <input type="text" class="input1" />
        <div class="sousuo">
          <icon type="search" size="16" />
          <span id="ss">搜索</span>
        </div>
      </div>
    </div>

    <!-- 轮播图 -->
    <swiper indicator-dots autoplay interval="3000" duration="300">
      <swiper-item v-for="(item,index) in lunbo" :key="index">
        <image :src="item.image_src" class="slide-image" width="355" height="150" />
      </swiper-item>
    </swiper>

    <!-- nav中间导航 -->
    <div class="nav">
      <div class="item" v-for="(item,index) in cate" :key="index">
        <img class="img" :src="item.image_src" alt />
        <span class="text">{{item.name}}</span>
      </div>
    </div>

    <!-- 楼层 -->
    <div class="floor" v-for="(item1,index1) in floor" :key="index1">
      <div class="head">
        <img class="img" :src="item1.floor_title.image_src" alt />
        <span class="title">{{item1.floor_title.name}}</span>
      </div>

      <div class="fashion">
        <img
          v-for="(item2,index2) in item1.product_list"
          :key="index2"
          class="img1"
          :src="item2.image_src"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
// 导入封装好的wx.request
import wxrequest from "../../utils/wxrequest.js";
export default {
  data() {
    return {
      lunbo: [],
      cate: [],
      floor: []
      // imgList: []
    };
  },

  methods: {
    // 轮播
    async getlunbo() {
      var res = await wxrequest({
        url: "api/public/v1/home/swiperdata"
      });

      // console.log(res);
      const { message, meta } = res.data;
      if (meta.status == 200) {
        this.lunbo = message;
      }
    },

    //nav分类
    async getcate() {
      var res = await wxrequest({
        url: "api/public/v1/home/catitems"
      });

      const { message, meta } = res.data;
      if (meta.status == 200) {
        this.cate = message;
      }
      // console.log(res);
    },

    // floor
    async getfloor() {
      var res = await wxrequest({
        url: "api/public/v1/home/floordata"
      });

      const { message, meta } = res.data;
      if (meta.status == 200) {
        this.floor = message;
        console.log(message);

        // message.forEach(item => {
        //   this.imgList = item.product_list;
        //   console.log(this.imgList);
        // });
      }
      // console.log(res);
    }
  },
  mounted() {
    this.getlunbo();
    this.getcate();
    this.getfloor();
  }
};
</script>

<style>
@import "./index.css";
</style>
