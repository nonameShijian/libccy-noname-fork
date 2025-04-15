<template>
    <div class="new-menu-tab-bar" :style="style"></div>
</template>

<script lang="ts" setup>
import { defineProps, StyleValue } from "vue";

const props = defineProps<{
	style: {  [key in keyof CSSStyleDeclaration]?: string; };
}>();

const style = props.style as StyleValue;

</script>

<style>
.new-menu.main > .new-menu-tab-bar {
	width: 45px;
	height: 2px;
	top: var(--new-menu-tab-height);
	position: absolute;
	background-color: rgb(0, 133, 255);
	transition: transform 0.3s;
	left: 0;
}
</style>