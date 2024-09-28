import {createRouter, createWebHistory} from "vue-router";
import ErrorPage from "../components/ErrorPage.vue";
import Hello from "../components/Hello.vue";
import O1 from "../components/O1.vue";
import O2 from "../components/O2.vue";
// 注意history的不同选择：createMemoryHistory主要用于客户端，而createWebHistory用于一般页面
export default createRouter({
	history: createWebHistory(),
	routes: [{
		path: '/',
		component: Hello
	}, {
		path: '/:any(.*)',
		component: ErrorPage
	}, {
		path: '/O1',
		component: O1
	}, {
		path: '/O2',
		component: O2
	}
	]
});