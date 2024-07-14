<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        <div v-if="selected == 'Spade'">
          <img src="/spade.svg"/>
        </div>
        <div v-if="selected == 'Club'">
          <img src="/club.svg"/>
        </div>
        <div v-if="selected == 'Heart'">
          <img src="/heart.svg"/>
        </div>
        <div v-if="selected == 'Diamond'">
          <img src="/diamond.svg"/>
        </div>
        <div v-if="selected == 'Joker'">
          <img src="/joker.svg"/>
        </div>
        <div v-else>
        </div>
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div @click="
            selected = 'Spade';
            open = false;
            $emit('input', 'Spade');
        ">
          <img src="/spade.svg"/>
        </div>
        <div @click="
            selected = 'Club';
            open = false;
            $emit('input', 'Club');
        ">
          <img src="/club.svg"/>
        </div>
        <div @click="
            selected = 'Heart';
            open = false;
            $emit('input', 'Heart');
        ">
          <img src="/heart.svg"/>
        </div>
        <div @click="
            selected = 'Diamond';
            open = false;
            $emit('input', 'Diamond');
        ">
          <img src="/diamond.svg"/>
        </div>
        <div @click="
            selected = 'Joker';
            open = false;
            $emit('input', 'Joker');
        ">
          <img src="/joker.svg"/>
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
        default: "",
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
    background-color: var(--color-source);
    padding-top: 5px;
    left: 0;
    top: 0;
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
  