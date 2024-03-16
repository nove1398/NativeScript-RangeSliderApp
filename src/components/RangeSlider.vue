<template>
	<AbsoluteLayout
		class="wrapper"
		:onLayoutChanged="layoutChanged">
		<StackLayout
			orientation="horizontal"
			class="slider-text">
			<Label :text="`Min ${minAgeValue} - Max ${maxAgeValue}`" />
		</StackLayout>
		<ContentView
			id="track"
			ref="mainTrack"
			class="slider-track"
			:backgroundColor="trackColor"
			width="100%" />
		<ContentView
			ref="rangeTrack"
			class="range-track"
			:width="rangeTrackWidth"
			backgroundColor="purple"
			id="rangetrack" />
		<ContentView
			class="thumb1"
			ref="minHandle"
			id="minHandle"
			@pan="panGestureCallback" />
		<ContentView
			ref="maxHandle"
			class="thumb2"
			id="maxHandle"
			@pan="panGestureCallback" />
	</AbsoluteLayout>
</template>

<script setup lang="ts">
	import { refView } from "@nativescript-use/vue";
	import { AbsoluteLayout, ContentView, GestureStateTypes, Screen, Utils, View } from "@nativescript/core";
	import { onMounted, ref } from "nativescript-vue";

	const props = defineProps({
		trackColor: {
			type: String,
			default: "gray",
		},
		handleColor: {
			type: String,
			default: "blue",
		},
		initialMinHandle: {
			type: Number,
			default: 35,
			required: false,
		},
		initialMaxHandle: {
			type: Number,
			default: 50,
			required: false,
		},
	});

	const startX = ref(0);
	const trackWidth = ref(0);
	const mainTrack = refView<ContentView>();
	const maxHandle = refView<ContentView>();
	const minHandle = refView<ContentView>();
	const handleWidth = 20;
	const trackStartX = ref();
	const rangeTrack = refView<ContentView>();
	const rangeTrackWidth = ref();
	const maxAgeValue = ref();
	const minAgeValue = ref();

	onMounted(() => {
		console.log("Onmounted RangeSlider");
	});

	const layoutChanged = (evt: any) => {
		const trackView = evt.object as HTMLContentViewElement;
		trackStartX.value = trackView.getLocationInWindow().x;
		trackWidth.value = Math.floor(trackView.getActualSize().width);
		maxHandle.value.translateX = trackWidth.value / 2 + 20;
		minHandle.value.translateX = props.initialMinHandle;

		calculateRangeTrack();
		calculateValueRange();
	};

	const panGestureCallback = (evt: NativePanGestureEvent<HTMLContentViewElement>) => {
		const targetView = evt.view;
		const isMaxHandle = targetView.id.toLowerCase() === "maxhandle";
		const isMinHandle = targetView.id.toLowerCase() === "minhandle";
		const handleBuffer = 40;
		const halfTrackWidth = trackWidth.value / 2;

		if (evt.state === GestureStateTypes.began) {
			startX.value = targetView.translateX;
		}

		if (evt.state === GestureStateTypes.changed) {
			const deltaX = startX.value + evt.deltaX;

			// Apply deltaX with constraint checks for both handles
			if (isMaxHandle) {
				const minHandlePos = minHandle.value.translateX + handleBuffer;
				const lowerBounds = Math.max(halfTrackWidth, minHandlePos);
				targetView.translateX = Math.max(lowerBounds, Math.min(deltaX, trackWidth.value - handleWidth));
			} else if (isMinHandle) {
				const maxHandlePos = maxHandle.value.translateX - handleBuffer;
				const upperBounds = Math.max(0, Math.min(deltaX, halfTrackWidth, maxHandlePos));
				targetView.translateX = upperBounds;
			}

			// Update the range between handles
			calculateRangeTrack();

			calculateValueRange();
			console.log("Current translateX: " + targetView.translateX);
		}

		if (evt.state === GestureStateTypes.ended) {
			const isMaxHandle = targetView.id.toLowerCase() === "maxhandle";
		}
	};

	// Calculate range value
	const calculateRangeTrack = () => {
		const rangeTrackTot = Math.max(0, maxHandle.value.translateX - (minHandle.value.translateX + handleWidth));
		rangeTrack.value.translateX = rangeTrack.value.translateX = minHandle.value.translateX + handleWidth;
		rangeTrackWidth.value = rangeTrackTot;
	};

	// Calculate values for range handles
	const calculateValueRange = () => {
		const minValue = 18; // Minimum age in the range
		const maxValue = 100; // Maximum age in the range

		const minHandleValue =
			Math.max(0, (minHandle.value.translateX - trackStartX.value) / (trackWidth.value - handleWidth)) * 100;
		const maxHandleValue =
			Math.max(0, (maxHandle.value.translateX - trackStartX.value) / (trackWidth.value - handleWidth)) * 100;

		// Map percentages to actual ages within the range
		const minHandlePercent = Math.floor(minValue + (minHandleValue / 100) * (maxValue - minValue));
		const maxHandlePercent = Math.floor(minValue + (maxHandleValue / 100) * (maxValue - minValue));
		minAgeValue.value = minHandlePercent;
		maxAgeValue.value = maxHandlePercent;
	};
</script>

<style scoped lang="scss">
	.wrapper {
		padding-top: 10;
		padding-bottom: 10;
		background-color: green;
		align-items: center;
		justify-content: center;
	}
	.range-track {
		background-color: blueviolet;
		height: 5;
		margin-top: 36;
		border-radius: 50;
	}
	.slider-track {
		border-radius: 50;
		height: 5;
		margin-top: 36;
	}
	.slider-text {
		margin-top: 10;
		margin-left: 30%;
		color: white;
	}
	.thumb1 {
		margin-top: 30;
		border-radius: 50%;
		border-width: 1;
		border-color: lightblue;
		border-style: solid;
		background-color: blue;
		height: 20;
		width: 20;
		&:active {
			border-width: 3;
			border-color: red;
		}
	}
	.thumb2 {
		margin-top: 30;
		border-radius: 50%;
		background-color: blue;
		height: 20;
		width: 20;
	}
	.active {
		background-color: black;
	}
</style>
