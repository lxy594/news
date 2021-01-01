<template>
  <div>
    <div class="icon">
      <span class="iconfont iconicon-test" @click="$router.push('/')"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!--任意的六位数-->
    <MYinput
      errmessage="请输入任意二到六个"
      placeholder="请输入用户名/手机号"
      type="text"
      :rule="/^1[123456789]\d{9}$|^.{2,6}$/"
      @setvalue="setUsername"
    />
    <!--6到8位的数字-->
    <MYinput 
    @keyup.enter.native="login()"
      errmessage="请输入正确二到八位数字"
      placeholder="请输入密码"
      type="password"
      :rule="/^\d{2,8}$/"
      @setvalue="setPassword"
    />
     <div class="tis" @click="$router.replace('/register')"> 没有账号,去注册</div>
    <MYbutton btnText="登录"  @click.native="login" />
   
  </div>
</template>

<script>
import MYinput from "../components/MYinput";
import MYbutton from "../components/MYbutton";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    MYinput,
    MYbutton
  },
  methods: {
    setUsername(newvalue) {
      this.username = newvalue;
    },
    setPassword(newvalue) {
      this.password = newvalue;
    },
    login() {
      console.log(this.username, this.password);
      if (this.username.trim() != "" && this.password.trim() != "") {
        this.$axios({
          method: "post",
          url: "/login",
          data: {
            username: this.username,
            password: this.password
          }
        }).then(res => {
          console.log(res.data);
          // 解构
          const {message,data}=res.data;
          if (message == "登录成功") {
           
            this.$toast.success("登录成功");
          
            // 1. 这里是登录成功, 应该的将 token 存起来
            localStorage.setItem("token",data.token);
             localStorage.setItem('userId', data.user.id)

            // 2. 跳转到个人中心页(可以延时, 提升体验)
            setTimeout(() => {
              this.$router.push("/");
            }, 800);
          }
        });
      } 
    }
  }
};
</script>

 <style lang="less" scoped>
.icon {
  padding: 24 /360 * 100vw;
  .iconicon-test {
    font-size: 27 /360 * 100vw;
  }
}
.logo {
  text-align: center;
  .iconnew {
    font-size: 126 /360 * 100vw;
    color: yellowgreen;
  }
}
.tis{
  margin-left: 15/360*100vw;
  margin-bottom: 10/360*100vw;
  color: #e7bf22;
}
</style>

<!--
总结:通过增加class值来动态的提醒用户输入的是否正确
-->