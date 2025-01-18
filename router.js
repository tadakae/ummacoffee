import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/components/Main.vue';
import Menu from '@/components/Menu.vue';
import Cart from '@/components/Cart.vue';

const routes = [
    { path: '/', name: 'Home', component: Main },
    { path: '/menu', name: 'Menu', component: Menu },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        props: route => ({ cartItems: route.query.cartItems ? JSON.parse(route.query.cartItems) : [] }) // Передаем cartItems как props
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
