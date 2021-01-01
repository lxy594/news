<!--我的首页下面图片部分的组件-->
<template>
<!-- 
  1.这里可以用?id的传递./details?id='+postData.id  
    用mounted this.$router.query访问log
2.动态路由传参直接拼接id/details/'+postData.id 在mounted 
index.js path也要设置字段名带id 拿数据 this.$router.params.id
path: '/details/:id',
-->
  <div  @click="$router.push('/details/'+postData.id)">
    <div class="content" v-if="postData.type == 1 &&
          postData.cover.length > 0 &&
          postData.cover.length < 3"
    >
      <div class="content-left">
        <div class="content-one">{{ postData.title }}</div>
        <div class="con-foorder">
          <span class="mars">{{ postData.user.nickname }}</span>
          <span class="rami">{{ postData.comment_length }}跟帖</span>
        </div>
      </div>
      <img :src="postData.cover[0].url |fixImgurl" alt="" class="right" />
    </div>
<!-- 第三张 -->
    <div class="ymxpost" v-if="postData.type == 1 && postData.cover.length >= 3">
    <div class="title">{{postData.title}}</div>
    <div class="imgs">
      <img :src="postData.cover[0].url | fixImgurl" alt="" >
      <img :src="postData.cover[1].url | fixImgurl" alt="" >
      <img :src="postData.cover[2].url | fixImgurl" alt="" >
    </div>
      <div class="con-foorder">
          <span class="mars">{{ postData.user.nickname }}</span>
          <span class="rami">{{ postData.comment_length }}跟帖</span>
        </div>
    </div>

<!-- 视频播放部分 -->
    <div class="videos" v-if="postData.type == 2 && postData.cover.length > 0">
<div class="title3">{{postData.title}}</div>
<div class="imgvideo"> 
  <img :src="postData.cover[0].url |fixImgurl" alt="">
     <span class="iconfont iconshipin"></span>
</div>
<div class="con-foorder">
          <span class="mars">{{ postData.user.nickname }}</span>
          <span class="rami">{{ postData.comment_length }}跟帖</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postData"],
  
  data() {
    return {
      postList: []
    };
  },
  // created() {
  //   this.$axios({
  //     url: "/post"
  //   }).then(res => {
  //     console.log(res.data);
  //   });
  // }
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e4;
  padding: 15/360 * 100vw;
  .content-one {
    margin-left: 20/360*100vw;
    font-size: 14/360 * 100vw;
  }
  .content-left{
    padding-right: 8/360*100vw;

  }
}
.con-foorder {
  color: #868694;
  padding-top: 10/360 * 100vw;
    padding-left:10/360 * 100vw;
    .mars{
      padding-left: 10/360*100vw;
    }
  .rami {   
    padding-left: 10/360 * 100vw;
  }
  
}
   .right {
      width: 121/360 * 100vw;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
    .ymxpost{
 border-bottom: 1px solid #e4e4e4;
      margin-left: 10/360*100vw;
      padding: 17/360*100vw;
      
      .title{
font-size: 14/360*100vw
      }
      .imgs{
        padding-top: 8/360*100vw;
        display: flex;
   justify-content: space-between;
img{
  width: 33%;
  height:74/360*100vw ;
 object-fit: cover;
}
      }
    }
    .videos{
       border-bottom: 1px solid #e4e4e4;
       padding: 17/360*100vw;
    .title3{
 font-size: 14/360 * 100vw;
 padding-left: 12/360*100vw;
 padding-bottom: 10/360*100vw;
    }
    .imgvideo{
      display: flex;
      justify-content: center;
    align-items: center;
      position: relative;
      .iconshipin{
        color:#ffffff ;
position: absolute;
font-size: 46/360*100vw;
   width: 46/360*100vw;
        height: 46/360*100vw;
        background-color: #cccc;
        border-radius: 50%;
      }
      img{
        height:170/360*100vw;
      }
    }
    }
</style>
