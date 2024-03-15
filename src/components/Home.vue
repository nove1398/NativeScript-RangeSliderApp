<template>
	<Page>
		<GridLayout rows="*, auto">
			<RangeSlider />
		</GridLayout>
	</Page>
</template>

<script lang="ts" setup>
	import {
		ref,
		computed,
		onMounted,
		onUnmounted,
		$navigateTo,
	} from "nativescript-vue";
	import Details from "./Details.vue";
	import RangeSlider from "./RangeSlider.vue";

	const counter = ref(0);
	const message = computed(() => {
		return `Blank {N}-Vue app: ${counter.value}`;
	});

	function logMessage() {
		console.log("You have tapped the message!");
	}

	onMounted(() => {
		console.log("mounted home component");
	});

	onUnmounted(() => {
		console.log("unmounted");
	});
</script>

<style>
	.range {
		margin-top: 10%;
	}
</style>
