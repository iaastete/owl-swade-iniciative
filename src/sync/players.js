import { ID } from '../utils/config.js';
import { customSortItems } from '../utils/sorting.js';

import OBR from '@owlbear-rodeo/sdk';
import { ref } from 'vue';

const players = ref([]);

const addPlayer = (id, name, metadata) => {
    const player = { id, name };
    if (metadata) {
        player.value = metadata[`${ID}/metadata/value`];
        player.suit = metadata[`${ID}/metadata/suit`];
    } 

    if (players.value.some((p) => p.id === id)) {
        const index = players.value.findIndex((p) => p.id === id);
        players.value[index] = player;
        return;
    }
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

    if (toRemove.length === 0) return false;

    toRemove.forEach((id) => {
        const index = players.value.findIndex((player) => player.id === id);
        players.value.splice(index, 1);
    });

    return true;
}

const setupPlayerList = async (playerId, playerName) => {
    const metadata = await OBR.player.getMetadata();
    addPlayer(playerId, playerName, metadata);
  
    const party = await OBR.party.getPlayers();
    party.forEach(async (player) => {
      const metadata = player.metadata;
      addPlayer(player.id, player.name, metadata);
    });
  
    const handlePartyChange = async (party) => {
        // avoid innecesary updates
        if (party.length + 1 === players.value.length) return;

        // remove players that left
        const partyIds = party.map((player) => player.id);
        const trimResult = trimPlayers(playerId, partyIds);
        if (trimResult) return;

        // add new players
        party.forEach(async (player) => {
            addPlayer(player.id, player.name, undefined);
        });
    }
    OBR.party.onChange(handlePartyChange)
}

const clearPlayers = (playerId) => {
    players.value.forEach((player) => {
        player.value = null;
        player.suit = null;
    });
    players.value.forEach((player) => {
        if (player.id !== playerId) sendPlayerUpdate(player.id, player.name, 'clear');
    });

}

const dealCardsToPlayers = (playerId, gameDeck, deckNeedsShuffle) => {
    players.value.forEach((player) => {
        const card = gameDeck.deal();
        if (card.suit === "Joker") {
        deckNeedsShuffle = true;
        }
        player.value = card.value;
        player.suit = card.suit;
    });
    players.value.sort(customSortItems);
    players.value.forEach(async (player) =>{
        if (player.id !== playerId) sendPlayerUpdate(player.id, player.name, 'deal');
        else {
            const playerMetadata = OBR.player.getMetadata();
            OBR.player.setMetadata({
                ...playerMetadata,
                [`${ID}/metadata/value`]: player.value,
                [`${ID}/metadata/suit`]: player.suit,
            });
        }
    });
}

const setupMyComms = async (playerId) => {
    const channel = `${ID}/${playerId}`;
    OBR.broadcast.onMessage(channel, async (message) => {
        players.value =JSON.parse(message.data.value);

        const player = players.value.find((player) => player.id === playerId);
        const playerMetadata = await OBR.player.getMetadata();

        OBR.player.setMetadata({
            ...playerMetadata,
            [`${ID}/metadata/value`]: player.value,
            [`${ID}/metadata/suit`]: player.suit,
        });
    });
}

const sendPlayerUpdate = async (targetId, playerName, source) => {
    const channel = `${ID}/${targetId}`;
    const player = players.value.find((player) => player.id === targetId);
    const data = {
        from: playerName + '-' + source,
        value: JSON.stringify(players.value),
    };
    OBR.broadcast.sendMessage(channel, data);
}

const handleManualIniciativeUpdate = (playerId) => {
    players.value.forEach((player) => {
      if (player.id !== playerId) sendPlayerUpdate(player.id, player.name, 'manual');
    });
}

export { players, setupPlayerList, clearPlayers, dealCardsToPlayers, setupMyComms, sendPlayerUpdate, handleManualIniciativeUpdate };