

const Die = ({ face, id, chooseDie, isChosen }) => {

    const dieColor = {
        color: 'black'
    }
    const chosenDieColor = {
        background: '#3981b1da',
        color: 'white'
    }

    const handleChoice = () => {
        chooseDie(id)
    }

    let classes = isChosen ? 'Die-locked' : 'Die-rolling';

    return (
        <div className='ui basic segment' style={isChosen ? chosenDieColor : dieColor}>

            <i
                onClick={handleChoice}
                className={`bi bi-dice-${face} ${classes}`}
            >
            </i>

        </div>
    )
}

export default Die;