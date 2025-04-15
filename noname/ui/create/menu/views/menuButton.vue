<template>
	<div :mode="data.mode" @click="togglePane" class="new-menubutton large">{{ data.name }}</div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
	data: {
		name: string;
		mode: string;
	};
}>();

const emit = defineEmits<{
	(e: "togglePane", payload: { tabName: string; mode: string }): void;
}>();

const togglePane = (e: Event) => {
	// 修改UI
	const target = e.target as HTMLElement;
	if (!target) return console.warn(`target不存在`);
	if (target.classList.contains("active")) return;
	Array.from(target.parentElement?.children || []).forEach(node => {
		node.classList?.remove("active");
	});
	target.classList.add("active");
	// 传递数据
	emit("togglePane", { tabName: props.data.name, mode: props.data.mode });
};
</script>

<style>
.new-menubutton {
    text-align: center;
	display: inline-block;
	padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 0 1px, rgba(0, 0, 0, 0.2) 0 3px 10px;
	border-radius: 4px;
	background-image: linear-gradient(rgba(75, 75, 75, 1), rgba(70, 70, 70, 1));
}

.new-menubutton.off {
	opacity: 0.5;
}

.new-menubutton.large {
	font-size: 30px;
	line-height: 30px;
	font-family: "STXinwei", "xinwei";
}

.new-menubutton.round {
	width: 40px;
	height: 40px;
	border-radius: 100%;
	font-size: 36px;
	line-height: 40px;
	font-family: "xinwei";
}

.new-menubutton.left {
	float: left;
}

.new-menubutton.right {
	float: right;
}

.new-menubutton.search {
	text-align: left;
}

.new-menubutton.search:not(.focus) {
	color: rgba(255, 255, 255, 0.5);
}

.new-menubutton.dim {
	color: rgba(255, 255, 255, 0.5);
}

.new-menubutton.large.blue,
.new-menubutton.large.red {
	color: white !important;
	box-shadow: rgba(0, 0, 0, 0.2) 0 0 0 1px, rgba(0, 0, 0, 0.3) 0 3px 10px !important;
}

.new-menubutton.active,
.new-menubutton.blue {
	background-image: linear-gradient(rgba(47, 101, 150, 1), rgba(43, 90, 132, 1));
}

.new-menubutton.highlight,
.new-menubutton.red {
	background-image: linear-gradient(rgba(150, 47, 47, 1), rgba(132, 43, 43, 1));
}

.new-menubutton.large.active,
.new-menubutton.large.lighlight {
	box-shadow: rgba(0, 0, 0, 0.2) 0 0 0 1px, rgba(0, 0, 0, 0.3) 0 3px 10px;
}

.new-menubutton.large.dashboard {
	width: 80px;
	height: 80px;
	margin: 6px;
	position: relative !important;
}

.new-menubutton.large.dashboard.dashboard2 {
	width: 60px;
	height: 60px;
	margin: 5px;
	margin-top: 10px;
}

.new-menubutton.large.dashboard.dashboard2 > div:first-child {
	font-size: 40px;
	line-height: 40px;
}

.new-menubutton.large.dashboard.dashboard2 > div:last-child {
	font-size: 16px;
	white-space: nowrap;
}

.new-menubutton.large.dashboard > div:first-child {
	font-family: "lishu", "xiaozhuan";
	font-size: 60px;
	line-height: 60px;
	position: absolute;
	left: 0;
	top: 7px;
	width: 100%;
	height: 60px;
}

.new-menubutton.large.dashboard > div:last-child {
	font-size: 18px;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
}

.new-menubutton.large.new_card,
.new-menubutton.large.new_card_delete {
	left: 12px;
	top: 130px;
	margin-bottom: 20px;
}

.new-menubutton.large.new_card_delete {
	left: 155px;
}

#window:not(.nopointer) .popup-container > .prompt-container > div > div > div > .menubutton {
	cursor: pointer;
}
</style>