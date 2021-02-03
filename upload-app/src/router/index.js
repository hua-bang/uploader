import { createRouter, createWebHashHistory } from 'vue-router';
import Home from "../views/home.vue"

const routerHistory = createWebHashHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        }
    ]
});

export default router;