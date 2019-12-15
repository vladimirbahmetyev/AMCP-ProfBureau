import React from 'react';
import "./AboutComPred.css"

export default class AboutComPred extends React.Component{
    render(){
    return(
        <div className="about-container">
            <h2 className="about-com-title">{this.props.selectComission}</h2>
            {/* <div>Какое то описание комиссии</div> */}
            <div className="exit-com">Выход из комиссии</div>
            <div className="about-footer">Председатель: {this.props.predName}</div>
        </div>
    )}}