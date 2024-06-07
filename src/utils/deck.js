// define deck object
export default class Deck {
    constructor(jokers = 2) {
        this.deck = [];
        this.jokers = jokers;
        this.reset(jokers);
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
            this.deck.push({value: 'Joker', suit: 'Joker'});
        }
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
}