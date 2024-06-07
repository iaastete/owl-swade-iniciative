<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import ActionBar from "./components/ActionBar.vue";
import IniciativeList from './components/IniciativeList.vue'
import Dropdown from './components/Dropdown.vue'
import OBR from "@owlbear-rodeo/sdk";
import { ref } from "vue";

const ID = "com.iaastete.owl-swade-iniciative";

const title = ref("Hello World");
const iniciativeRenderedList = ref([]);

// const setupContextMenu = () => {
//   OBR.contextMenu.create({
//     id: `${ID}/context-menu`,
//     icons: [
//       {
//         icon: "/add.svg",
//         label: "Add to Initiative",
//         filter: {
//           every: [
//             { key: "layer", value: "CHARACTER" },
//             { key: ["metadata", `${ID}/metadata`], value: undefined}
//           ],
//         },
//       },
//       {
//         icon: "/remove.svg",
//         label: "Remove from Initiative",
//         filter: {
//           every: [{ key: "layer", value: "CHARACTER" }],
//         },
//       },
//     ],
//     onClick(context) {
//       const addToInitiative = context.items.every(
//         (item) => item.metadata[`${ID}/metadata`] === undefined
//       );
//       if (addToInitiative) {
//         const initiative = window.prompt("Enter the initiative value");
//         OBR.scene.items.updateItems(context.items, (items) => {
//           for (let item of items) {
//             item.metadata[`${ID}/metadata`] = {
//               initiative,
//             };
//           }
//         });
//       } else {
//         OBR.scene.items.updateItems(context.items, (items) => {
//           for (let item of items) {
//             delete item.metadata[`${ID}/metadata`]
//           }
//         });
//       }
//       console.log(context);
//     },
//   });
// };

// const setupIniciativeList = () => {
//   const renderList = (items) => {
//     // Get the name and initiative of any item with
//     // our initiative metadata
//     const initiativeItems = [];
//     for (const item of items) { //Cada item
//       const metadata = item.metadata[`${ID}/metadata`]; //obtengo meta
//       if (metadata) { //si existe la metadata de mi extensión
//         initiativeItems.push({ //incluir en la lista
//           initiative: metadata.initiative,
//           name: item.name,
//         });
//       }
//     }

//     // Sort the items by initiative
//     const sortedItems = initiativeItems.sort((a, b) => {
//       return parseFloat(b.initiative) - parseFloat(a.initiative);
//     });

//     // Update the list
//     iniciativeRenderedList.value = sortedItems;
//   };
//   OBR.scene.items.onChange(renderList);
// };

const deckEvent = ref(null);

const handleDeckEvent = (event) => {
  deckEvent.value = event;
};

OBR.onReady(() => {
  // setupContextMenu();
  // setupIniciativeList();
});

</script>

<template>
  <header>
    <ActionBar
    @deck="handleDeckEvent"
    />
  </header>
  <main>
    <IniciativeList
    :deckEvent="deckEvent"
    />
  </main>
</template>

<style scoped>
</style>
