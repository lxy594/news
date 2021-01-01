<!--搜索页面-->
<template>
  <div>
    <div class="header"></div>

    <!-- 搜索栏 -->
    <div class="searchs">
      <!-- 点击箭头时候当在输入框有字回去这是回去历史记录 而不是首页 -->
      <span class="iconfont iconjiantou2" @click="goback"></span>
      <div class="searchrapper">
        <span class="iconfont iconsearch"></span>
        <input
          type="text"
          placeholder="通灵兽消失"
          v-model="content"
          @keyup.enter="search"
        />
      </div>
      <div class="btnsearch"  @click="search">搜索</div>
    </div>

    <!-- 历史记录 -->
    <!--  v-if="postList.length===0"有文章就显示文章,历史记录隐藏 没有文章的时候历史记录显示出来-->
    <div class="historylog" v-if="postList.length===0">
      <div class="histadd"><h3>历史记录</h3><div class="removes" @click="removeall">删除</div></div>
      <div class="historylist">
        <div class="historysearch" v-for="(item,index) in history" :key="index">{{item}}</div>
 
      </div>
    </div>

    <!-- 热门搜索 -->
     <van-divider :style="{  borderColor: '#434446', padding: '0 16px' }">
  热门搜索
</van-divider>
    <div class="postList">
      <Postindex :postData="post" v-for="post in postList" :key="post.id" />
    </div>
  
  </div>
</template>

<script>
import Postindex from "@/components/Postindex.vue";
export default {
 components: {
    Postindex
  },
  data() {
    return {
      content: "",
      postList: [],
      history:[]
    };
  },
  // 去掉搜索字的的时候回去到历史记录
  watch:{
content(newValue){
  if(!newValue){
    this.postList=[]
  }
},
// 历史记录持久第一 数组变化的时候存到本地 localstrong只能存字符串
history(){
  localStorage.setItem('history',JSON.stringify(this.history))
}
  },
  created() {
    // 如果有历史记录刷新的时候历史记录依然在 (历史记录第二次持续进入页面时发现本地储存有历史数据,恢复)
  if(localStorage.getItem('history')){
    this.history=JSON.parse(localStorage.getItem('history'))
  }
  },
  methods: {
    search() {
      // 点击当前的搜索添加到历史记录
      // this.history.push(this.content)

      // 重复的不显示在历史记录 存在不放进去 没有在放进去????不生效
      if(this.history.indexOf(this.content) == -1){
        this.history.push(this.content);
      }


      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.content
        }
      }).then(res => {
        console.log(res.data);
        this.postList = res.data.data;
      });
    },goback(){
      // 点击箭头到时候如果有东西回到历史记录 否则回到首页
      if(this.postList.length>0){
        this.postList=[]
      }else{
        this.$router.back()
      }
    },
    removeall(){
      // 直接删除他的数组为空
    this.history=[];

    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 20/360 * 100vw;
  background-color: #757575;
}
.searchs {
  display: flex;
  margin-top: 12/360 * 100vw;
  align-items: center;
  .iconjiantou2 {
    margin: 10/360 * 100vw;
    color: #757575;
    font-size: 17/360 * 100vw;
    padding: 10 18/360 * 100vw;
    font-weight: 700;
  }
  .searchrapper {
    flex: 1;
    height: 37/360 * 100vw;
    width: 258/360 * 100vw;
    border: 1px solid #d8d8d8;
    border-radius: 30/360 * 100vw;
    text-align: center;
    line-height: 34/360 * 100vw;
    .iconsearch {
      color: #c9c9c9;
      font-size: 15/360 * 100vw;
      padding-right: 10/360 * 100vw;
    }
  }
  input {
    border: none;
    outline: none;
  }
  .btnsearch {
    margin: 12/360 * 100vw;
    font-size: 16/360 * 100vw;
  }
}
.historylog {
  padding-left: 15/360 * 100vw;
  h3 {
    padding-left: 10/360 * 100vw;
    font-size: 16/360 * 100vw;
  }
  .historylist {
    padding-bottom: 5/360 * 100vw;

    display: flex;
    flex-wrap: wrap;
    .historysearch {
      color: #333;
      font-size: 15/360 * 100vw;
      padding: 8/360 * 100vw;
    }
  }
}
.hostsearch {
  padding: 10/360 * 100vw;
  h3 {
    padding-left: 10/360 * 100vw;
    font-size: 16/360 * 100vw;
  }
}
//   .hostlist {
//     padding-right: 5/360 * 100vw;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     .hostsearch {
//       font-size: 15/360 * 100vw;
//     }
//   }
//
.histadd{
  display: flex;
  align-items: center;
  h3{
    flex-grow: 1;
  }
 .removes{
    padding-right: 15/360*100vw;
    font-weight: normal;
    color: #4d4d4d;
    font-size: 14/360*100vw;
  }
}
</style>