<!--文章详情列表
1.文章分成了两种视频和普通
-->
<template>
  <div>
    <div class="he"></div>
    <div v-if="postData.type == 1">
      <div class="header">
        <span class="iconfont iconjiantou2"></span>
        <span class="iconfont iconnew"></span>
        <!-- unfollow不生效 -->
        <div @click="handfollow"
        class="btnfocus"
         :class="{ unfollow: !postData.has_follow}">
         {{postData.has_follow ? "已关注" : "关注"}}</div>
      </div>
      <div class="matter">
        <h3 class="title">{{ postData.title }}</h3>
        <div class="info">
          {{ postData.user.nickname }}
          <span class="time">2020-11-27</span>
        </div>
        <!-- 这里页面是标签所以用html -->
        <div class="contents" v-html="postData.content"></div>
      </div>
    </div>

    <!-- 视频详情部分 -->
    <div class="videopost" v-if="postData.type == 2">
      <video
        class="imgvideo"
        poster="http://157.122.54.189:9083/uploads/image/IMG1606463030411.gif"
        controls
        src="https://video.pearvideo.com/mp4/third/20201126/cont-1709023-10724584-144334-hd.mp4"
      ></video>

      <!-- 点赞部分 -->
      <div class="vidhear">
        <img  class="vidimg" v-if="postData.user.head_img" :src="$axios.defaults.baseURL+postData.user.head_img" alt /> 
     <img  class="vidimg" v-else src="@/assets/12.png" alt />
        <!-- <img class="vidimg" src="@/assets/12.png" alt /> -->
        <div class="videoname">{{ postData.user.nickname }}</div>
        <!-- 我点关注的加-再点一次就取消 -->
        <div class="vidfellow" @click="handfollow"
        :class="{ unfollow: !postData.has_follow}">
        {{postData.has_follow ? "已关注" : "关注"}}</div>
      </div>
      <div class="vidcentent">{{ postData.title }}</div>
    </div>

    <div class="btnfooder"  @click="handgive">
      <div class="btn praise" :class="{has_like:postData.has_like }">
        <span class="iconfont icondianzan"></span>
        {{ postData.like_length }}
      </div>
      <div class="btn weixin">
        <span class="iconfont iconweixin"></span>
        微信
      </div>
    </div>
    
<!-- 评论部分 -->
<h2 class="wonderful">精彩跟帖</h2>

<!-- 组件 -->
 <CommentMain
      :commentData="comment"
      v-for="comment in commentList"
      :key="comment.id"
    />

    <div class="morefollowup" @click="$router.push('/Wondercom/'+$route.params.id)">更多跟帖</div>
 <!-- 评论完成后重新加载数据就不用刷新才有 -->
 <Foodinput @reloadcomment="reloadcomment"/>
  </div>
</template>

<script>
import CommentMain from "@/components/main";
import Foodinput from "@/components/Foodinput";
export default {
  components:{
    CommentMain,
    Foodinput
  },
  data() {
    return {
      postData: {},
         commentList: []
    };
  },
  created() {
    this.$axios({
      url: "/post/" + this.$route.params.id
    }).then(res => {
      console.log(res.data.data);
      this.postData = res.data.data;
    });
       this.reloadcomment()
  },
  methods: {
    reloadcomment(){
this.$axios({
          url: "/post_comment/"+this.$route.params.id
      }).then((res)=>{
        //截取他的条数
        if(res.data.data.length>4){
res.data.data.length=4
        }
          console.log(res.data)
             this.commentList = res.data.data;
      })
    },
    handfollow() {
      // 用户的关注的是关注用户
      if (this.postData.has_follow) {
        this.$axios({
          url: "/user_unfollow/" + this.postData.user.id
        }).then(res => {
          console.log(res.data);
          this.postData.has_follow = false;
        });
      } else {
        this.$axios({
          url: "/user_follows/" + this.postData.user.id
        }).then(res => {
          console.log(res.data);
          this.postData.has_follow = true;
        });
      }
    },
    handgive(){
       this.$axios({
            url: "/post_like/"+this.$route.params.id,
        }).then((res)=>{
            console.log(res.data);
            if(res.data.message==="取消成功"){
            this.postData.has_like= false;
            this.postData.like_length--;
            this.$toast.fail('取消成功')
            }
              if(res.data.message==="点赞成功"){
            this.postData.has_like= true;
            this.postData.like_length++;
            this.$toast.success('点赞成功')
              }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.he {
  height: 20/360 * 100vw;
  background-color: #757575;
}
.header {
  padding: 0 20/360 * 100vw;
  display: flex;
  align-items: center;
  .iconjiantou2 {
    font-size: 15/360 * 100vw;
  }
  .iconnew {
    padding-left: 10/360 * 100vw;
    flex-grow: 1;
    font-size: 54/360 * 100vw;
  }
  .btnfocus {
    width: 56/360 * 100vw;
    height: 18/360 * 100vw;
    border-radius: 9/360 * 100vw;
    border: 1px solid #ccc;
    font-size: 14/360 * 100vw;
    text-align: center;
    &.unfollow{
        border-color: red;
        background: red;
        color: #fff;
    }
  }
}
.matter {
  padding: 0 20/360 * 100vw;
  .info {
    font-size: 14/360 * 100vw;
    color: #868686;
    .time {
      padding-left: 14/360 * 100vw;
    }
  }
  .contents {
    margin-top: 20/360 * 100vw;
    font-size: 16/360 * 100vw;
    color: #333;
    /deep/ img {
      //  怕小的图片出现问题
      max-width: 100%;
    }
  }
}

.imgvideo {
  width: 100%;
  height: 180/360 * 100vw;
}
.vidhear {
  padding: 0 18/360 * 100vw;
  display: flex;
  align-items: center;
  .vidimg {
    object-fit: conver;
    width: 38/360 * 100vw;
    height: 38/360 * 100vw;
    border-radius: 50%;
  }
  .videoname {
    padding-left: 8/360 * 100vw;
    font-size: 15/360 * 100vw;
    color: #868686;
    flex-grow: 1;
  }
  .vidfellow {
    width: 58/360 * 100vw;
    height: 20/360 * 100vw;
    border-radius: 10/360 * 100vw;
    border: 1px solid #cccccc;
    text-align: center;
    font-size: 14/360 * 100vw;
    color: #333;  
      &.unfollow{
        border-color: red;
        background: red;
        color: #fff;
    } 
  }
}
.vidcentent {
  font-size: 16/360 * 100vw;
  color: #333;
  margin-top: 20/360 * 100vw;
  padding: 0 20/360 * 100vw;
}
.btnfooder {margin-top: 20/360*100vw;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 22/360*100vw;
  border-bottom: 4px solid #e4e4e4;
  .btn {
    height: 29/360 * 100vw;
    width: 62/360 * 100vw;
    border: 1px solid #cccccc;
    border-radius: 15/360 * 100vw;
    text-align: center;
    line-height: 29/360 * 100vw;
    font-size: 13/360 * 100vw;
      &.has_like {
    color: red;
  }
  }
  .icondianzan {
    font-size: 17/360 * 100vw;
  }
  .iconweixin {
    padding-left: 6/360 * 100vw;
    color: #44d344;
  }

}
.wonderful{
  text-align: center;-
  font-weight: normal;
}

.morefollowup{
  margin:20/360*100vw auto;
  margin-bottom: 66/360*100vw;
  font-size: 18/360*100vw;
  width: 121/360*100vw;
  height: 30/360*100vw;
  line-height: 30/360*100vw;
  border-radius: 15/360*100vw;
  text-align:center;
  border: 1px solid #797979;
  color: #868686;
}
</style>