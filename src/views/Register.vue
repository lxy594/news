<template>
  <div>
    <div class="icon">
      <span class="iconfont iconicon-test" @click="$router.push('/')"></span>
    </div>

    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <MYinput
      errmessage="请输入正确的用户名/11位手机号码"
      placeholder="请输入用户名/11位手机号码"
      type="text"
      :rule="/^1[123456789]\d{9}$|^.{2,6}$/"
      @setvalue="setUsername"
    />
    <MYinput
      errmessage="请输入至少二到六昵称"
      placeholder="昵称"
      type="text"
      :rule="/^.{2,6}$/"
      @setvalue="setNickname"
    />
    <MYinput
    @keyup.enter.native="Register()"
      errmessage="请输入正确六到八位数字"
      placeholder="请输入密码"
      type="password"
      :rule="/^\d{6,8}$/"
      @setvalue="setPassword"
    />
 <div class="tis" @click="$router.replace('/login')"> 有账号,去登录</div>
    <MYbutton btnText="注册" @click.native="Register" />
  </div>
</template>


<script>
import MYinput from "../components/MYinput";
import MYbutton from "../components/MYbutton";
export default {
  data() {
    return {
      username: "",
      nickname: "",
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
    setNickname(newvalue) {
      this.nickname = newvalue;
    },
    setPassword(newvalue) {
      this.password = newvalue;
    },
    // if(username=='username'){
    //   this.$toast('用户名已被使用过')
    // }
    Register() {
      //$.trim() 函数用于去除字符串两端的空白字符。
      if (this.username.trim() != "" && this.nickname.trim() != ""&& this.password.trim() != "") {
        this.$axios({
          method: "post",
          url: "/register",
          data: {
            username: this.username,
            password: this.password,
            nickname: this.nickname,
          }
        }).then(res => {
          console.log(res.data);
          if (res.data.message == "注册成功") {
            this.$toast.success("注册成功");
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped >
.iconicon-test {
  padding: 24 /360 * 100vw;
  font-size: 27 /360 * 100vw;
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
1.子组件进行   // 校验以后要父组件发请求,每当发出改变我也进行改变
      this.$emit('setvalue',newvalue)
      2.input框进行绑定对应的
      1. 绑定按钮事件   @setvalue="setUsername"
 @setvalue="setPassword" @setvalue="setNickname"


1. 绑定按钮事件
2. 发送请求:
 参数: data() {
    return {
      username:"",
      nickname:"",
      password:""
    }
  },
  方法: methods: {
  setUsername(newvalue){
    this.username=newvalue;
  },
  setNickname(newvalue){
    this.nickname=newvalue;
  },
  setPassword(newvalue){
    this.password=newvalue;
  },
   - 查看 api 文档
   -3.1 发送 ajax 请求:
   Register(){
  this.$axios({
    method:"post",
    url: 'http://157.122.54.189:9083/register',
    data: {
      username:this.username,
      password:this.password,
      nickname:this.nickname,
    }
  }).then((res)=>{
    console.log(res.data)
    if(res.data.message=='注册成功'){
    this.$toast.success('注册成功')

    }
  })
3. 根据返回数据弹出弹框
   - 成功
   - 失败

### 步骤

1. 绑定按钮事件
2. 发送请求
3. 根据返回数据如果成功, 本来应该跳转到个人中心页,现在用弹窗代替
4. 请求发送前校验数据
5. 处理错误
-->