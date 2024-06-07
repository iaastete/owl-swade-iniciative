<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        <div v-if="selected == 'Spade'">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#31373D" d="M32.799 20.336C32.799 11.456 18 .198 18 .198S3.201 11.456 3.201 20.336c0 6.946 8.175 10.172 12.766 5.173C15.631 29.688 11.247 33 7 33h.5a1.5 1.5 0 1 0 0 3h21a1.5 1.5 0 0 0 0-3h.5c-4.246 0-8.632-3.312-8.967-7.491c4.591 4.999 12.766 1.773 12.766-5.173z"></path>
                </g>
            </svg>
        </div>
        <div v-if="selected == 'Club'">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#31373D" d="M25.5 28a7.5 7.5 0 0 0 7.5-7.5a7.5 7.5 0 0 0-7.5-7.5a7.45 7.45 0 0 0-3.73 1h-.21a6.972 6.972 0 0 0 3.423-6a6.983 6.983 0 1 0-13.967 0a6.972 6.972 0 0 0 3.423 6h-.208c-1.1-.633-2.371-1-3.731-1a7.5 7.5 0 0 0 0 15a7.476 7.476 0 0 0 5.46-2.368C15.549 29.753 11.205 33 7 33h.5a1.5 1.5 0 1 0 0 3h21a1.5 1.5 0 0 0 0-3h.5c-4.205 0-8.549-3.248-8.959-7.369A7.47 7.47 0 0 0 25.5 28z"></path>
                </g>
            </svg>
        </div>
        <div v-if="selected == 'Heart'">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#C1694F" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path>
                </g>
            </svg>
        </div>
        <div v-if="selected == 'Diamond'">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#C1694F" d="M18.437 35.747c-.242.337-.632.337-.874 0L5.314 18.612c-.242-.338-.242-.886 0-1.224L17.563.253c.242-.338.632-.338.874 0l12.25 17.135c.241.338.241.886 0 1.224l-12.25 17.135z"></path>
                </g>
            </svg>
        </div>
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <!-- <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
        >
        &nbsp;{{ option }}
        </div> -->
        <div @click="
            selected = 'Spade';
            open = false;
            $emit('input', 'Spade');
        ">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#31373D" d="M32.799 20.336C32.799 11.456 18 .198 18 .198S3.201 11.456 3.201 20.336c0 6.946 8.175 10.172 12.766 5.173C15.631 29.688 11.247 33 7 33h.5a1.5 1.5 0 1 0 0 3h21a1.5 1.5 0 0 0 0-3h.5c-4.246 0-8.632-3.312-8.967-7.491c4.591 4.999 12.766 1.773 12.766-5.173z"></path>
                </g>
            </svg>
        </div>
        <div @click="
            selected = 'Club';
            open = false;
            $emit('input', 'Club');
        ">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#31373D" d="M25.5 28a7.5 7.5 0 0 0 7.5-7.5a7.5 7.5 0 0 0-7.5-7.5a7.45 7.45 0 0 0-3.73 1h-.21a6.972 6.972 0 0 0 3.423-6a6.983 6.983 0 1 0-13.967 0a6.972 6.972 0 0 0 3.423 6h-.208c-1.1-.633-2.371-1-3.731-1a7.5 7.5 0 0 0 0 15a7.476 7.476 0 0 0 5.46-2.368C15.549 29.753 11.205 33 7 33h.5a1.5 1.5 0 1 0 0 3h21a1.5 1.5 0 0 0 0-3h.5c-4.205 0-8.549-3.248-8.959-7.369A7.47 7.47 0 0 0 25.5 28z"></path>
                </g>
            </svg>
        </div>
        <div @click="
            selected = 'Heart';
            open = false;
            $emit('input', 'Heart');
        ">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#C1694F" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path>
                </g>
            </svg>
        </div>
        <div @click="
            selected = 'Diamond';
            open = false;
            $emit('input', 'Diamond');
        ">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#C1694F" d="M18.437 35.747c-.242.337-.632.337-.874 0L5.314 18.612c-.242-.338-.242-.886 0-1.224L17.563.253c.242-.338.632-.338.874 0l12.25 17.135c.241.338.241.886 0 1.224l-12.25 17.135z"></path>
                </g>
            </svg>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      default: {
        type: String,
        required: false,
        default: "Spade",
      },
      tabindex: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    data() {
      return {
        selected: this.default,
        open: false,
      };
    },
    mounted() {
      this.$emit("input", this.selected);
    },
    watch: {
      default(value) {
        this.selected = value;
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
    text-align: left;
    outline: none;
  }
  
  .custom-select .selected {
    /* border: 1px solid red; */
    color: #fff;
    cursor: pointer;
    user-select: none;
    height: 35px;
    padding-top: 5px;
  }
  
  .custom-select .selected.open {
    /* border: 1px solid #ad8225; */
  }
  
  .custom-select .selected:after {
    display: none;
  }
  
  .custom-select .items {
    color: #fff;
    /* border: 1px solid #ad8225; */
    position: absolute;
    background-color: #0a0a0a;
    padding-top: 5px;
    left: 0px;
    top: 0px;
    width: 26px;
    line-height: 20px;
    z-index: 2;
  }
  
  .custom-select .items div {
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
  
  .custom-select .items div:hover {
    background-color: #ad8225;
  }
  
  .selectHide {
    display: none;
  }
  </style>
  