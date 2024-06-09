<script setup>
import LogBox from "./components/LogBox.vue";
import ActionBar from "./components/ActionBar.vue";
import IniciativeList from './components/IniciativeList.vue';

import { resultLog, setupLogCommunication } from "./sync/result-log.js";
import { gameDeck, deckNeedsShuffle, roundCounter, setupRoomDeck, setupRoundComms } from "./sync/game-deck.js";
import { players, setupPlayerList, clearPlayers, dealCardsToPlayers, setupMyComms, handleManualIniciativeUpdate } from "./sync/players.js";
import { ID, MAP_SUITS } from "./utils/config";

import OBR from "@owlbear-rodeo/sdk";
import { ref } from "vue";

const playerName = ref("");
const playerId = ref("");

const actionDrawAll = () => {
  if (deckNeedsShuffle.value) {
    gameDeck.value.reset(gameDeck.value.jokers);
    deckNeedsShuffle.value = false;
  }
  roundCounter.value += 1;
  OBR.broadcast.sendMessage(`${ID}/roundCounter`, roundCounter.value);
  dealCardsToPlayers(playerId.value, gameDeck.value, deckNeedsShuffle.value);
}

const actionShuffle = () => {
  gameDeck.value.reset(gameDeck.value.jokers);
}

const actionDraw = () => {
  const card = gameDeck.value.deal();
  if (card.suit === "Joker") deckNeedsShuffle.value = true;

  const time = (new Date()).toLocaleTimeString().slice(0, 5);
  const result = {
    text: `${playerName.value} - ${card.value}${MAP_SUITS[card.suit]}`,
    time: '[' + time + ']',
  }

  resultLog.value.enqueue(result);
  OBR.broadcast.sendMessage(`${ID}/log`, result);
}

const actionClear = () => {
  resultLog.value.clear();
  roundCounter.value = 0;
  OBR.broadcast.sendMessage(`${ID}/roundCounter`, roundCounter.value);
  OBR.broadcast.sendMessage(`${ID}/log`, { command: 'clear' });
  clearPlayers(playerId.value);
}

const handleDeckEvent = (event) => {

  if (event === "draw") actionDraw();
  if (event === "draw-all") actionDrawAll();
  if (event === "shuffle") actionShuffle();
  if (event === "clear") actionClear();

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
