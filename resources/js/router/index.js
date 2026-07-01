import { createRouter, createWebHistory } from 'vue-router';
import UsersPage from '../pages/users/IndexPage.vue';
import UserDetailPage from '../pages/users/DetailPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersPage,
  },
  {
    path: '/users/:id',
    name: 'UserDetail',
    component: UserDetailPage,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/users',
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
