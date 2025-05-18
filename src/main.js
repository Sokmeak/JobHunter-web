import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./routes/index.js";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.mount("#app");
