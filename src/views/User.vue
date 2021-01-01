<!--点击进入编辑页-->
<template>

  <div>
   <Topnav title="个人中心" @click.native="$router.replace('/')"/>

    <div class="iconuser" @click="$router.push('/Complice')">
      <div class="icon-center">
      <!--有头像就是渲染的头像的否则就是默认的-->
        <img v-if="userInfo.head_img" :src="$axios.defaults.baseURL +  userInfo.head_img" alt />
        <img v-else src="@/assets/12.png"/>
        <div class="wenzi">
          <span
            class="iconfont"
            :class="{iconxingbienan:userInfo.gender ==1,iconxingbienv:userInfo.gender ==0 }"
          ></span>
          <!--要么有写昵称就是昵称否则就是用户名-->
          <span class="wsw">{{userInfo.nickname||userInfo.username}}</span>
          <div class="daytime">2019-10-10</div>
        </div>

        <div class="jt1">
          <span class="iconfont iconjiantou1" ></span>
        </div>
      </div>
    </div>

    <div class="solids"></div>

    <PersonalCell lable="我的关注" desc="关注的用户" @click="$router.push('/focus')" />

    <PersonalCell lable="我的跟帖" desc="过帖/回复" @click="$router.push('/comment')" />

    <PersonalCell lable="我的收藏" desc="文章/视频" @click="$router.push('/collect')" />

    <PersonalCell lable="设置" @click="$router.push('/Complice')" /> 
    <div class="drops">
       <van-button @click="logdrop" class="dropbtn" color="linear-gradient(to right, #ff6034, #ee0a24)" >
退出
</van-button>
    </div>
 
  </div>
</template>

<script>
import PersonalCell from "../components/PersonalCell.vue";
import Topnav from "../components/Topnav.vue";
export default {
   components: {
    PersonalCell,
    Topnav
  },
  data() {
    return {
      userInfo: {}
    };
  },
created(){
            // 页面创建成功, 可以拿到 token
            console.log('到了个人中心页');
            console.log(localStorage.getItem('token'));
            // 页面获取数据
            this.$axios({
                url: '/user/' + localStorage.getItem('userId'),
                // 如果需要带上 toke 验证, 固定写法
              
            }).then(res=>{
              console.log(res.data);
                // 解构
                const {message,data}=res.data;
                if(message=="获取成功"){
  this.userInfo = data;
                }
            });
        },
 
  //   点击的时候我知道是什么东西
  methods: {
  
  logdrop(){
    // 退出的时候本地删除token以及userid 路由跳转到登录款
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.$router.replace('/');
  },
  },
};
</script>

<style lang="less" scoped>
.herd {
  width: 360/360 * 100vw;
  height: 24/360 * 100vw;
  background-color: #757575;
}
.iconuser {
  display: flex;
  width: 360/360 * 100vw;
  height: 140/360 * 100vw;

  .icon-center {
    display: flex;
    padding-top: 35/360 * 100vw;
    img {
      margin-left: 30/360 * 100vw;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
    }
  }
  .wenzi {
    width: 200/360 * 100vw;
    padding-top: 10/360 * 100vw;
    padding-left: 20/360 * 100vw;
    .iconxingbienan {
      width: 18/360 * 100vw;
      height: 19/360 * 100vw;
      color: #7ecef3;
    }
    .iconxingbienv {
      color: #f43dbf;
    }
    .wsw {
      padding-left: 10/360 * 100vw;
      font-size: 16/360 * 100vw;
    }
    .daytime {
      font-size: 15/360 * 100vw;
      padding-top: 8/360 * 100vw;
      color: #cebcac;
    }
  }

  .iconjiantou1 {
    padding-top: 20/360 * 100vw;
    width: 17/360 * 100vw;
    height: 17/360 * 100vw;
    font-weight: 700;
    display: block;
    font-size: 20/360 * 100vw;
    color: #d9d9d9;
  }
}
.solids {
  width: 360 /360 * 100vw;
  height: 5 /360 * 100vw;
  background-color: #e4e4e4;
}
.drops{
  margin-top: 50/360*100vw;
  text-align: center;
  .dropbtn{
    width: 200/360*100vw;
    font-size: 17/360*100vw;
  }
}
</style>