<script setup>
import LogBox from "./components/LogBox.vue";
import ActionBar from "./components/ActionBar.vue";
import IniciativeList from './components/IniciativeList.vue';

import { resultLog, setupLogCommunication } from "./sync/result-log.js";
import { gameDeck, deckNeedsShuffle, roundCounter, setupRoomDeck, setupRoundComms } from "./sync/game-deck.js";
import { actionDraw, actionDrawAll, actionClear, actionShuffle } from "./sync/game-deck.js";
import { players, setupPlayerList, setupMyComms, handleManualIniciativeUpdate } from "./sync/players.js";
import { ID } from "./utils/config";

import OBR from "@owlbear-rodeo/sdk";
import { ref } from "vue";

const playerName = ref("");
const playerId = ref("");

const handleDeckEvent = (event) => {

  if (event === "draw") actionDraw(playerName.value);
  if (event === "draw-all") actionDrawAll(playerId.value);
  if (event === "shuffle") actionShuffle();
  if (event === "clear") actionClear(playerId.value);

  syncExtensionData();
};


const syncExtensionData = async () => {
  const roomMetadata = await OBR.room.getMetadata();
  roomMetadata[`${ID}/metadata/deck`] = gameDeck.value.toString();
  roomMetadata[`${ID}/metadata/roundCounter`] = roundCounter.value;
  roomMetadata[`${ID}/metadata/deckNeedsShuffle`] = deckNeedsShuffle.value;
  OBR.room.setMetadata(roomMetadata);
}

OBR.onReady(async () => {
  playerName.value = await OBR.player.getName();
  playerId.value = OBR.player.id;

  await setupPlayerList(playerId.value, playerName.value);

  setupRoomDeck();
  setupLogCommunication();
  setupRoundComms();
  setupMyComms(playerId.value);
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
    @update-items="handleManualIniciativeUpdate(playerId)"
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
