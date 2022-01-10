
const InitialState = () => ([
    { rule: 'ones', score: null, points: '1 point per 1', id: 1, scored: false },
    { rule: 'twos', score: null, points: '2 points per 2', id: 2, scored: false },
    { rule: 'threes', score: null, points: '3 points per 3', id: 3, scored: false },
    { rule: 'fours', score: null, points: '4 points per 4', id: 4, scored: false },
    { rule: 'fives', score: null, points: '5 points per 5', id: 5, scored: false },
    { rule: 'sixes', score: null, points: '6 points per 6', id: 6, scored: false },
    { rule: 'Three of kind', score: null, points: 'Sum all dice if 3 are the same', id: 7, scored: false },
    { rule: 'Four of kind', score: null, points: 'Sum all dice if 4 are the same', id: 8, scored: false },
    { rule: 'Full house', score: null, points: ' 25 points for a full house', id: 9, scored: false },
    { rule: 'Small straight', score: null, points: '30 points for a small straight', id: 10, scored: false },
    { rule: 'Large straight', score: null, points: '40 points for a large straight', id: 11, scored: false },
    { rule: 'Yahtzee', score: null, points: '50 points for yahtzee', id: 12, scored: false },
    { rule: 'Chance', score: null, points: 'Sum all dice', id: 13, scored: false }
])

export default InitialState;