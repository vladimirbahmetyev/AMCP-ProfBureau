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
            <div className="pm-design com-item"></div>
            <div className="hr com-item"></div>
            <div className="pm-profi com-item com-not-active"></div>
            <div className=" pm-photo com-item com-not-active"></div>
            <div className="funcom com-item com-not-active"></div>
            <div className="sportcom com-item com-not-active"></div>
            <div className="mounting com-item com-not-active"></div>
            <div className="cultmass com-item"></div>
            {/* <div className="smi com-item com-not-active"></div> */}
        </div>
        </div>
    )
    }
}