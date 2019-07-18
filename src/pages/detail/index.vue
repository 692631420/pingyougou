<template>
  <div>
    <div class="tophead">
      <!-- 轮播 -->
      <div class="banner">
        <swiper id="swiper" indicator-dots autoplay interval="3000" duration="300">
          <swiper-item >
            <image
              class="img1"
              
            />
          </swiper-item>
        </swiper>
      </div>

      <!-- 产品描述 -->
      <div class="project">
        <div class="price">￥279</div>
        <div class="jieshao">
          <div class="left">根据商品id获取该商品的详细信息根据商品id获取该商品的详细信息</div>
          <div class="right">收藏</div>
        </div>
        <div class="kuaidi">快递：免运费</div>
      </div>

      <!-- 促销 -->
      <div class="cuciao">
        <div class="one">
          促销
          <span class="text">满300减30</span>
        </div>
        <div class="two">
          已选
          <span class="text1">黑色/s</span>
        </div>
      </div>

      <!-- s送至 -->
      <div class="songzhi">
        送至
        <span class="adree">广东省</span>
      </div>

      <!-- 图文介绍 -->
      <div class="jieshao">
        <div class="head">
          <div class="left" @click="myactive=0" :class="{active:myactive==0}">图文介绍</div>
          <div class="right" @click="myactive=1" :class="{active:myactive==1}">规格参数</div>
        </div>
        <div class="xiangxi">
          <img
            class="img"
            src="https://img14.360buyimg.com/pop/s590x470_jfs/t1/50538/24/5241/44661/5d2d6e50Eef4447ea/0f8e1030ef20def4.jpg.webp"
            alt
          />
        </div>
      </div>

      <!-- 底部 -->
      <div class="foot">
        <div class="kefu">联系客服</div>
        <div class="car">购物车</div>
        <div class="joincar">
          <button>加入购物车</button>
        </div>
        <div class="buy">
          <button>立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wxrequest from "../../utils/wxrequest.js";
export default {
  data() {
    return {
      id: "",
      myactive: 0,
      dataList: []
    };
  },

  onLoad(params) {
    this.id = params.id;
    console.log(this.id);
  },

  methods: {
    async getData() {
      const res = await wxrequest({
        url: `api/public/v1/goods/detail?goods_id=${this.id}`
      });

      console.log(res);
      const { message, meta } = res.data;
      if (meta.status == 200) {
        this.dataList = message;
      }
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
@import "./detail.css";
</style>
