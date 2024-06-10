<script setup>
const props = defineProps(['message'])
</script>

<template>
    <div class="bubble">
        {{ message }}
    </div>
</template>

<style scoped>
.bubble {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: var(--color-bubble-bg);
    position: absolute;
    top: -7px;
    left: 0px;
    font-size: 14px;
    color: white;
}
</style>