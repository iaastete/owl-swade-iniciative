<script setup>
import Dropdown from './Dropdown.vue';
import { ref, watch } from 'vue';

const props = defineProps(['items']);
const emiters = defineEmits(['updateItems']);

const items = ref(props.items);

const draggedItem = ref(null);
const editingItem = ref(null);

const selectText = (event) => {
    event.target.select();
    editingItem.value = true;
};
const handleDragStart = (index) => {
    draggedItem.value = index;
};
const handleDragOver = (event) => {
    event.preventDefault();
};
const handleDrop = (index) => {
    const droppedItem = items.value.splice(draggedItem.value, 1)[0];
    items.value.splice(index, 0, droppedItem);
    draggedItem.value = null;
    emiters('updateItems', items.value);
};

const handleSuitChange = (item, suit) => {
    if (suit === 'Joker') {
        // this way we prevent double watcher trigger
        const copyItem = { ...item };
        copyItem.value = 'J★';
        copyItem.suit = 'Joker';
        Object.assign(item, copyItem);
    }
    else item.suit = suit;
    emiters('updateItems', items.value);    
};

const sortOnBlur = (event) => {
    editingItem.value = false;
    emiters('updateItems', items.value);
};

watch(props, (newProps, oldProps) => {
    items.value = newProps.items;
}, { deep: true });

</script>

<template>
    <div class="sortable-list">
        <div class="sortable-element" v-for="(item, index) in items"
            :key="index"
            :draggable="true"
            @dragstart="handleDragStart(index)"
            @dragover="handleDragOver"
            @drop="handleDrop(index)"
            >
            <div class="aligned-element">
                <svg class="draggable-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M8.5 7C9.60457 7 10.5 6.10457 10.5 5C10.5 3.89543 9.60457 3 8.5 3C7.39543 3 6.5 3.89543 6.5 5C6.5 6.10457 7.39543 7 8.5 7Z" fill="currentColor"></path>
                        <path d="M15.5 7C16.6046 7 17.5 6.10457 17.5 5C17.5 3.89543 16.6046 3 15.5 3C14.3954 3 13.5 3.89543 13.5 5C13.5 6.10457 14.3954 7 15.5 7Z" fill="currentColor"></path>
                        <path d="M10.5 12C10.5 13.1046 9.60457 14 8.5 14C7.39543 14 6.5 13.1046 6.5 12C6.5 10.8954 7.39543 10 8.5 10C9.60457 10 10.5 10.8954 10.5 12Z" fill="currentColor"></path>
                        <path d="M15.5 14C16.6046 14 17.5 13.1046 17.5 12C17.5 10.8954 16.6046 10 15.5 10C14.3954 10 13.5 10.8954 13.5 12C13.5 13.1046 14.3954 14 15.5 14Z" fill="currentColor"></path>
                        <path d="M10.5 19C10.5 20.1046 9.60457 21 8.5 21C7.39543 21 6.5 20.1046 6.5 19C6.5 17.8954 7.39543 17 8.5 17C9.60457 17 10.5 17.8954 10.5 19Z" fill="currentColor"></path>
                        <path d="M15.5 21C16.6046 21 17.5 20.1046 17.5 19C17.5 17.8954 16.6046 17 15.5 17C14.3954 17 13.5 17.8954 13.5 19C13.5 20.1046 14.3954 21 15.5 21Z" fill="currentColor"></path>
                    </g>
                </svg>
                <div class="aligned-text">
                    {{ item.name }}
                </div>
            </div>
            <div class="aligned-element">
                <label :for="item + 'value'"></label>
                <input :id="item + 'value'" type="text"
                maxlength="2"
                @keyup="item.value = item.value.toUpperCase()"
                v-model="item.value"
                @focus="selectText"
                @blur="sortOnBlur()"
                ></input>
                <Dropdown class="dropdown-suit"
                    :default="item.suit"
                    @input="value => handleSuitChange(item, value)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.sortable-list {
    /* border: solid 1px red; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-height: 50vh;
}

.sortable-list .aligned-element {
    margin-left: 3px;
    margin-bottom: 2px;
    cursor: move;
    transition: background-color 0.2s ease;
}

.draggable-icon {
    width: 23px;
    height: 23px;
}

.sortable-element {
    width: 96%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 6px;
    margin-bottom: 5px;
    margin-left: 5px;
}

.aligned-element {
    display: flex;
    align-items: flex-end;
    padding-right:10px;
}

.aligned-text {
    margin-left: 6px;
}

input[type="text"] {
    width: 29px;
    height: 35px;
    padding-top: 2px;
    box-sizing: border-box;
    border: none;
    background-color: transparent;
    /* border: 1px solid red; */
    text-align: right;
    font-size: 20px;
}

select {
    width: 50px;
    height: 35px;
    padding: 0px;
    box-sizing: border-box;
    border: none;
    background-image: none;
}

.dropdown-suit {
    width: 25px;
    height: 35px;
    line-height: 3px;
    border: none;
    background-image: none;
}

</style>