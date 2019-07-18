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

    <!-- 分类 -->
    <div class="cate">
      <!-- 左边 -->
      <div class="left">
        <div
          v-for="(item,index) in dataList"
          :key="index"
          class="item"
          :class="{active:addActive==index}"
          @click="toggleIndex(index)"
        >
          <span>{{item.cat_name}}</span>
        </div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="head">
          <img
            class="img1"
            src="https://img30.360buyimg.com/babel/s590x470_jfs/t1/46063/10/4458/63659/5d22dc94E569f6b1b/5069a98ce009bd6c.jpg.webp"
            alt
          />
        </div>

        <div class="project" v-for="(item1,index1) in rightDatalist" :key="index1">
          <div class="item">
            <div class="title">
              <span class="xiegan">/</span>
              {{item1.cat_name}}
              <span class="xiegan">/</span>
            </div>
            <br />
            <div class="row">
              <div class="tuwen" v-for="(item2,index2) in item1.children" :key="index2">
                <a :href="'/pages/searchList/main?query='+item2.cat_name">
                  <img class="img2" :src="'https://autumnfish.cn/wx/'+item2.cat_icon" alt />
                </a>
                <span class="name">{{item2.cat_name}}</span>
              </div>
            </div>
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
      addActive: "",
      dataList: [],
      rightDatalist: [],
      selectIndex: 0
    };
  },

  methods: {
    // 点击切换下标，添加active类
    toggleIndex(index) {
      this.addActive = index;
      // 点击获取对应的数据源
      this.rightDatalist = this.dataList[index].children;
      console.log(this.rightDatalist);
    },

    async getData() {
      var res = await wxrequest({
        url: "api/public/v1/categories"
      });

      // console.log(res);
      const { message, meta } = res.data;
      if (meta.status == 200) {
        console.log(message);
        this.dataList = message;
        // 默认选中第一个
        this.rightDatalist = message[this.selectIndex].children;
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
@import "./cate.css";
</style>
