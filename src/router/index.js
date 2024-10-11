import {createRouter, createWebHistory} from "vue-router";
import ErrorPage from "../components/ErrorPage.vue";
import Hello from "../components/Hello.vue";
import A1 from "../components/A1.vue";
import A2 from "../components/A2.vue";
import A3 from "../components/A3.vue";
import A4 from "../components/A4.vue";
import A5 from "../components/A5.vue";
import A6 from "../components/A6.vue";
import A7 from "../components/A7.vue";
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
		path: '/A1',
		component: A1
	}, {
		path: '/A2',
		component: A2
	}, {
		path: '/A3',
		component: A3
	}, {
		path: '/A4',
		component: A4
	}, {
		path: '/A5',
		component: A5
	}, {
		path: '/A6',
		component: A6
	}, {
		path: '/A7',
		component: A7
	}
	]
});