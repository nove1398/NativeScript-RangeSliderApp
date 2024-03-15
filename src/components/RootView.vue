<template>
	<GridLayout rows="*, auto">
		<!--Content-->
		<ContentView>
			<RouterView defaultRoute="/details" />
		</ContentView>

		<!--Menu-->
		<FlexboxLayout
			row="1"
			flexDirection="row"
			justifyContent="space-around"
			paddingTop="10"
			paddingBottom="10">
			<Label text="Menu item 1" />
			<Label text="Menu item 2" />
			<Label text="Menu item 3" />
			<Label text="Menu item 4" />
		</FlexboxLayout>
	</GridLayout>
</template>

<script lang="ts" setup>
	import Home from "./Home.vue";
	import Details from "./Details.vue";
</script>
