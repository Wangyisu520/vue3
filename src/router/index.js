import { useStore } from './../store/index';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/views/Home.vue")
    },
    {
        path: '/posts/new',
        name: 'NewPost',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/NewPost.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/posts/:id',
        name: 'ShowPost',
        component: () => import("@/views/ShowPost.vue")
    },
    {
        path: '/posts/:id/edit',
        name: 'EditPost',
        component: () => import("@/views/EditPost.vue"),
        meta: {
            requiresAuth: true
        }
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
router.beforeEach((to, from, next) => {
    const store = useStore();
    if (to.meta.requiresAuth && !store.getState().loginUser.currentUserId) {
        next({ name: "Home" });
    }
    else {
        next();
    }
});
export default router;
//# sourceMappingURL=index.js.map