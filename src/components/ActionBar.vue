<script setup>
</script>

<template>
    <div class="top-bar">
        <div>
            <svg class="icon" fill="currentColor" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
            @click="$emit('deck', 'draw')"
            >
                <path d="M20.466,1.967,14.78.221a5.011,5.011,0,0,0-6.224,3.24L8.368,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5h6a4.975,4.975,0,0,0,3.92-1.934,5.029,5.029,0,0,0,.689.052,4.976,4.976,0,0,0,4.775-3.563L23.8,8.156A5.021,5.021,0,0,0,20.466,1.967ZM11,22H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6h6a3,3,0,0,1,3,3V19A3,3,0,0,1,11,22ZM21.887,7.563l-3.412,10.4a2.992,2.992,0,0,1-2.6,2.134A4.992,4.992,0,0,0,16,19V9a5.006,5.006,0,0,0-5-5h-.507a3,3,0,0,1,3.7-1.867l5.686,1.746A3.006,3.006,0,0,1,21.887,7.563ZM12,13c0,1.45-1.544,3.391-2.714,4.378a1.991,1.991,0,0,1-2.572,0C5.544,16.391,4,14.45,4,13a2,2,0,0,1,4,0,2,2,0,0,1,4,0Z"/>
            </svg>
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            @click="$emit('deck', 'shuffle')"
            >
                <path d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
            
        <!-- <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M4 18L20 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4 6L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            </g>
        </svg> -->
    </div>
</template>

<style scoped>
.top-bar {
    display: flex;
    justify-content: space-between;
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

.icon:hover {
    color: var(--color-hover);
}
</style>