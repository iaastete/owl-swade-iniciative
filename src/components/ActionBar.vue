<script setup>
const props = defineProps(['roundCounter']);
defineEmits(['deckAction']);
</script>

<template>
    <div class="top-bar">
        <div>
            <button
            @click="$emit('deckAction', 'draw-all')"
            title="Draw for All"
            >
                <svg class="icon" fill="currentColor" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
                    <title>Draw for All</title>
                    <path d="M20.466,1.967,14.78.221a5.011,5.011,0,0,0-6.224,3.24L8.368,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5h6a4.975,4.975,0,0,0,3.92-1.934,5.029,5.029,0,0,0,.689.052,4.976,4.976,0,0,0,4.775-3.563L23.8,8.156A5.021,5.021,0,0,0,20.466,1.967ZM11,22H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6h6a3,3,0,0,1,3,3V19A3,3,0,0,1,11,22ZM21.887,7.563l-3.412,10.4a2.992,2.992,0,0,1-2.6,2.134A4.992,4.992,0,0,0,16,19V9a5.006,5.006,0,0,0-5-5h-.507a3,3,0,0,1,3.7-1.867l5.686,1.746A3.006,3.006,0,0,1,21.887,7.563ZM12,13c0,1.45-1.544,3.391-2.714,4.378a1.991,1.991,0,0,1-2.572,0C5.544,16.391,4,14.45,4,13a2,2,0,0,1,4,0,2,2,0,0,1,4,0Z"/>
                </svg>
            </button>
            <button
            @click="$emit('deckAction', 'draw')"
            title="Draw Card"
            >
                <svg class="icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <path d="m16,13c0,1.105-.895,2-2,2-.558,0-1.062-.23-1.425-.599.194.657.452,1.275.798,1.813.219.341-.003.785-.407.785h-1.931c-.405,0-.626-.445-.407-.785.346-.539.604-1.156.798-1.813-.363.369-.867.599-1.425.599-1.105,0-2-.895-2-2,0-2.333,4-5,4-5,0,0,4,2.667,4,5Zm5-8v14c0,2.757-2.243,5-5,5h-8c-2.757,0-5-2.243-5-5V5C3,2.243,5.243,0,8,0h8c2.757,0,5,2.243,5,5Zm-2,0c0-1.654-1.346-3-3-3h-8c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h8c1.654,0,3-1.346,3-3V5Z"/>
                </svg>
            </button>
            
        </div>
        <h1>Round {{ roundCounter }}</h1>
        <div>
            <button
            @click="$emit('deckAction', 'shuffle')"
            title="Shuffle Deck"
            >
                <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button
            @click="$emit('deckAction', 'clear')"
            title="Clear Interface"
            >
                <svg class="icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24">
                    <path d="M23.715,2.285a1.013,1.013,0,0,0-1.43,0L17.521,7.049l-.32-.313a5.008,5.008,0,0,0-6.429-.479A16.618,16.618,0,0,1,6.224,8.685L4.15,9.293a5.036,5.036,0,0,0-3.113,2.635A4.973,4.973,0,0,0,.9,15.947a12.95,12.95,0,0,0,12.112,8.064h.924a1.011,1.011,0,0,0,.578-.182A15.288,15.288,0,0,0,21.224,13.62a5.029,5.029,0,0,0-1.453-4.374l-.8-.784,4.747-4.747A1.013,1.013,0,0,0,23.715,2.285Zm-10.107,19.7h-.6A11.3,11.3,0,0,1,8.7,21.138l.011-.006a11.546,11.546,0,0,0,4.351-3.8l.518-.761a1.01,1.01,0,0,0-1.67-1.138l-.518.761A9.535,9.535,0,0,1,7.8,19.327l-1.251.63a10.757,10.757,0,0,1-2.583-2.57,11.625,11.625,0,0,0,4.377-2.664,1.011,1.011,0,0,0-1.414-1.446,9.617,9.617,0,0,1-3.98,2.32c-.061-.135-.127-.267-.182-.406a2.906,2.906,0,0,1,.085-2.381,3.023,3.023,0,0,1,1.864-1.578l2.073-.608a15.364,15.364,0,0,0,3.426-1.588l7.915,7.712A14.192,14.192,0,0,1,13.608,21.989Zm5.62-8.683a12.421,12.421,0,0,1-.309,1.387L11.948,7.9l0,0a3.011,3.011,0,0,1,1.755-.566,2.973,2.973,0,0,1,2.084.849l2.569,2.509A3.01,3.01,0,0,1,19.228,13.306Z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
h1 {
  text-align: left;
  font-size: 20px;
  margin: 0;
  margin-left: 10px;
  margin-bottom: 10px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    width: 275px;
}

.top-bar svg {
    width: 23px;
    height: 23px;
}

.icon {
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0px;
    padding: 0px;
}
button:hover {
    color: var(--color-hover);
}
button:focus {
    outline: none;
}
</style>