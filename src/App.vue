<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
import zh_CN from "ant-design-vue/es/locale/zh_CN";
import en_US from "ant-design-vue/es/locale/en_US";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      locale: zh_CN
    };
  },
  watch: {
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? en_US : zh_CN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    }
  }
};
</script>
