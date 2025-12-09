import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import { router } from './router';
import { useAuthStore } from './stores/auth';


const app = createApp(App);

app.use(router);
app.use(createPinia());

const auth = useAuthStore();
auth.loadFromStorage();

app.mount("#app");
