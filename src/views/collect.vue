
<!--我的收藏页-->
<template>
  <div>
      <Topnav title="我的收藏" @click.native="$router.push('/User')"/>
      <Postindex :postData="post"  v-for="post in postList" :key="post.id"/>
  </div>
</template>

<script>
import Topnav from "@/components/Topnav.vue";
 import Postindex from "@/components/Postindex.vue";
export default {
    data() {
        return {
            postList:[]
        }
    },
components:{
    Topnav,
    Postindex
},created(){
     this.$axios({
        url: "/user_star"
    }).then((res)=>{
        console.log(res.data)
           this.postList = res.data.data;
    })
    // 手动添加收藏数据
    ,this.$axios({
        url: '/post_star/13',
    }).then(res=>{
        console.log(res.data);
    })
  }
}

</script>

<style>

</style>