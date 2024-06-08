<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import LogBox from "./components/LogBox.vue";
import ActionBar from "./components/ActionBar.vue";
import IniciativeList from './components/IniciativeList.vue';
import Deck from "./utils/deck";
import Queue from "./utils/queue";

import OBR from "@owlbear-rodeo/sdk";
import { ref } from "vue";

const ID = "com.iaastete.owl-swade-iniciative";
const MAX_SIZE = 50;
const MAP_SUITS = {
  Spade: "♠",
  Heart: "♥",
  Diamond: "♦",
  Club: "♣",
  Joker: "J★",
}

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

const players = ref([
    {name: 'Item 1'},
    {name: 'Item 4'},
    {name: 'Item 3'},
    {name: 'Item 2'},
    {name: 'Item 5'},
]);

const gameDeck = ref(new Deck());
const deckNeedsShuffle = ref(false);
// at the start of the game, shuffle the deck
gameDeck.value.shuffle();
const clearPlayers = () => {
  players.value.forEach((player) => {
    player.value = null;
    player.suit = null;
  });
}
const dealCardsToPlayers = () => {
  players.value.forEach((player) => {
    const card = gameDeck.value.deal();
    if (card.suit === "Joker") {
      deckNeedsShuffle.value = true;
    }
    player.value = card.value;
    player.suit = card.suit;
  });
}
const handleDeckEvent = (event) => {
  if (event === "draw-all") {
    if (deckNeedsShuffle.value) {
      gameDeck.value.shuffle();
      deckNeedsShuffle.value = false;
    }
    roundCounter.value += 1;
    dealCardsToPlayers();
  } else if (event === "shuffle") {
    gameDeck.value.shuffle();
  } else if (event === "draw") {
    const card = gameDeck.value.deal();
    if (card.suit === "Joker") {
      deckNeedsShuffle.value = true;
    }
    const time = (new Date()).toLocaleTimeString().slice(0, 5);
    const result = {
      text: `NAME - ${card.value}${MAP_SUITS[card.suit]}`,
      time: '[' + time + ']',
    }
    resultLog.value.enqueue(result);
  } else if (event === "clear") {
    resultLog.value.clear();
    roundCounter.value = 0;
    clearPlayers();
  }
};

const resultLog = ref(new Queue(MAX_SIZE));
const roundCounter = ref(0);

OBR.onReady(() => {
  // setupContextMenu();
  // setupIniciativeList();
});

</script>

<template>
  <header>
    <ActionBar
    :round-counter="roundCounter"
    @deck-action="handleDeckEvent"
    />
  </header>
  <main>
    <IniciativeList
    :items="players"
    />
    <LogBox
    :queue="resultLog"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 85vh;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
