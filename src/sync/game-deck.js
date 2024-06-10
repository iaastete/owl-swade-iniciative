import Deck from '../classes/deck.js';
import { resultLog } from './result-log.js';
import { dealCardsToPlayers, clearPlayers } from './players.js';
import { ID, MAP_SUITS } from '../utils/config.js';

import OBR from '@owlbear-rodeo/sdk';

import { ref } from 'vue';

const gameDeck = ref(new Deck());
gameDeck.value.shuffle();
const deckNeedsShuffle = ref(false);
const roundCounter = ref(0);

const decodeRoomDeckMetadata = (metadata, deckOnlyUpdate) => {
    const deckMetadata = metadata[`${ID}/metadata/deck`];
    const roundCounterMetadata = metadata[`${ID}/metadata/roundCounter`];
    const deckNeedsShuffleMetadata = metadata[`${ID}/metadata/deckNeedsShuffle`];
    
    if (!deckOnlyUpdate) {
        if (roundCounterMetadata !== (undefined)) roundCounter.value = roundCounterMetadata;
    }
    if (deckNeedsShuffleMetadata !== (undefined)) deckNeedsShuffle.value = deckNeedsShuffleMetadata;
    if (deckMetadata) {
        const syncedDeck = new Deck();
        syncedDeck.from(deckMetadata);
        gameDeck.value = syncedDeck;
    }
  }

const setupRoundComms = () => {
    const channel = `${ID}/roundCounter`;
    OBR.broadcast.onMessage(channel, (message) => {
        roundCounter.value = message.data;
    });
}

const setupRoomDeck = async () => {
    const roomMetadata = await OBR.room.getMetadata();
    decodeRoomDeckMetadata(roomMetadata);

    OBR.room.onMetadataChange(async (metadata) => {
    decodeRoomDeckMetadata(metadata, true);
    });
}

const actionDrawAll = (playerId) => {
    if (deckNeedsShuffle.value) {
        gameDeck.value.reset(gameDeck.value.jokers);
        deckNeedsShuffle.value = false;
    }
    roundCounter.value += 1;
    OBR.broadcast.sendMessage(`${ID}/roundCounter`, roundCounter.value);
    dealCardsToPlayers(playerId, gameDeck.value, deckNeedsShuffle.value);
}

const actionShuffle = () => {
    gameDeck.value.reset(gameDeck.value.jokers);
}

const actionDraw = (playerName) => {
    const card = gameDeck.value.deal();
    if (card.suit === "Joker") deckNeedsShuffle.value = true;

    const time = (new Date()).toLocaleTimeString().slice(0, 5);
    const result = {
        text: `${playerName} - ${card.value}${MAP_SUITS[card.suit]}`,
        time: '[' + time + ']',
    }

    resultLog.value.enqueue(result);
    OBR.broadcast.sendMessage(`${ID}/log`, result);
}

const actionClear = (playerId) => {
    resultLog.value.clear();
    roundCounter.value = 0;

    OBR.broadcast.sendMessage(`${ID}/roundCounter`, roundCounter.value);
    OBR.broadcast.sendMessage(`${ID}/log`, { command: 'clear' });
    clearPlayers(playerId);
}
export { gameDeck, deckNeedsShuffle, roundCounter, setupRoomDeck, setupRoundComms, actionDrawAll, actionShuffle, actionDraw, actionClear }