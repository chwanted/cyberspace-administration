import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Button,
  Cell,
  CellGroup,
  Field,
  Radio,
  RadioGroup,
  Uploader,
  Form,
} from "vant"; // 全局引入按需引入UI库 vant
import "vant/lib/index.css"; // 全局引入样式

const app = createApp(App); // 创建实例

app
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Radio)
  .use(RadioGroup)
  .use(Form)
  .use(Uploader);
app.use(router);

app.mount("#app");
