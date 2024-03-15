<script lang="ts" setup>
	import { ref, $navigateBack } from "nativescript-vue";
	import { useRouter } from "router-vue-native";
	import RangeSlider from "./RangeSlider.vue";

	const router = useRouter();
	const items = ref(
		Array(1000)
			.fill(0)
			.map((_, index) => `Item ${index + 1}`)
	);
</script>

<template>
	<Page actionBarHidden="true">
		<GridLayout rows="auto, *">
			<Label
				text="Log Message"
				@tap="() => router.push('/details')"
				class="text-center px-4 py-10 text-2xl text-gray-900 font-bold" />

			<ContentView
				row="1"
				class="bg-[#65adf1] rounded-t-3xl">
				<ListView
					:items="items"
					separatorColor="transparent"
					class="bg-transparent">
					<template #default="{ item }">
						<GridLayout
							columns="*, auto"
							class="px-4">
							<ContentView
								col="1"
								@tap="() => router.push('/home')"
								class="w-5 h-5 rounded-full bg-white" />
						</GridLayout>
					</template>
				</ListView>
			</ContentView>
		</GridLayout>
	</Page>
</template>
