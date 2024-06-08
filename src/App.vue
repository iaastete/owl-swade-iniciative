<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import LogBox from "./components/LogBox.vue";
import ActionBar from "./components/ActionBar.vue";
import IniciativeList from './components/IniciativeList.vue';
import Deck from "./utils/deck";
import Queue from "./utils/queue";

import OBR from "@owlbear-rodeo/sdk";
import { ref, computed } from "vue";

const ID = "com.iaastete.owl-swade-iniciative";
const MAX_SIZE = 10;
const MAP_SUITS = {
  Spade: "♠",
  Heart: "♥",
  Diamond: "♦",
  Club: "♣",
  Joker: "J★",
}

const playerName = ref("");

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

const players = ref([]);
const addPlayer = (id, name, metadata) => {
  const player = {
    id,
    name,
    value: null,
    suit: null,
  };
  if (metadata) {
    player.value = metadata.value;
    player.suit = metadata.suit;
  } 

  if (players.value.some((p) => p.id === id)) return;
  players.value.push(player);
}
const trimPlayers = (playerId, partyIds) => {
  const currentIds = players.value.map((player) => player.id);
  const toRemove = currentIds.filter((id) => {
    const isPlayer = playerId === id;
    if (partyIds.length === 0) return !isPlayer;
    const isParty = partyIds.includes(id);
    return !isPlayer && !isParty;
  });
  toRemove.forEach((id) => {
    const index = players.value.findIndex((player) => player.id === id);
    players.value.splice(index, 1);
  });
}
const setupPlayerList = async () => {
  playerName.value = await OBR.player.getName();
  const metadata = await OBR.player.getMetadata();
  const extensionMetadata = metadata[`${ID}/metadata`];
  addPlayer(OBR.player.id, playerName.value, extensionMetadata);

  const party = await OBR.party.getPlayers();
  party.forEach(async (player) => {
    const metadata = player.metadata;
    const extensionMetadata = metadata[`${ID}/metadata`];
    addPlayer(player.id, player.name, extensionMetadata);
  });

  players.value.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const handlePartyChange = async (party) => {
    // remove players that left
    const partyIds = party.map((player) => player.id);
    trimPlayers(OBR.player.id, partyIds);
    // add new players
    party.forEach(async (player) => {
      const metadata = player.metadata;
      const extensionMetadata = metadata[`${ID}/metadata`];
      addPlayer(player.id, player.name, extensionMetadata);
    });

    players.value.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
  OBR.party.onChange(handlePartyChange)
}

const gameDeck = ref(new Deck());
gameDeck.value.shuffle();
const deckNeedsShuffle = ref(false);
const roundCounter = ref(0);
const computedDeckSize = computed(() => gameDeck.value.size());
const decodeRoomDeckMetadata = (metadata) => {
  const deckMetadata = metadata[`${ID}/metadata/deck`];
  const roundCounterMetadata = metadata[`${ID}/metadata/roundCounter`];
  const deckNeedsShuffleMetadata = metadata[`${ID}/metadata/deckNeedsShuffle`];
  
  // console.log(deckMetadata, roundCounterMetadata, deckNeedsShuffleMetadata);
  if (deckMetadata) {
    const syncedDeck = new Deck();
    syncedDeck.from(deckMetadata);
    gameDeck.value = syncedDeck;
  }

  if (roundCounterMetadata) {
    roundCounter.value = roundCounterMetadata;
  }

  if (deckNeedsShuffleMetadata) {
    deckNeedsShuffle.value = deckNeedsShuffleMetadata;
  }
}
const setupRoomDeck = async () => {
  const roomMetadata = await OBR.room.getMetadata();
  decodeRoomDeckMetadata(roomMetadata);

  OBR.room.onMetadataChange(async (metadata) => {
    decodeRoomDeckMetadata(metadata);
  });
}

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
      gameDeck.value.reset(gameDeck.value.jokers);
      deckNeedsShuffle.value = false;
    }
    roundCounter.value += 1;
    dealCardsToPlayers();
  } else if (event === "shuffle") {
    gameDeck.value.reset(gameDeck.value.jokers);
  } else if (event === "draw") {
    const card = gameDeck.value.deal();
    if (card.suit === "Joker") {
      deckNeedsShuffle.value = true;
    }
    const time = (new Date()).toLocaleTimeString().slice(0, 5);
    const result = {
      text: `${playerName.value} - ${card.value}${MAP_SUITS[card.suit]}`,
      time: '[' + time + ']',
    }
    resultLog.value.enqueue(result);
  } else if (event === "clear") {
    resultLog.value.clear();
    roundCounter.value = 0;
    clearPlayers();
  }

  syncExtensionData();
};

const resultLog = ref(new Queue(MAX_SIZE));
const decodeLogMetadata = (metadata) => {
  const logMetadata = metadata[`${ID}/metadata/log`];
  if (logMetadata) {
    resultLog.value.from(logMetadata);
  } else {
    resultLog.value.clear();
  }
}
const setupIniciativeLog = async () => {
  const roomMetadata = await OBR.room.getMetadata();
  decodeLogMetadata(roomMetadata);

  OBR.room.onMetadataChange(async (metadata) => {
    decodeLogMetadata(metadata);
  });
}

const syncExtensionData = async () => {
  const roomMetadata = await OBR.room.getMetadata();
  roomMetadata[`${ID}/metadata/deck`] = gameDeck.value.toString();
  roomMetadata[`${ID}/metadata/roundCounter`] = roundCounter.value;
  roomMetadata[`${ID}/metadata/deckNeedsShuffle`] = deckNeedsShuffle.value;
  roomMetadata[`${ID}/metadata/log`] = resultLog.value.toString();
  await OBR.room.setMetadata(roomMetadata);
}

OBR.onReady(() => {
  setupPlayerList();
  setupIniciativeLog();
  setupRoomDeck();
});

</script>

<template>
  <header>
    <ActionBar
    :round-counter="roundCounter"
    @deck-action="handleDeckEvent"
    />
  </header>
  {{ computedDeckSize }} {{ deckNeedsShuffle }}
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
