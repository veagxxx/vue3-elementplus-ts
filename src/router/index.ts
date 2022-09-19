import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue")
const Home = () => import("@/pages/Home/Home.vue")
const Details = () => import("@/pages/Home/components/Details.vue")
const Map = () => import("@/pages/Charts/Map.vue")
const ChatRoom = () => import("@/pages/ChatRoom/ChatRoom.vue")
const NotFound = () => import("@/pages/NotFound/NotFound.vue")
const Login = () => import("@/pages/Login/Login.vue")
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // component: Layout,
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/index",
    name: "index",
    component: Layout,
    redirect: '/markdown',
    children: [
      { path: "/markdown", name: "markdown", component: Home },
      { path: "/markdown/details/:blogId", name: "Details", component: Details },
      { path: "/charts/map", name: "map", component: Map },
      { path: "/chat-room", name: "waiting", component: ChatRoom },
    ]
  },
  // 配置404页面
  {
    path: '/:pathMatch(.*)',
    component: NotFound
  },
]
const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
export default router