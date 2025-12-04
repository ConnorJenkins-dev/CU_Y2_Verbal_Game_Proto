import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import Dashboard from './Dashboard.vue';
import Auth from './Auth.vue';
import SttDemo from './SttDemo.vue';
import FlowchartShow from './FlowchartShow.vue';

const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Auth,
	},
	{
		path: '/sttdemo',
		name: 'SttDemo',
		component: SttDemo,
	},
	{
		path: '/flowchart',
		name: 'FlowchartShow',
		component: FlowchartShow,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
