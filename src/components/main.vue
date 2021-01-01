<!--
1.主评论
-->
<template>
  <div class="box">
    <div class="info">
      <!-- 这里是用src -->
          <!-- <img :src="commentData.user.head_img | fixImgurl" /> -->
          <!-- 两条简化成一条 -->
        <img v-if="commentData.user.head_img" :src="$axios.defaults.baseURL+commentData.user.head_img" />
      <img v-else src="@/assets/12.png" alt />
      <div class="contes">
        <div class="hotpeople">{{commentData.user.nickname}}</div>
        <div class="time">2小时前</div>
      </div>
      <div class="reply" @click="sendreply">回复</div>
    </div>
    <Parent :parentData="commentData.parent" v-if="commentData.parent"/>
    <!-- 评论的内容在这里 -->
     <div class="miancont"> 
{{commentData.content}}
     </div>
    
  </div>
</template>

<script>
import Parent from './Parent.vue'
import eventBus from '@/ultis/eventBus'
export default {
props:['commentData'],
components:{
  Parent
},
methods: {
  sendreply(){
    // eventBus在触发用 $emit 给这个实例触发事件
    eventBus.$emit("sendMsg",123)
  }
},
}
</script>

<style lang="less" scoped>
.box{
  border-bottom: 1px solid #ededed;
  margin: 4px;
  padding: 4px;
  .info{
    align-items: center;
    display: flex;
    padding: 10/360*100vw;
    img{
      width: 35/360*100vw;
      height: 35/360*100vw;
      border-radius: 50%;
    }
    .contes{
      margin-left: 10/360*100vw;
      flex-grow: 1;
      .hotpeople{
        font-size: 16/360*100vw;
      }
      .time{
        font-size: 14/360*100vw;
        color: #9c9c9b;
      }
    }
    .reply{
      color: #9c9c9b;
    }
  }
  .miancont{
  
   font-size: 16/360*100vw;
   color: #333;
   margin:8/360*100vw;
  }
}
</style>