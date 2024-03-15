import { createRouter } from "router-vue-native";
import Home from "~/components/Home.vue";
import Details from "~/components/Details.vue";
import Freetails from "~/components/Freetails.vue";

const routes = [
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/details",
		component: Details,
	},
	{
		path: "/freetails",
		component: Freetails,
	},
];

const router = createRouter({ routes });

router.beforeEach((to: any, from: any) => {
	// For example, verify per route access rules
	console.log(`From ${from.path} To ${to.path}`);

	return true;
});

export { router };
