<template>
  <div class="inputwrap">
    <!--三元 :class="isok?'':'error'" -->
    <!--通过使用 vue 提供的对象形式声明-->
    <!--autocomplete 属性规定输入字段是否应该启用自动完成功能
    on	默认。规定启用自动完成功能。
off	规定禁用自动完成功能。
    。-->
    <input
      autocomplete="off"
      @blur="showerrmessage"
      :class="{error:!isok}"
      :placeholder="placeholder"
      :type="type"
      v-model="value"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      isok: "true"
    };
  },
  //errmessage提供一个错误的提示信息,方便子组件提示用户
  props: ["placeholder", "type", "rule", "errmessage"],
  // 有wach来监听
  watch: {
    value(newvalue) {
      // 开头结尾三位数
      //   const pattern = /^\d{3}$/;

      // 输入三个合法否不合法
      if (this.rule.test(newvalue)) {
        console.log("合法");
        this.isok = true;
      } else {
        //   如果不正确通过父组件input框errmessage进行提示
        console.log(this.errmessage);
        this.isok = false;
      }
      // 校验以后要父组件发请求,每当发出改变我也进行改变
      this.$emit("setvalue", newvalue);
    }
  },
  methods: {
    showerrmessage() {
      // if (!this.isok) alert(this.errmessage);
      if (!this.isok)
        // this.$toast('不符合要求');

        this.$toast.fail("不符合要求");
    }
  }
};
</script>

 <style lang="less" scoped>
.inputwrap {
  margin-left: 15/360 * 100vw;
  padding-bottom: 16/360 * 100vw;
  input {
    text-indent: 1em;
    width: 91%;
    height: 48/360 * 100vw;
    line-height: 48/360 * 100vw;
    border: none;
    outline: none;
    border-bottom: 2px solid #757575;
  }
  .error {
    border-bottom: 2px solid red;
  }
}
</style>

<!--假如有多个类不建议用三元运算符-->