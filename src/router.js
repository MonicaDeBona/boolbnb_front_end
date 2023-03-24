import { createRouter, createWebHistory } from 'vue-router';

import ApartmentList from './pages/ApartmentList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/apartments',
            name: 'apartments',
            component: ApartmentList
        },

    ]
});

export { router };