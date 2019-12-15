import React from 'react';
import "./EntryComissionWindow.css"

export default class EntryComissionWindow extends React.Component{
    render(){
        return (
            <div className="entry-form-back">
                <div className="entry-form">
                    <label className="question-entry-form">{`Вы дейстительно хотите вступить в комиссию ${this.props.comName}?`}</label>
                    <label className="exit-button-form-entry"
                            onClick={()=>this.props.closeClick()}></label>
                    <button className="entry-button-form" onClick={()=>this.props.actionOnEntry(this.props.comName, "enter")}>
                        Вступить
                    </button>
                </div>
            </div>
        )
    }
}