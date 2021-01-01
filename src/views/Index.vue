<!--我的主页-->
<template>
  <div>
    <Indexhead />
    <van-tabs sticky v-model="activeindex">
      <van-tab 
        v-for="category in categoryall"
        :title="category.name"
        :key="category.id"
      >
        <!-- {{category.name}}内容 -->
        <!-- 跟我放下面一样 ,有变化的时候换掉postlist-->
        <!-- 利用组件实现无限滚动到底部  给 @load="...."触发事件
            :immediate-check="flase"   禁止初始化时检测位置
            给他绑定一个拉到底部只有请求一次没有请求那么多次
        -->
        <van-list 
        :finished="category.finished"
        finished-text="已经没有了"
         @load="onLoadmord"
          v-model="category.loading" 
          :immediate-check="false">
       <Postindex :postData="post" v-for="post in category.postList" :key="post.id" />
      </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Indexhead from "@/components/Indexhead.vue";
import Postindex from "@/components/Postindex.vue";
export default {
  components: {
    Indexhead,
    Postindex
  },
  data() {
    return {
      activeindex: 0,
      categoryall: [],
   
    };
  },

  // 监听
  watch: {
    //说明一个函数来监听太返回的数据 由于我封装了他所以我可以直接用
     activeindex(newVal) {
      //  如果点击的是最后一个索引, 就需要跳转页面
      if(newVal===this.categoryall.length - 1){
        this.$router.push("/manage")
      }else{

        //  console.log('watch');
        // 判断点击文章的时候如果我点击过回过头再去点击的时候不再有请求 我点你法请求可以但是我点回去不再有请求显示旧就行
          const currentCategory = this.categoryall[this.activeindex];
          if(currentCategory.postList.length==0)
        this.loadpost();
      }
    }
  },
  created() {
    // 如果本地存储有数据就在本地存储中获取 因为下面都是res.data.data所以构造一个
    if(localStorage.getItem("removelist")){
      const res = {
        data:{
          data:JSON.parse(localStorage.getItem("removelist"))
        },
      };
        // 通过map映射
        this.categoryall = res.data.data.map(item => {
          return {
            ...item,
            // 每次都存放在1数组里面
            postList: [],
             // 手动添加页数还有数据的条数 
             // 六条完成后我一直拼接新的东西进去 改网速慢的话可以看出来
               pageIndex:1,
                pageSize:6,
          // 只要拉到底部组件会自动改为true.,就不会再发送请求了
              loading:false,
              // 默认所有分类都没有加载
              finished:false,
          };
        });
  
  this.categoryall.push({
        name:"+",
      })
        // console.log(this.categoryall);
        this.loadpost();
    }else{
      this.$axios({
        url: "/category"
      }).then(res => {
        // console.log(res.data);
        // this.categoryall=res.data.data;
  
        // 通过map映射
        this.categoryall = res.data.data.map(item => {
          return {
            ...item,
            // 每次都存放在1数组里面
            postList: [],
             // 手动添加页数还有数据的条数 
             // 六条完成后我一直拼接新的东西进去 改网速慢的话可以看出来
               pageIndex:1,
                pageSize:6,
          // 只要拉到底部组件会自动改为true.,就不会再发送请求了
              loading:false,
              // 默认所有分类都没有加载
              finished:false,
          };
        });
  
  this.categoryall.push({
        name:"+",
      })
        // console.log(this.categoryall);
        this.loadpost();
      });
    }
  },
  methods: {
    // load的触发事件
    onLoadmord(){
      // 拿到当前的页码 索引加+再加载 或者++
      // 此时会先加载第一页再加载第2所以有问题?
  const currentCategory = this.categoryall[this.activeindex];
  currentCategory.pageIndex += 1
  this.loadpost();
    },
    // 先有分类再获取文章
    // // 定义一个新的
    loadpost() {
      // console.log('loadpost');
      // 拿当前激活的索引
      const currentCategory = this.categoryall[this.activeindex];
      this.$axios({
        url: "/post",
        params: {
          category:currentCategory.id,
            // 每个分类总结管自己的翻页条件
            pageIndex:currentCategory.pageIndex,
            pageSize:currentCategory.pageSize,
            


        }
      }).then(res => {
        console.log(res.data);
        //  this.postList = res.data.data;
        /*  复制了一遍 还是解开的两个数组合并了一份
        相当于解构 把旧数据解开变成新数据 之前获取的数据都覆盖 
        新数组拼接到旧数组的后面 这样子就不会覆盖 但是加载完毕的时候应该停止 
        它不知道什么时候加载完 所以应该告诉组件当前已经结束
        4.这里是已经加载完了所以应该结束currentcategory.loading=false*/
        currentCategory.postList = [
          ...currentCategory.postList,
          ...res.data.data,
        ];
        // console.log(this.categoryall);
        currentCategory.loading=false;
        /**
         *拉的时候一直往下拉会一直f发下去 形成死循环
         *因为我们前面v-model的 会一直发请求 加载算成功
         *finshed是否拉到底
         * 解决问题:如果判断到当前的分类没有应该将finshed设为ture
         * 判断拉到底方法有没有数据 对比数据长度跟我们要求的页面pagesize不够了 就改为ture
         * 
         * 我要求给我数据多少数据你给少了 说明没有数据了
         * 一旦上面的监听变为ture他就不会继续加载 把死循环给打破 还可以告诉他finished-text="我到底了"
         */
        if(res.data.data.length<currentCategory.pageSize){
          currentCategory.finished=true;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .van-tabs__nav {
 background-color: #e4e4e4; 
}
    /deep/ .van-tab:nth-last-child(2) {
        background: #fff;
        position: sticky;
        right: -8px;
        width: 44px;
        line-height: 44px;
        font-size: 30/360*100vw;
        background-color: yellow;
    }
</style> 
<!--
1.总结:
用组件包
1.2load拉到底的时候触发 每拉到底+1请求
2.immediate-check 禁止页面进来的时候马上发送翻页的请求
2.2v-model 判断是不是正在等待中
2.3finished 拉到底自动触发 判断是不是到最后length的长度 
果获取的数据长度小于参数设定的每页长度, 将 finished 设为 true
2.3.3finished-text 可以在加载完所有页面添加提示 
2.4页面进来的时候loading默认全部没有加载 
2.5finished-text 可以添加最后一页的底部提示
-->