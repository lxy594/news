<template>
  <div class="footderin">
    <div v-if="!isActive" class="wirtemin">
      <!-- 这里绑定的model失去焦点的时候小框也有 -->
      <input
        type="text"
        placeholder="写跟帖"
        @focus="showText"
        v-model="content"
      />
      <div class="iconnum">
        <span class="iconfont iconpinglun-"></span>
        <div class="num">112</div>
      </div>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>

    <div class="manwrit" v-if="isActive">
      <textarea
        placeholder="回复:@火星网友"
        rows="3"
        @blur="hideText"
        ref="textarea"
        v-model="content"
      ></textarea>
      <div class="btnsend" @click="sendComment">发送</div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/ultis/eventBus'
export default {
  data() {
    return {
      isActive: false,
      content: "",
      parentid:""

    };
  },
  methods: {
    showText() {
      this.isActive = true;
      //也可以用延时器 settimeout也可以使用但是不知道什么时候完成是差的
      // setTimeout(() => {
      //   this.$refs.textarea.focus()
      // }, 100);
      // vue 提供了一个函数 叫做 nextTick,可以接受一个回调函数作为参数, 这个回调中的代码都会等待下一次渲染时再执行
      this.$nextTick(() => {
        // 显示以后聚焦|
        this.$refs.textarea.focus();
      });
    },
    // 隐藏
    hideText() {
      // 由于我的焦点导致我发送评论的时候发送失败此时我应该用延时器来留空系
      // 加延时器后我的请求发送就成功了
      setTimeout(() => {
         this.isActive = false;
    //  失去焦点后清空之前被回复的id
    this.parentid=""
      }, 100);
     
    },

    // 发表文章的请求
    sendComment() {
      this.$axios({
        method: 'post',
         url: "/post_comment/" + this.$route.params.id,
       data: {
         parent_id:this.parentid,
          content: this.content
        },
      }).then(res => {
        console.log(res.data);
        // 发送完毕后清空
        this.content="";
        // 每次评论完成后通知父组件
        this.$emit("reloadcomment")
      
 });
    }
  },
  // 用这个的时候 销毁的时候要 消除这个监听
  // off解绑
  mounted() {
    // 挂载完毕 监听
    eventBus.$on("sendMsg",(parentid)=>{
    this.showText();
  this.parentid=parentid
    })
  },
  // 解绑
  destroyed() {
    eventBus.$off("sendMsg")
  },

};
</script>

<style lang="less" scoped>
.footderin {
  background-color: #f2f2f2;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .wirtemin {
    margin-bottom: 80/360 * 100vw;
    height: 40/360 * 100vw;
    margin: 10/360 * 100vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    input {
      padding: 0 15/360 * 100vw;
      box-sizing: border-box;
      width: 180/360 * 100vw;
      height: 32/360 * 100vw;
      border-radius: 16/360 * 100vw;
      flex-grow: 1;
      border: none;
      outline: none;
      background-color: #d7d7d7;
    }
    .iconnum {
      position: relative;
      .num {
        background-color: red;
        top: -3px;
        left: 22px;
        position: absolute;
        color: #fff;
        width: 28/360 * 100vw;
        height: 16/360 * 100vw;
        font-size: 14/360 * 100vw;
        border-radius: 8/360 * 100vw;
        text-align: center;
      }
    }
    .iconfont {
      font-size: 24/360 * 100vw;
      margin-left: 20/360 * 100vw;
      font-weight: 600;
    }
  }
  .manwrit {
    padding: 10/360 * 100vw;
    display: flex;
    align-items: center;
    textarea {
      width: 260/360 * 100vw;
      height: 90/360 * 100vw;
      outline: none;
      border: none;
      background-color: #d7d7d7;
      border-radius: 10/360 * 100vw;
      padding: 10/360 * 100vw;
      // 隐藏右下角的小东西
      resize: none;
    }
  }
  .btnsend {
    font-size: 14/360 * 100vw;
    background-color: red;
    color: #fff;
    width: 59/360 * 100vw;
    height: 26/360 * 100vw;
    text-align: center;
    line-height: 26/360 * 100vw;
    border-radius: 26/360 * 100vw;
    margin-left: 10/360 * 100vw;
  }
}
</style>