import React from "react"
import "./PredControlPanel.css"

export default class PredControlPanel extends React.Component{
    render()
    {
        return (
            <div className="pred-control-panel">
                <h2 className="pred-control-title">Панель управления преда</h2>
                <div className="pred-control-items">
                    <div className="pred-add-button" onClick={this.props.onAddNewTask}>Добавить новый таск</div>
                    {/* <div className="pred-add-button">Добавить новый ивент</div>
                    <div className='pred-add-button'>Список членов комиссии</div> */}
                </div>
            </div>
        )
    }
    
}