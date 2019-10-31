import  React from "react"
import "./ComissionsTable.css"

export default class ComissionsTable extends React.Component{

    state = {
        exampleState: true,
        secondExampleState: 0
    }
    render(){
    return(
        <div className="comissions-coloumn">
        <h2 className="com-title">Мои комиссии</h2>
        <div className="comissions-grid">
            <div className="pm-design com-item" onClick={()=>this.props.onClickCom("pmDesign")}>
                <div className="com-picture"></div>
                <div>PM-Design</div>
            </div>

            <div className="hr com-item" onClick={()=>this.props.onClickCom("pmHr")}>
                <div className="com-picture"></div>
                <div>HR</div>
            </div>

            <div className="pm-profi com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div>PM-profi</div>
            </div>

            <div className=" pm-photo com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div>PM-photo</div>
            </div>

            <div className="funcom com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div>FunCom</div>
            </div>

            <div className="sportcom com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div>СпортКом</div>
            </div>

            <div className="mounting com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div>Оформители</div>
            </div>

            <div className="cultmass com-item" onClick={()=>this.props.onClickCom("none")}>
                <div className="com-picture"></div>
                <div>КультМасс</div>
            </div>
        </div>
        </div>
    )
    }
}