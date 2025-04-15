<template>
	<div class="new-menu-content">
		<div>
			<div class="left pane" ref="leftPane">
				<menu-button v-for="leftPaneData in leftPaneDatas" :data="leftPaneData" @togglePane="togglePane"></menu-button>
			</div>
			<div class="right pane" ref="rightPane"></div>
			<div class="menubutton round highlight" ref="startButton">启</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { App, computed, createApp, onMounted, onUnmounted, ref, watch } from "vue";
import menuButton from "./menuButton.vue";

// 应接收左边的配置项和右边内容的生成函数
// 如有可能，可以做个缓存
const props = defineProps<{
	connectMenu: boolean;
	data: {
		active: { name: string; mode: string } | null;
		menuButtonData: () => {
			name: string;
			mode: string;
		}[];
		initConfigs: (node: HTMLElement, startButton: HTMLElement) => void;
	};
}>();

const emit = defineEmits<{
	(e: "togglePane", payload: { tabName: string; mode: string }): void;
}>();

const leftPaneDatas = computed(() => props.data.menuButtonData());

const leftPane = ref<HTMLDivElement>();
const rightPane = ref<HTMLDivElement>();

const togglePane = ({ tabName, mode }: { tabName: string; mode: string }) => {
	emit("togglePane", { tabName, mode });
};

const updateUI = () => {
	Array.from(leftPane.value?.children || []).forEach((node, index) => {
		if (props.data.active ? props.data.active.name === node.innerHTML && props.data.active.mode === node.getAttribute("mode")! : index === 0) {
			node.classList.add("active");
			emit("togglePane", { tabName: node.innerHTML, mode: node.getAttribute("mode")! });
		} else {
			node.classList.remove("active");
		}
	});
};

let rightPaneApp: App<Element> | null = null;

const mountRightPaneApp = () => {
	if (rightPaneApp) {
		rightPaneApp.unmount();
	}

	rightPaneApp = createApp(
		{
			template: "<div>name: {{data.active?.name}}</div><div>mode: {{data.active?.mode}}</div>",
			props: {
				data: {
					type: Object,
					required: true,
				},
			},
			setup(props) {
				return {
					data: props.data,
				};
			},
		},
		{
			data: props.data,
		}
	);

	rightPaneApp.mount(rightPane.value!);
};

onMounted(() => {
	updateUI();
	mountRightPaneApp();
});

const watchStopHandle = watch(leftPaneDatas, () => {
	updateUI();
	mountRightPaneApp();
});

onUnmounted(() => {
	watchStopHandle();
});
</script>

<style>
.new-menu.main > .new-menu-content {
	max-height: calc(100% - var(--new-menu-tab-height));
}

.new-menu.main > .new-menu-content > div {
	display: flex;
	flex-direction: row;
	max-height: 100%;
}

.new-menu.main > .new-menu-content > div > .left.pane {
	width: 34%;
	left: 0;
	overflow: scroll;
}
</style>
