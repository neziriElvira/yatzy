import { Table } from "semantic-ui-react"
const Rule = ({ rule, points, id, value, propScored, scoreBasic, scoreAdvanced, handleScores, resetOnScore }) => {

    const handleClick = () => {
        handleScores(id);
        resetOnScore(id)
    }

    const notScored = {
        textDecoration: 'none'
    }

    const scored = {
        textDecoration: 'line-through',
    }


    return (
        <Table size="small"
            style={propScored ? { background: '#3981b1da' } : { background: 'white' }}
            onClick={propScored ? null : handleClick} >
            <Table.Row >
                <Table.Cell style={propScored ? scored : notScored}>{rule}</Table.Cell>
                <Table.Cell textAlign="right">{value === null ? points : value}</Table.Cell>
            </Table.Row>
        </Table>
    )
}

export default Rule;