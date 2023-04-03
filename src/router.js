import { createRouter, createWebHistory } from 'vue-router';

import ApartmentList from './pages/ApartmentList.vue';
import HomePage from './pages/HomePage.vue';
import SingleApartment from './pages/SingleApartment.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/apartments',
            name: 'apartments',
            component: ApartmentList
        },

        {
            path: '/',
            name: 'home',
            component: HomePage
        },

        {
            path: '/apartments/:slug',
            name: 'apartment',
            component: SingleApartment
        },

    ]
});

export { router };