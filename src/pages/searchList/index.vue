<template>
  <div>
    <!-- 搜索框 -->
    <div class="search" :style="{position:myposition}">
      <div class="content">
        <input type="text" class="input1" />
        <div class="sousuo">
          <icon type="search" size="16" />
          <span id="ss">搜索</span>
        </div>
      </div>
    </div>

    <div class="box" :style="{marginTop:marginTop}">
      <div class="head">
        <div class="content">
          <span
            class="name"
            v-for="(item,index) in nameList"
            :key="index"
            :class="{active:isActive==index}"
            @click="hasActive(index)"
          >{{item}}</span>
        </div>
      </div>

      <div class="neirong">
        <div class="item" v-for="(item,index) in searchData" :key="index">
          <a :href="'/pages/detail/main?id='+item.cat_id" style="display: inline-block;">
            <img class="img1" :src="item.goods_small_logo" alt />
          </a>
          <div class="text">
            <span class="projectdec">{{item.goods_name}}</span>
            <span class="price">
              ￥
              <span class="six">{{item.goods_price}}</span>.00
            </span>
          </div>
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
      nameList: ["综合", "销量", "价格"],
      isActive: "",
      searchData: "",
      // 搜索数据
      query: "",
      pagesize: 10, //页容量
      pagenum: 1,
      total: -1,
      flag: true,
      myposition: "static",
      marginTop: "0rpx"
    };
  },
  onLoad(value) {
    this.query = value.query;
  },
  methods: {
    hasActive(index) {
      this.isActive = index;

      // 点击价格，进行排序
      if (index == 2) {
        this.searchData.sort(function(a, b) {
          return b.goods_price - a.goods_price;
        });
      }
    },

    // 获取数据
    async getSearchData() {
      // 如果数据加载完毕，就不要再去加载数据
      // 默认情况下，两个是相等的，所以给total设置-1，默认请求一次
      if (this.searchData.length == this.total) {
        return;
      }
      // 打脸思想，解决数据卡顿的情况--上一次请求未结束，下一次请求开始的情况
      if (this.flag == false) {
        this.pagenum--; //页面还原
        return;
      }
      this.flag = false; //请求为发送完

      // console.log(this.query);
      const res = await wxrequest({
        url: `api/public/v1/goods/search?query=${this.query}&pagesize=${
          this.pagesize
        }&pagenum=${this.pagenum}`
      });
      this.flag = true;
      console.log(res);
      const { message, meta } = res.data;

      this.total = message.total;
      // 对数据进行拼接是为了能够还原之前的数据
      this.searchData = [...this.searchData, ...message.goods];
    }
  },

  // 上拉加载更多
  onReachBottom() {
    // 页码++，重新调用搜索数据的方法
    this.pagenum++;
    this.getSearchData();
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 对数据的重置
    this.query = "";
    this.pagesize = 10; //页容量
    this.pagenum = 1;
    this.flag = true;
    this.getSearchData();
  },

  // 滚动页面
  onPageScroll(scroll) {
    if (scroll.scrollTop == 0) {
      this.myposition = "static";
      this.marginTop = "0rpx";
    } else {
      this.myposition = "fixed";
      this.marginTop = "100rpx";
    }
  },

  mounted() {
    this.getSearchData();
    this.query = "";
    this.pagesize = 10; //页容量
    this.pagenum = 1;
    this.flag = true;
  }
};
</script>

<style scoped>
@import "./searchList.css";
</style>
