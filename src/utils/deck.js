// define deck object
export default class Deck {
    constructor(currentDeck=[], jokers=2) {
        this.deck = currentDeck;
        this.jokers = jokers;
        this.__CODE_SUIT = {
            'Heart': 'h',
            'Diamond': 'd',
            'Club': 'c',
            'Spade': 's',
            'Joker': 'j'
        };
        if (currentDeck.length === 0) this.reset(jokers);
    }
    
    reset(jokers = 2) {
        this.deck = [];
        const suits = ['Heart', 'Diamond', 'Club', 'Spade'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
        for (let suit in suits) {
            for (let value in values) {
                this.deck.push({value: values[value], suit: suits[suit]});
            }
        }

        for (let i = 0; i < jokers; i++) {
            this.deck.push({value: 'J★', suit: 'Joker'});
        }

        return this.shuffle();
    }
    
    shuffle() {
        const { deck } = this;
        let m = deck.length, i;
    
        while (m) {
            i = Math.floor(Math.random() * m--);
            [deck[m], deck[i]] = [deck[i], deck[m]];
        }
    
        return this;
    }
    
    deal() {
        if (this.deck.length === 0) {
            this.reset(this.jokers);
            this.shuffle();
        }
        return this.deck.pop();
    }

    size() {
        return this.deck.length;
    }

    toString() {
        return this.deck.map(card => `${card.value}${this.__CODE_SUIT[card.suit]}`).join('-');
    }

    from(string) {
        this.deck = string.split('-').map(card => {
            const value = card.slice(0, -1);
            const suit = Object.keys(this.__CODE_SUIT).find(key => this.__CODE_SUIT[key] === card.slice(-1));
            return {value, suit};
        });
    }
}