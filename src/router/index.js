import { createRouter, createWebHistory } from 'vue-router';

//*** PAGES ***/
import HomePage from '@/pages/HomePage.vue';
import SearchPage from '@/pages/SearchPage.vue';


//*** INIT ***/
const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/search', name: 'search', component: SearchPage },

        // { path: '/not-found', name: 'not-found', component: NotFoundPage },
        // { path: '/:pathMatch(.*)*', redirect: '/not-found' },
    ],
});

export { router };