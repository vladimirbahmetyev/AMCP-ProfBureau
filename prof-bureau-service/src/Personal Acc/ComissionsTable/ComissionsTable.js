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
            <div className="pm-design com-item" onClick={()=>this.props.onClickCom(
                {
                    comName:"PM-Design",
                    predName:"Ольга крылова"
                }
            )}>
                <div className="com-picture"></div>
                <div className='com-title'>PM-Design</div>
            </div>

            <div className="hr com-item" onClick={()=>this.props.onClickCom(
                {
                    comName:"HR",
                    predName:"Мария Васильева"
                }
            )}>
                <div className="com-picture"></div>
                <div className='com-title'>HR</div>
            </div>

            <div className="pm-profi com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div className='com-title'>PM-profi</div>
            </div>

            <div className=" pm-photo com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div className='com-title'>PM-photo</div>
            </div>

            <div className="funcom com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div className='com-title'>FunCom</div>
            </div>

            <div className="sportcom com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div className='com-title'>СпортКом</div>
            </div>

            <div className="mounting com-item com-not-active" onClick={this.props.onClickCom}>
                <div className="com-picture"></div>
                <div className='com-title'>Оформители</div>
            </div>

            <div className="cultmass com-item" onClick={()=>this.props.onClickCom(
                {
                    comName: "Культмасс",
                    predName: 'Кудряшова Дарья'
                }
            )}>
                <div className="com-picture"></div>
                <div className='com-title'>КультМасс</div>
            </div>

            <div className='account com-item' onClick={()=>this.props.onClickCom(
                {
                    comName:"none"
                }
            )}>
                <div className='com-picture'></div>
                <div className='com-title acc'>В кабинет</div>
            </div>
        </div>
        </div>
    )
    }
}