<template>
  <div>
    <Topnav title="栏目管理" @click.native="$router.push('/')" />
    <div class="remove">
      <div class="clickremove">点击删除频道</div>
      <div class="removeall" @click="removeall" >
        <i class="el-icon-delete"></i>
      </div>
    </div>

    <div class="removelist">
      <!-- 渲染删除栏目 -->
      <div
        class="item"
        v-for="(clickremove, index) in removelist"
        :key="clickremove.id"
        @click="deactive(index)"
      >
        {{ clickremove.name }}
      </div>
    </div>
    <div class="all">
      <div class="clickadde">点击添加频道</div>
    <div class="alladd" @click="alladd"><i class="el-icon-circle-plus-outline "></i></div>
    </div>
    <div class="addlist">
      <!-- 渲染点击的栏目-->
      <div
        class="item"
        v-for="(clickadd, index) in addlist"
        :key="clickadd.id"
        @click="activate(index)"
      >
        {{ clickadd.name }}
      </div>
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
      removelist: [],
      addlist: []
    };
  },
  created() {
    // 页面进来有数据恢复回来 刷新的时候数据依然在
    if (localStorage.getItem("removelist")) {
      this.removelist = JSON.parse(localStorage.getItem("removelist"));
    }
    if (localStorage.getItem("addlist")) {
      this.addlist = JSON.parse(localStorage.getItem("addlist"));
    } else {
      this.$axios({
        url: "/category"
      }).then(res => {
        this.removelist = res.data.data;
        console.log(res.data.data);
      });
    }
  },
  methods: {
    //  禁用分类 先放到上面再删除
    deactive(index) {
      if(this.removelist.length==1){
        return
      }
      this.addlist.push(this.removelist[index]);
      this.removelist.splice(index, 1);
    },
    activate(index) {
      this.removelist.push(this.addlist[index]);
      this.addlist.splice(index, 1);
    },
    // -------------点垃圾桶的时候全部在下面-----------------------
    removeall() {
    //   this.removelist.forEach((clickremove)=>{
    //   this.addlist.push(clickremove);
    //   });
    // this.removelist=[];
    this.addlist=[...this.addlist,...this.removelist]
    this.removelist=[]
     },
    
       // -------------点加的话全部在上面-----------------------
       alladd(index){
      //  this.addlist.forEach((clickadd)=>{
      // this.removelist.push(clickadd);
      //  })
      //   this.addlist=[];
      this.removelist=[...this.removelist,...this.addlist]
      this.addlist=[]
       }
    },
  watch: {
    //两个都存在本地存储中
    removelist() {
      //  转换为 JSON 字符串
      localStorage.setItem("removelist", JSON.stringify(this.removelist));
    },
    addlist() {
      localStorage.setItem("addlist", JSON.stringify(this.addlist));
    }
  }
};
</script>

<style lang="less" scoped>
.remove,
.all {
  display: flex;
  .clickremove,
  .clickadde {
    flex-grow: 1;
  }
  .removeall,
  .el-icon-circle-plus-outline {
    padding-right: 18/360 * 100vw;
    font-size: 20/360 * 100vw;
    color: #ccc;
  }
}
.clickremove,
.clickadde {
  font-size: 14/360 * 100vw;
  color: #ccc;
  margin-left: 10/360 * 100vw;
}
.removelist,
.addlist {
  padding: 9/360 * 100vw;
  font-size: 16/360 * 100vw;
  display: flex;
  flex-wrap: wrap;
  .item {
    border: 1px solid #888;
    padding-left: 12/360 * 100vw;
    padding-right: 8/360 * 100vw;
    margin: 10/360 * 100vw;
  }
}
</style>