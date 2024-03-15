/// <reference path="../node_modules/vue-router/dist/vue-router.d" />
declare module "*.vue" {
	import type { DefineComponent } from "nativescript-vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
