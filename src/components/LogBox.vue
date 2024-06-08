<script setup>
const props = defineProps(['queue']);
</script>

<template>
    <div class="log-box">
        <div class="log-text"
        v-for="item in queue.queue"
        >
            <p>{{ item?.text }}</p>
            <p>{{ item?.time }}</p>
        </div>
    </div>
</template>

<style scoped>
.log-box {
    border: 1px solid grey;
    width: 96%;
    border-radius: 6px;
    min-height: 33%;
    max-height: 33%;
    margin: 5px;
    display: flex;
    flex-direction: column-reverse;
    overflow: hidden;
    overflow-y: scroll;
    scroll-snap-align: end;
}
.log-text {
    margin: 0px 5px;
    padding: 0px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 0%;
}
</style>