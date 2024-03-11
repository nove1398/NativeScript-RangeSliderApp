import { createApp, registerElement } from 'nativescript-vue';
import Home from './components/Home.vue';
import {GestureRootView, install} from '@nativescript-community/gesturehandler';
import { CoreTypes, TouchManager } from '@nativescript/core';

install();


createApp(Home)
.start();
