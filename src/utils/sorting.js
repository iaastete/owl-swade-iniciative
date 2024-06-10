const customSortSuits = (a, b) => {
    const suits = ['Joker', 'Spade', 'Heart', 'Diamond', 'Club', null];
    return suits.indexOf(a.suit) - suits.indexOf(b.suit);
};

const customSortValues = (a, b) => {
    const values = [null, '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', 'J★'];
    return values.indexOf(b.value) - values.indexOf(a.value);
};

const customSortItems = (a, b) => {
    // sort by value, resolve ties by suit
    return customSortValues(a, b) || customSortSuits(a, b);
};

export { customSortItems }