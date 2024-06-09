import Deck from '../classes/deck.js';
import { ID } from '../utils/config.js';

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

export { gameDeck, deckNeedsShuffle, roundCounter, setupRoomDeck, setupRoundComms }