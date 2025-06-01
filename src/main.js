import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import { createPinia, getActivePinia } from "pinia";

import App from "./App.vue";
import router from "./routes/index.js";
import { initPinia } from "./stores/index.js";

const app = createApp(App);
const pinia = createPinia();
// Check if Pinia is already active
initPinia(app);
try {
  getActivePinia();
} catch (e) {
  // If getActivePinia throws an error, Pinia is not registered, so register it
  app.use(pinia);
}

app.use(router);
app.mount("#app");
