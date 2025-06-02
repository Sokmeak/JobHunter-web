// store/index.js
import { createPinia } from "pinia";
let piniaInstance;

export function initPinia(app) {
  piniaInstance = createPinia();
  app.use(piniaInstance);
}

export function getPiniaInstance() {
  if (!piniaInstance) throw new Error("Pinia not initialized yet!");
  return piniaInstance;
}
