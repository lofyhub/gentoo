import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createHead } from "unhead";

import "./style.css";

const pinia = createPinia();
createHead();

pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).mount("#app");
