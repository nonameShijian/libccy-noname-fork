<template>
    <div class="new-menu-tab">
		<div v-for="[tabName] in data" @click="toggleTabName($event, tabName)">{{ tabName }}</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
	data: Map<string, any>;
}>();

const emit = defineEmits<{
	(e: "toggleTabName", payload: { tabName: string }): void;
}>();

const toggleTabName = (e: Event, tabName: string) => {
    // 修改UI
    const target = e.target as HTMLElement;
    if (!target) return console.warn(`target不存在`);
    if (target.classList.contains("active")) return;
    Array.from(target.parentElement?.children || []).forEach(node => {
        node.classList?.remove("active");
    });
    target.classList.add("active");
    // 传递数据
	emit("toggleTabName", { tabName });
};

</script>

<style>
:root {
	--new-menu-tab-height: 37px;
}

.new-menu.main > .new-menu-tab {
	height: var(--new-menu-tab-height);
	text-align: center;
	width: calc(100% - 30px);
	padding-left: 15px;
	padding-right: 15px;
	position: relative;
	text-align: center;

	border-width: 0 0 1px;
	border-style: solid;
	border-image: linear-gradient(
			to right,
			transparent,
			rgba(0, 0, 0, 0.2) 10%,
			rgba(0, 0, 0, 0.2) 90%,
			transparent
		)
		0 1 100%;
}

.new-menu.main > .new-menu-tab > div {
	display: inline-block;
	height: 32px;
	line-height: 30px;
	padding-top: 5px;
	width: 45px;
	margin-left: 5px;
	margin-right: 5px;
	transition: color 0.5s;
}

.new-menu.main > .new-menu-tab > div:not(.active):not(*:hover),
.new-menu.main > .new-menu-tab > .disabled {
	color: rgba(255, 255, 255, 0.6);
}

.new-menu.main > .new-menu-content > div > .left.pane > div {
	width: calc(100% - 30px);
	margin-top: 9px;
	margin-left: 10px;
	transition: all 0.3s;
	height: 23px;
	font-size: 26px;
	line-height: 26px;
	white-space: nowrap;
}
</style>