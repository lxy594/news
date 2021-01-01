<!--我的跟帖-->
<template>
  <div>
    <Topnav title="我的跟帖" />

    <div class="content" v-for="comment in commentList" :key="comment.id">
      <div class="time">2020-12-1</div>
      <div class="parentcon" v-if="comment.parent">
        <div class="parreply">
          回复:{{ comment.parent.nickname || comment.parent.username }}
        </div>
        <div class="partext">{{ comment.parent.content }}</div>
      </div>
      <div class="maincont">{{ comment.content }}</div>
      <div class="sic" v-if="comment.post">原文:{{ comment.post.title }}</div>
      <div v-else class="sic">原文: 该帖子已被删除</div>
    </div>

    <div class="moreComment" v-if="commentList.length">
      更多跟帖<span class="jiantou">>></span>
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
      commentList: []
    };
  },
  created() {
    this.$axios({
      url: "/user_comments?pageSize=30"
    }).then(res => {
      console.log(res.data);
      this.commentList = res.data.data;
      // this.commentList=res.data.data
    });
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 14/360 * 100vw;

  border-bottom: 1px solid #e4e4e4;
  .time {
    color: #a0a0a5;
    margin-bottom: 10/360 * 100vw;
  }
  .parentcon {
    padding: 8/360 * 100vw;
    padding-left: 5/360 * 100vw;
    background-color: #e4e4e4;
    color: #929292;
    .parreply {
      font-size: 14/360 * 100vw;
    }
    .partext {
      padding-top: 6/360 * 100vw;
      font-size: 16/360 * 100vw;
    }
  }
  .maincont {
    padding: 12/360 * 100vw 0;
    font-size: 16/360 * 100vw;
  }
  .sic {
    padding: 10/360 * 100vw 0;
    color: #a3a3a3;
  }
}
.moreComment {
  text-align: center;
  color: #898989;
  padding: 20/360 * 100vw;
  .jiantou {
    padding-left: 5/360 * 100vw;
    font-size: 18/360 * 100vw;
    color: #d9d9d9;
  }
}
</style>