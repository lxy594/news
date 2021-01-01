<template>
  <div>
    <Topnav title="精彩跟帖"  />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <CommentMain
        :commentData="comment"
        v-for="comment in commentList"
        :key="comment.id"
      />
    </van-list>
   <Foodinput/>
  </div>
</template>

<script>
import Topnav from "@/components/Topnav.vue";
import CommentMain from "@/components/main.vue";
import Foodinput from "@/components/Foodinput.vue";
export default {
  components: {
    Topnav,
    CommentMain,
    Foodinput
  },
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      loading: false,
      finished: false,
      pageSize: 6,
    };
  },

  created() {
    this.getComment();
  },
  methods: {
    getComment() {
      this.$axios({
        url: "/post_comment/" + this.$route.params.id,
        params: {
          pageIndex: this.pageIndex,
          pageSize: 6
        }
      }).then(res => {
        console.log(res.data);
        //  this.commentList = res.data.data;
        this.commentList = [...this.commentList, ...res.data.data];
        this.loading = false;
        if (res.data.data.length < this.pageSize) {
          this.finished = true
        }
      });
    },
    onLoad() {
      this.pageIndex++;
      this.getComment();
    }
  }
};
</script>

<style>
</style>