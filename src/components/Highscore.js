const Highscore = ({ highScore }) => {


    return (
        <div className="segment ui">
            <span>{`HIGHSCORE: ${highScore}`}</span>
        </div>
    )
}

export default Highscore;