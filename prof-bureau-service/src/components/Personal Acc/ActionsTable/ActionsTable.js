import  React from "react"
import './ActionsTable.css'

export default class ActionsTable extends React.Component{

    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="actions-coloumn">
        <div className="actions">
            <h1 className="actions-title">Актуальные события</h1>
        </div>
        </div>
    )}
}