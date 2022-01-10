import { useState, useEffect } from "react";
import Dice from './Dice';
import { getRandomDice, findSameDices, useLocalStorage } from "../utils/utils";
import '../style/game.css';
import Rules from './Rules';
import { Container, Header } from "semantic-ui-react";
import Highscore from "./Highscore";
import InitialState from "../utils/initialState";

const Game = () => {

    const [dice, setDice] = useState([
        { face: 1, id: 1, isChosen: false },
        { face: 2, id: 2, isChosen: false },
        { face: 3, id: 3, isChosen: false },
        { face: 4, id: 4, isChosen: false },
        { face: 5, id: 5, isChosen: false }
    ]);

    const [rules, setRules] = useState(InitialState())

    const gameStart = useState(true);
    const [numRolls, setNumRolls] = useState(3);
    const [score, setScore] = useState(0);
    const [roundCounter, setRoundCounter] = useState(0);
    const [endgame, setEndgame] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [animation, setAnimation] = useState(false);
    const [scores, setScores] = useLocalStorage('scores', []);
    const storedScore = JSON.parse(localStorage.getItem('scores'));


    const chooseDie = (id) => {
        if (gameStart) {
            const dicesAfterChoose = dice.map(die => {
                if (die.id === id) {
                    return { ...die, isChosen: !die.isChosen }
                }
                return die
            })
            setDice(dicesAfterChoose);
        }
    }


    const restartGame = () => {
        setScore(0);
        setEndgame(false);
        setRoundCounter(0);
        setRules(InitialState());

    }

    const randomizeDice = () => {

        const rolledDices = dice.map(die => die.isChosen ? die : {
            ...die,
            face: getRandomDice()
        })
        const rollsLeft = numRolls - 1;
        setDice(rolledDices);
        setNumRolls(rollsLeft);
        setAnimation(false);
    }

    const scoreBasicRule = (id) => {
        if (gameStart) {
            let clickedRule = id

            const dieFaces = dice.map(die => {
                return (die.face)
            })

            const matchingDices = dieFaces.filter(dice => {
                return (dice === clickedRule)
            })

            let scoreSum = 0;

            for (let i = 0; i < matchingDices.length; i++) {
                scoreSum += matchingDices[i]
            }

            setScore(score + scoreSum);
            return scoreSum;
        }
    }


    const scoreAdvancedRule = (rule) => {
        if (gameStart) {
            const dieFaces = dice.map(die => {
                return (die.face)
            })
            switch (rule) {
                case 7:
                    const newScore = findSameDices(dieFaces, 3)
                    setScore(score + newScore);
                    return newScore;
                case 8:
                    const fourScore = findSameDices(dieFaces, 4)
                    setScore(score + fourScore);
                    return fourScore;
                case 9:
                    let fullHouseScore = 0;
                    const hasDuplicates = (array) => {
                        return (new Set(array)).size !== array.length;
                    }
                    const find3s = (array) => {
                        const count = {}
                        let contains = false

                        array.forEach(item => {
                            if (count[item]) {
                                count[item] += 1
                                return
                            }
                            count[item] = 1
                        })

                        for (let prop in count) {
                            if (count[prop] >= 3) {
                                contains = true
                            }
                        }
                        if (contains && hasDuplicates(dieFaces)) {
                            fullHouseScore = 25;
                            return fullHouseScore;
                        }
                    }
                    find3s(dieFaces);
                    setScore(score + fullHouseScore);
                    return fullHouseScore;
                case 10:
                    dieFaces.sort();
                    if (/1234|2345|3456/.test(dieFaces.join("").replace(/(.)\1/, "$1"))) {
                        setScore(score + 30);
                        return 30;
                    }
                    return 0;
                case 11:
                    const largeStraigth = !dieFaces.some((v, i) => dieFaces.indexOf(v) < i);
                    if (largeStraigth && (dieFaces.indexOf(1) === -1 || dieFaces.indexOf(6) === -1)) {
                        setScore(score + 40);
                        return 40;
                    }
                    return 0;
                case 12:
                    const allEqual = arr => arr.every(v => v === arr[0])
                    if (allEqual(dieFaces)) {
                        setScore(score + 50);
                        return 50;
                    }
                    return 0;
                case 13:
                    let chance = 0
                    for (let i = 0; i < dieFaces.length; i++) {
                        chance += dieFaces[i]
                    }
                    setScore(score + chance);
                    return chance;
                default: console.log("yahtzee!")
            }

        }
    }


    const checkForEndgame = () => {
        if (roundCounter === 12) {
            setEndgame(true);
        }
    }

    useEffect(() => {
        if (storedScore === null) {
            setHighScore(0);
        } else {
            setHighScore(storedScore[storedScore.length - 1].highscore);
        }
        randomizeDice();
    }, [])


    if (score > highScore) setHighScore(score);


    useEffect(() => {
        if (endgame) {
            setScores([...scores, { score: score, highscore: highScore }])
        }
    }, [endgame])

    const resetOnScore = (id) => {
        if (gameStart) {
            let scoredRule = id

            const rulesAfterScoring = rules.map(rule => {
                if (rule.id === scoredRule) {
                    return { ...rule, scored: true }
                }
                return rule
            }
            )
            const dicesReset = dice.map(die => {
                return { ...die, face: getRandomDice(), isChosen: false }
            })

            setRoundCounter(roundCounter + 1);
            setRules(rulesAfterScoring);
            setNumRolls(2);
            setDice(dicesReset);
            checkForEndgame();
        }
    }

    const handleScore = (id) => {
        let scoreValue;
        let index;
        if (id <= 6) {
            scoreValue = scoreBasicRule(id);
        } else {
            scoreValue = scoreAdvancedRule(id);
        }
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].id === id) index = i;
        }

        let updatedRules = [...rules];
        updatedRules[index].score = scoreValue;
        setRules(updatedRules);
    }


    return (
        <Container>
            <Container textAlign="center" className="dice-container">
                <Header as='h1' textAlign="center" color="grey">{endgame ? `Game over! Your score is ${score}` : 'Yahtzee!'}</Header>

                {endgame ? null : <Dice dice={dice} chooseDie={chooseDie} animation={animation} />}

                {endgame ? <button className="ui button" onClick={restartGame}>Restart</button> :
                    <button className="ui button" disabled={numRolls === 0}
                        onClick={randomizeDice}>
                        {`${numRolls} rolls left`} </button>}

            </Container>
            <Container textAlign="center">
                <Header as='h2'>Game Rules</Header>
                <Rules
                    rules={rules}
                    scoreBasicRule={scoreBasicRule}
                    scoreAdvancedRule={scoreAdvancedRule}
                    handleScore={handleScore}
                    resetOnScore={resetOnScore}

                />
                <p className="score">{`TOTAL SCORE: ${score}`}</p>
                {endgame && <Highscore score={score}
                    highScore={highScore}
                />}
            </Container>
        </Container>
    )
}

export default Game;