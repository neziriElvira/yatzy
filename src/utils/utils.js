import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];

}
export const findSameDices = (dices, numDices) => {
    const count = {}
    let contains = false;
    let score = 0;
    dices.forEach(die => {
        if (count[die]) {
            count[die] += 1
            return
        }
        count[die] = 1
    })
    for (let prop in count) {
        if (count[prop] >= numDices) {
            contains = true
        }
    }
    if (contains) {
        const duplicates = dices.filter(elm => dices.indexOf(elm) !== dices.lastIndexOf(elm))
        score = duplicates.reduce((a, b) => a + b);
    }
    return score
}

export const getRandomDice = () => {
    return Math.floor(Math.random() * 6) + 1
}