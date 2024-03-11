<template>
    <AbsoluteLayout rows="*" columns="*" class="wrapper" ref="parent">
      <Label 
      row="0" 
      column="0" 
      ref="sliderTrack" 
      id="track" 
      backgroundColor="grey" 
      height="10" 
      width="100%" 
      :top="5" />
      <Label row="0" column="0" ref="minHandle" class="thumb1" @pan="panFunc"/>
      <Label row="0" column="0" ref="maxHandle" class="thumb2" @pan="panFunc" />
    </AbsoluteLayout>
  </template>
  
  <script setup lang="ts">
import { GestureStateTypes } from '@nativescript/core';
import { onMounted, ref, toRaw } from 'nativescript-vue';


  const props = defineProps({
    trackColor: {
      type: String,
      default: "gray",
    },
    handleColor: {
      type: String,
      default: "blue",
    },
  });
  
  const sliderTrack = ref();
  const minHandle = ref<HTMLLabelElement>();
  const maxHandle = ref<HTMLLabelElement>();
  const parent = ref<HTMLGridLayoutElement>();
  const startX = ref(20);


  onMounted(() => {

  });
  

  const panFunc = (evt: NativePanGestureEvent<HTMLLabelElement>) => {
    const targetView = evt.view;
    const track = sliderTrack.value;
    if(!track || !parent.value) return;

    if(evt.state === GestureStateTypes.began){
      startX.value  = targetView.translateX;
    } 

    if(evt.state === GestureStateTypes.changed){
      const deltaX = startX.value - -evt.deltaX;
      targetView.translateX = deltaX;
    }

    if(evt.state === GestureStateTypes.ended){

    }
  };
  </script>

<style scoped lang="scss" >
.wrapper{
  padding: 10;
}
.thumb1{
    border-radius: 50%;
    background-color:blue;
    height: 20;
    width: 20;
}
.thumb2{
    border-radius: 50%;
    background-color: red;
    height: 20;
    width: 20;
}
</style>