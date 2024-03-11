<template>
  <Frame>
    <Page :backgroundSpanUnderStatusBar="true">
        <RangeSlider 
        :max="100" 
        :min="0" 
        class="range"/>
    </Page>
  </Frame>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  $navigateTo,
} from 'nativescript-vue';
import Details from './Details.vue';
import RangeSlider from './RangeSlider.vue';

const counter = ref(0);
const message = computed(() => {
  return `Blank {N}-Vue app: ${counter.value}`;
});

function logMessage() {
  console.log('You have tapped the message!');
}

let interval: any;
onMounted(() => {
  console.log('mounted home component');
  interval = setInterval(() => counter.value++, 100);
});

onUnmounted(() => {
  console.log('unmounted');
  clearInterval(interval);
});
</script>



<style>
.range{
  margin-top: 10%;
}
</style>
