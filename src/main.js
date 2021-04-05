import Vue from "vue";
import VueI18n from "vue-i18n";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  ConfigProvider,
  DatePicker,
  Dropdown
} from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Authorized from "@/components/Authorized";
import Auth from "@/directives/auth";
import queryString from "query-string";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/github.css";

Vue.config.productionTip = false;

Vue.use(VueHighlightJS);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(ConfigProvider);
Vue.use(DatePicker);
Vue.component("Authorized", Authorized);
Vue.use(Auth);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1154049_w87h4oeytph.js" // 在 iconfont.cn 上生成
});
Vue.component("IconFont", IconFont);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
