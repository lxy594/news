<!--
编辑资料页面
-->
<template>
  <div class="bianjizliao">
    <!--组件有click.native
  @click.native="User"
    -->
    <Topnav title="编辑资料" @click.native="$router.push('/User')" />

<!--图片的组件插入-->
<div class="imgtu">
<van-uploader  :after-read="afterRead" >
      <img v-if="userInfo.head_img" :src="$axios.defaults.baseURL+userInfo.head_img" />
      <img v-else src="@/assets/12.png" alt />
      </van-uploader>
    </div>

    
    <PersonalCell lable="昵称" @click.native="isShowNickname=true" :desc="userInfo.nickname" />
    <PersonalCell lable="密码" @click.native="isShowpassword=true" desc="******" />
    <PersonalCell
      lable="性别"
      :desc="userInfo.gender== 0 ?'女':'男'"
      @click.native="showgender = true"
    />

    <div class="drops">
      <van-button class="dropbtn" color="linear-gradient(to right, #ff6034, #ee0a24)" @click.native="$router.push('/User')">保存</van-button>
    </div>

    <!--昵称的弹出修改的组件-->
    <van-dialog v-model="isShowNickname" show-cancel-button title="修改昵称" @confirm="setNickname">
      <van-field v-model="newNickname" placeholder="请输入昵称" />
    </van-dialog>

    <!--修改密码的弹出框-->
    <van-dialog v-model="isShowpassword" show-cancel-button title="修改密码" @confirm="setpassword">
      <van-field v-model=" newpassword" placeholder="请输入密码" />
    </van-dialog>
    <!--男女的的选择的组件-->
    <van-action-sheet
      v-model=" showgender"
      :actions="genderLister"
      @select="Setgender"
      cancel-text="取消"
    Sclose-on-click-action
    />
  </div>
</template>

<script>
import PersonalCell from "@/components/PersonalCell.vue";
import Topnav from "@/components/Topnav.vue";
export default {
  data() {
    return {
      userInfo: {},
      isShowNickname: false,
      newNickname: "",
      isShowpassword: false,
      newpassword: "",
      showgender: false,
      genderLister: [
        { name: "男", gender: 1 },
        { name: "女", gender: 0 }
      ]
    };
  },
  components: {
    PersonalCell,
    Topnav
  },
  created() {
    this.loadPage();
  },
  // 昵称框
  // 把它丢到一个函数里面,然后调用太
  methods: {
    loadPage() {
      this.$axios({
        url: "/user/" + localStorage.getItem("userId"),

     
      }).then(res => {
        console.log(res.data);
        // 解构
        const { data, message } = res.data;
        if (message === "获取成功") {
          this.userInfo = data;
        }
      });
    },

    setNickname() {
      const data = {
        nickname: this.newNickname
      };
      this.editprofile(data);
    },

    setpassword() {
      const data = {
        password: this.newpassword
      };
      this.editprofile(data);
    },
     // 6.1男女修改的组件
    Setgender(action) {
      console.log(action.gender);
      const data={
        gender:action.gender,
      }
      this.editprofile(data)
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showgender = false;
    },
    // 用函数吧它丢进去
    editprofile(data) {
      this.$axios({
        method: "post",
        url: "/user_update/" + localStorage.getItem("userId"),
      
        data
      }).then(res => {
        console.log(res.data);
        this.loadPage();
      });
    },
    afterRead(fileobj){
  // 此时可以自行将文件上传至服务器
      console.log(fileobj);
      //  2.1要上传出去的file属性,里面存放了图片的文件
      //要上传二进制文件需要用到FormData对象
      const fd=new FormData();
      fd.append("file",fileobj.file)
      console.log(fd.append);
      //发送真正的请求
      this.$axios({
        method:'post',
        url: "/upload",
        data:fd,
    
      }).then((res)=>{
        console.log(res.data)
        // 解构
        const {message,data}=res.data;
        if(message=="文件上传成功"){
          console.log(data.url)
          const newData={
            head_img:data.url,
          };
            this.editprofile(newData);
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.bianjizliao {
  width: 360/360 * 100vw;
}
.imgtu {
  margin-top: 20/360 * 100vw;
  text-align: center;
  img {
    // 怕图片变形
    object-fit: cover;
    width: 75/360 * 100vw;
    height: 75/360 * 100vw;
    border-radius: 50%;
  }
}
.drops {
  margin-top: 50/360 * 100vw;
  text-align: center;
  .dropbtn {
    width: 200/360 * 100vw;
    font-size: 17/360 * 100vw;
  }
}
</style>