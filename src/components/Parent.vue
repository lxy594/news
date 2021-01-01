<template>
  <div class="parentBox">
      <Parent :parentData="parentData.parent" v-if="parentData.parent" />
     <div class="parinfo">
        
         <div class="parhotuser">{{parentData.user.nickname}}</div>
         <div class="partime">2小时前</div>
     <div class="reply" @click="sendreply">回复</div>
     </div>
     <div class="parconyent">
 {{parentData.content}}
     </div>
     
  </div>
</template>

<script>
import eventBus from '@/ultis/eventBus'
export default {
    name:"Parent",
props:["parentData"],
methods: {
      sendreply(){
    // eventBus在触发用 $emit 给这个实例触发事件
    eventBus.$emit("sendMsg",this.parentData.id)
  }
},
}
</script>

<style lang="less" scoped>
 .parentBox {
      border:solid 1px #ccc;
      margin-bottom: 8/360*100vw;
        font-size: 16 /360 * 100vw;
        color: #3e3b38;
        padding: 3px;
    
   .parinfo{
       margin:6/360*100vw;
       align-items: center;
display: flex;
.parhotuser{
    color: #333;
    font-size: 16/360*100vw;
}
.partime{
     font-size: 14/360*100vw;
    margin-left: 10/360*100vw;
    flex-grow: 1;
    color: #9c9c9b;
}
.reply{
    color: #9c9c9b;
}
        }
    .parconyent{
        margin: 8/360*100vw;
    }
    }
</style>