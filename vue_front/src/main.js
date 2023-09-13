import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mixins from "./mixins";
//fort-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

library.add(fas, far, fab);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mixin(mixins)
  .mount("#app");

//if (!window.Kakao.isInitialized()) {
// JavaScript key를 인자로 주고 SDK 초기화
// window.Kakao.init("be3591e5eb435becf923984f4b447ac2");
// SDK 초기화 여부를 확인하자.
// console.log(window.Kakao.isInitialized());
// }
window.Kakao.init("be3591e5eb435becf923984f4b447ac2");
