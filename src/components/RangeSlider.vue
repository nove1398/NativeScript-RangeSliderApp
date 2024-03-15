<template>
	<AbsoluteLayout class="wrapper">
		<StackLayout
			orientation="horizontal"
			class="slider-text">
			<Label :text="`Min ${minVal} - Max ${maxVal}`" />
		</StackLayout>
		<Label
			id="track"
			class="slider-track"
			:onLayoutChanged="layoutChanged"
			:backgroundColor="trackColor"
			width="100%" />
		<!-- <ContentView
			class="thumb1"
			ref="thumb1"
			id="minHandle"
			:left="props.initialMinHandle"
			@pan="panGestureCallback" /> -->
		<ContentView
			ref="maxHandle"
			class="thumb2"
			id="maxHandle"
			@pan="panGestureCallback" />
	</AbsoluteLayout>
</template>

<script setup lang="ts">
	import { refView } from "@nativescript-use/vue";
	import {
		AbsoluteLayout,
		ContentView,
		GestureStateTypes,
		Screen,
		Utils,
		View,
	} from "@nativescript/core";
	import { computed, onMounted, ref } from "nativescript-vue";

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

	const startX = ref(20);
	const minVal = ref(20);
	const maxVal = ref(20);
	const trackWidth = ref(0);
	const trackStartX = ref(0);
	const trackEndX = ref(0);
	const trackView = refView<HTMLLabelElement>();
	const maxHandle = refView<ContentView>();
	const minHandle = refView<ContentView>();
	const handleWidth = 20;

	onMounted(() => {
		console.log("Onmounted RangeSlider");
	});

	const layoutChanged = (evt: any) => {
		const trackView = evt.object as HTMLLabelElement;
		const layoutWidth = Math.floor(trackView.getActualSize().width);
		const layoutStartX = trackView.getLocationInWindow().x;
		const layoutEndX = Math.floor(layoutStartX + layoutWidth);
		trackWidth.value = layoutWidth;
		trackStartX.value = layoutStartX;
		trackEndX.value = layoutEndX;
		maxHandle.value.translateX = trackWidth.value / 2 + 20 - handleWidth / 2;
	};

	const panGestureCallback = (
		evt: NativePanGestureEvent<HTMLContentViewElement>
	) => {
		const targetView = evt.view;
		const isMaxHandle = targetView.id.toLowerCase() === "maxhandle";
		const isMinHandle = targetView.id.toLowerCase() === "minhandle";

		if (evt.state === GestureStateTypes.began) {
			startX.value = targetView.translateX;
		}

		if (evt.state === GestureStateTypes.changed) {
			// const moveDeltaX = startX.value + evt.deltaX;
			// const deltaX = Math.max(
			// 	0,
			// 	Math.min(moveDeltaX, trackWidth.value - handleWidth)
			// );
			// targetView.translateX = deltaX;
			const deltaX = startX.value - -evt.deltaX;

			// Apply deltaX with constraint checks for both handles
			if (isMaxHandle) {
				const newMaxX = targetView.translateX + deltaX;
				targetView.translateX = Math.max(
					minHandle.value.translateX + handleWidth + 40,
					Math.min(trackWidth.value - handleWidth, newMaxX)
				);
			} else if (isMinHandle) {
				const newMinX = targetView.translateX + deltaX;
				targetView.translateX = Math.max(
					handleWidth,
					Math.min(newMinX, maxHandle.value.translateX - handleWidth - 40)
				);
			}
			console.log("Current translateX: " + targetView.translateX);
		}

		if (evt.state === GestureStateTypes.ended) {
			const isMaxHandle = targetView.id.toLowerCase() === "maxhandle";
		}

		function CalculateValueRange(isMaxHandle: boolean, deltaX: number) {
			// Calculate the total length of the trackbar excluding handle diameters
			let trackLength = trackWidth.value / 2 - 20 - 20; // Max length - handle diameter (twice)

			// Calculate the percentage position of the handle on the track
			let percentage = deltaX / parseFloat(trackLength.toPrecision(3));

			// Calculate the current value based on the percentage position
			let value = (percentage * 100).toFixed();
		}
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
	.slider-track {
		border-radius: 50;
		height: 5;
		margin-top: 36;
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
