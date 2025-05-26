import { createApp } from "vue";
import App from "./App.vue";

// Import your router
import router from "./routes/index.js";

// Import Pinia
import { createPinia } from "pinia";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Custom CSS
import "./assets/main.css";

const app = createApp(App);

// Use Pinia for state management
const pinia = createPinia();
app.use(pinia);

// Use router
app.use(router);

app.mount("#app");
