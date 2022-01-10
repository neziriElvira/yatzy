import Die from './Die';

import { Segment } from 'semantic-ui-react';

const Dice = ({ dice, chooseDie }) => {

    return (
        <Segment.Group horizontal size='small'>
            {dice.map(die => {
                return (
                    <Die
                        face={die.face}
                        id={die.id}
                        key={die.id}
                        chooseDie={chooseDie}
                        isChosen={die.isChosen}
                    />
                )
            })}
        </Segment.Group>
    )
}

export default Dice;