import Rule from './Rule';


const Rules = ({ rules, scoreBasicRule, scoreAdvancedRule, handleScore, resetOnScore }) => {

    return (
        <div className='two column stackable ui grid' >
            <div className="column">
                <div className="ui segment basic">
                    {rules.map(rule => {
                        if (rule.id < 7) {
                            return <Rule
                                rule={rule.rule}
                                points={rule.points}
                                id={rule.id}
                                value={rule.score}
                                propScored={rule.scored}
                                scoreBasic={scoreBasicRule}
                                scoreAdvanced={scoreAdvancedRule}
                                handleScores={handleScore}
                                resetOnScore={resetOnScore}
                                key={rule.id}
                            />
                        }
                    })}
                </div>
            </div>
            <div className="column">
                <div className="ui segment basic">
                    {rules.map(rule => {
                        if (rule.id > 6) {
                            return <Rule
                                rule={rule.rule}
                                points={rule.points}
                                id={rule.id}
                                value={rule.score}
                                propScored={rule.scored}
                                scoreBasic={scoreBasicRule}
                                scoreAdvanced={scoreAdvancedRule}
                                handleScores={handleScore}
                                resetOnScore={resetOnScore}
                                key={rule.id}
                            />
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Rules;