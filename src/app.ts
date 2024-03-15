import { createApp, registerElement } from "nativescript-vue";
import Home from "./components/Home.vue";
import { CoreTypes, TouchManager } from "@nativescript/core";
import RootView from "./components/RootView.vue";
import { router } from "~/plugins/router";

createApp(RootView).use(router).start();
