<template>
	<div class="new-menu main dialog popped static center">
		<menu-tabs :data="dataMap" @toggleTabName="toggleTabName"></menu-tabs>
		<menu-tab-bar :style="menuTabBarStyle"></menu-tab-bar>
		<menu-content :data="showData" :connectMenu="connectMenu || false" @togglePane="togglePane"></menu-content>
	</div>
</template>

<script lang="ts" setup>
import menuTabs from "./menuTabs.vue";
import menuTabBar from "./menuTabBar.vue";
import menuContent from "./menuContent.vue";
import { lib } from "../../../../../noname.js";
import { ref } from "vue";

const props = defineProps<{
	connectMenu: boolean,
}>();

const connectMenu = props.connectMenu;

const dataMap = new Map([
	[
		"开始",
		{
			active: null,
			menuButtonData() {
				const modeorder: string[] = lib.config.modeorder || [];
				for (const i in lib.mode) {
					modeorder.add(i);
				}
				const leftPaneNames = modeorder.filter(mode => {
					if (connectMenu) {
						if (!lib.mode[mode].connect) return;
						if (!lib.config["connect_" + mode + "_banned"]) {
							lib.config["connect_" + mode + "_banned"] = [];
						}
						if (!lib.config["connect_" + mode + "_bannedcards"]) {
							lib.config["connect_" + mode + "_bannedcards"] = [];
						}
					}
					if (lib.config.all.mode.includes(mode)) {
						// createModeConfig(modeorder[i], start.firstChild);
						return true;
					}
				});
				return leftPaneNames.map(mode => {
					return {
						name: (lib.mode[mode]?.name || mode) as string,
						mode,
					};
				});
			},
			initConfigs(node: HTMLElement, startButton: HTMLElement) {},
		},
	],
	[
		"选项",
		{
			active: null,
			menuButtonData() {
				return [] as {
					name: string;
					mode: string;
				}[];
			},
			initConfigs(node: HTMLElement, startButton: HTMLElement) {},
		},
	],
	[
		"武将",
		{
			active: null,
			menuButtonData() {
				return [] as {
					name: string;
					mode: string;
				}[];
			},
			initConfigs(node: HTMLElement, startButton: HTMLElement) {},
		},
	],
	[
		"卡牌",
		{
			active: null,
			menuButtonData() {
				return [] as {
					name: string;
					mode: string;
				}[];
			},
			initConfigs(node: HTMLElement, startButton: HTMLElement) {},
		},
	],
	[
		"扩展",
		{
			active: null,
			menuButtonData() {
				return [] as {
					name: string;
					mode: string;
				}[];
			},
			initConfigs(node: HTMLElement, startButton: HTMLElement) {},
		},
	],
	[
		"其它",
		{
			active: null,
			menuButtonData() {
				return [] as {
					name: string;
					mode: string;
				}[];
			},
			initConfigs(node: HTMLElement, startButton: HTMLElement) {},
		},
	],
]);

const showData = ref(dataMap.get("开始")!);

const menuTabBarStyle = {
	left: "0px",
	height: "3px",
};

const toggleTabName = ({ tabName }: { tabName: string }) => {
	console.log("toggleTabName", tabName);

	const data = dataMap.get(tabName);
	if (!data) return;

	// 修改menu-tab-bar样式
	// menuTabBarStyle.transform =
	// 		"translateX(" +
	// 		(this.getBoundingClientRect().left - this.parentNode.firstChild.getBoundingClientRect().left) /
	// 			get.menuZoom() +
	// 		"px)";

	// 修改menuContent内容
	showData.value = data;
};

const togglePane = ({ tabName, mode }: { tabName: string; mode: string }) => {
	console.log("togglePane", tabName, mode);

	const paneData = showData.value.menuButtonData().find(data => {
		if (data.name === tabName && data.mode === mode) {
			showData.value.active = {
				name: tabName,
				mode,
			};
			return true;
		}
	});

	if (!paneData) return;
};
</script>

<style>
:root {
    --menu-width: 80%;
    --menu-height: 60%;
}

.menu-container > .new-menu.main.center {
	left: calc(50% - var(--menu-width) / 2);
	top: calc(50% - var(--menu-height) / 2);
}

.menu-container > .new-menu.main {
	left: 15px;
	top: 52px;
}

.menu-container > .new-menu.main {
	transition: all 0.3s;
	transform-origin: 2px -35px;
}

.menu-container.hidden > .new-menu.main {
	transform: scale(0.5);
	transform-origin: 2px -35px;
	opacity: 0;
}

.menu-container.hidden > .new-menu.main.center {
	transform-origin: center center;
}

.menu-container > .new-menu.main.center {
	transform-origin: center center;
}

.new-menu.main {
    display: -webkit-flex;
    display: flex;
	flex-direction: column;
	width: var(--menu-width);
	height: var(--menu-height);
	position: absolute;
	overflow: hidden;
	padding: 0;
}

.new-menu div {
    display: block;
}
</style>
