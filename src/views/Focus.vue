<!--我的关注页-->
<template>
  <div>
    <Topnav title="我的关注" @click.native="$router.push('/User')" />

    <div class="newlist">
      <div class="items" v-for="item in FocusList" :key="item.id">
      <img class="tup" v-if="item.head_img" :src="$axios.defaults.baseURL+item.head_img" alt /> 
     <img class="tup" v-else src="@/assets/12.png" alt />
        <div class="centers">
          <div class="name">{{item.nickname}}</div>
          <div class="timedata">2020-11-23</div>
        </div>
        <div class="fellow" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import Topnav from "@/components/Topnav.vue";
export default {
  components: {
    Topnav
  },
  data() {
    return {
      FocusList: []
    };
  },
  created() {
   this.logpage();
  },
  methods: {
  logpage(){
     this.$axios({
      url: "/user_follows"
    }).then(res => {
      console.log(res.data, "123");
      this.FocusList = res.data.data;
    });
  },
  unfollow(userId){
   this.$axios({
      url: '/user_unfollow/'+userId,
    }).then((res)=>{
      console.log(res.data);
      // 重复调用返回数据请求
      this.logpage();
    });
  }
  },
};
</script>

<style lang="less" scoped>
.newlist {
  margin-top: 20/360 * 100vw;
  padding-left: 20/360 * 100vw;
  padding-bottom: 20/360 * 100vw;
  .items {
    height: 80/360*100vw;
    display: flex;
    align-items: center;
     border-bottom: 1px solid #707070;
    .tup {
      width: 40/360 * 100vw;
      height: 40/360 * 100vw;
      border-radius: 20/360 * 100vw;
    }
    .centers {
      flex-grow: 1;
      padding-left: 20/360 * 100vw;
      .name {
        font-size: 16/360 * 100vw;
      }
      .timedata {
        padding-top: 5/360 * 100vw;
        font-size: 14/360 * 100vw;
        color: #707070;
      }
    }
  }
  .fellow {
    width: 73/360 * 100vw;
    height: 30/360 * 100vw;
    background-color: #e1e1e1;
    border-radius: 15/360 * 100vw;
    font-size: 12/360 * 100vw;
    text-align: center;
    line-height: 30/360 * 100vw;
    margin-right: 15/360 * 100vw;
    color: #363636;
  }
}
</style>