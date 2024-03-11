<template>
    <AbsoluteLayout class="wrapper" ref="parent">
      <Label 
      ref="sliderTrack" 
      id="track" 
      backgroundColor="grey" 
      height="10" 
      width="100%" 
      :top="5" />
      <Label ref="minHandle" class="thumb1" id="minHandle" :left="20" @pan="panFunc"/>
      <Label ref="maxHandle" class="thumb2" id="maxHandle" :left="60" @pan="panFunc" />
    </AbsoluteLayout>
  </template>
  
  <script setup lang="ts">
import { GestureStateTypes, getViewById } from '@nativescript/core';
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
  
  const sliderTrack = ref<HTMLLabelElement>();
  const minHandle = ref<HTMLLabelElement>();
  const maxHandle = ref<HTMLLabelElement>();
  const parent = ref<HTMLAbsoluteLayoutElement>();
  const startX = ref(20);


  onMounted(() => {

  });
  

  const panFunc = (evt: NativePanGestureEvent<HTMLLabelElement>) => {
    const targetView = evt.view;
    const track = sliderTrack.value;
    if(!track || !parent.value || !minHandle.value) return;

    if(evt.state === GestureStateTypes.began){
      startX.value  = targetView.translateX;
    } 

    if(evt.state === GestureStateTypes.changed){
      const deltaX = startX.value - -evt.deltaX;
      if(targetView.id.toLowerCase() == 'maxHandle'.toLowerCase()){
        if((targetView.parent.getViewById('minHandle') as any).translateX >= deltaX){
          return;
        }
      }
      if(targetView.id.toLowerCase() == 'minHandle'.toLowerCase()){
        if((targetView.parent.getViewById('maxHandle') as any).translateX <= deltaX){
          return;
        }
      }
      targetView.translateX = deltaX;
    }

    if(evt.state === GestureStateTypes.ended){

    }
  };

  const isValidRange = () : boolean => {
    if(!sliderTrack.value || !maxHandle.value) return false;

    return true;
  }
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